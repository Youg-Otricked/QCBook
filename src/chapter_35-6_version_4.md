# Final Project 1: Version 4

Right now, our chat app has a hard ceiling of 1,023 characters per message. Why? Because line, buf, and PendingMessagesQueue all use fixed 1024-byte buffers. If someone pastes a huge paragraph or a block of code, it gets chopped in half!
In this version, we are going to fix that from first principles by building two core systems tools:
1. Heap-allocated dynamic buffers using malloc and realloc so messages can grow to any size.
2. A length-prefixed framing protocol so the receiver knows exact message sizes before allocating memory.

Look inside PendingMessagesQueue::push(char *message). Right now, it calls malloc(1024) and copies message byte-by-byte into copy. That is slow, wastes memory, and caps every queued message at 1,024 bytes.
Instead, we are going to use ownership transfer: whoever allocates the string on the heap hands its pointer to the queue, and the queue takes responsibility for freeing it later (either when pop() returns it to main, or in _destroy()).
- Inside `push(char *message)`, delete the `char *copy = malloc(1024);` allocation and the for loop that copies characters.
- Set `this->messages[tail] = message;` directly.

When you send 50 bytes over TCP, the OS usually sends all 50 in one shot. When you send 50,000 bytes, the OS network buffer might fill up halfway through ,causing send() or recv() to return fewer bytes than you asked for.
To guarantee complete delivery, we need loops that keep calling send and recv until all the bytes goe through. Right below PendingMessagesQueue (above main), add these two helper functions:
- Create int send_all(int fd, void *buf, size_t len):
- * Declare addr_t total_sent = 0; and byte *ptr = buf; (casting to byte * lets us do pointer math byte-by-byte).
- * While total_sent < len:
- * - Call `long int sent = send(fd, ptr + total_sent, len - total_sent, 0);`.
- * - If sent <= 0, return -1.
- * - Add sent to total_sent.
- * Return 0.
- Create int recv_all(int fd, void *buf, size_t len) using the exact same pattern:
- * Track addr_t total_received = 0; with char *ptr = buf;.
- * Loop while total_received < len, calling `recv(fd, ptr + total_received, len - total_received, 0)`.
- * If bytes <= 0, return -1. Otherwise add bytes to total_received and return 0 at the end.

Now let's remove our old fixed-size stack arrays and let user input grow dynamically on the heap!
- Inside main, delete `char[1024] buf = [char, 1024];` and `char[1024] line = [char, 1024];`.
Now update the if (`fds[0].revents` & POLLIN) block to read in 32-byte chunks, growing line with realloc whenever a chunk fills up:
- Declare size_t cap = 32;, size_t total = 0;, and char *line = malloc(cap);.
- Read the first chunk: `long int n = read(STDIN_FILENO, line, 32);`.
- While n == 32:
- * Add n to total and 32 to cap.
- * Resize the buffer: `line = realloc(line, cap);`.
- * Read the next chunk into the new space: `n = read(STDIN_FILENO, line + total, 32);`.
- Check for errors or EOF: if n < 0 or (n == 0 and total == 0) then free line and break;.
- Add the final n bytes to total, and shrink line down to the size needed: `line = realloc(line, total);`.
Before sending the text itself, we send a 4-byte header (i32u_t) telling our peer exactly how many bytes are coming next. This is actually similar to how headers work in network requests!
- Convert total to network byte order: `i32u_t net_num = htonl(total);`.
- Send the 4-byte length header: `send(fd, &net_num, 4, 0);`. (We can use send here directly because it's so tiny - only 4 bytes)
- Send the full message payload: `send_all(fd, line, total)`;.
- Keep your existing PendingMessagesQueue drain loop right here!
- After draining the queue, free line and if n == 0 break; (in case the user pressed Ctrl+D right after typing).

On the receiving side (if (fds[1].revents & (POLLIN | POLLHUP | POLLERR))), we reverse the protocol: read the 4-byte header first, allocate the buffer size on the heap, and read the message.
- Declare i32u_t net_count = 0; and read the 4-byte header with `if (recv_all(fd, &net_count, 4) < 0)`. If it fails,`print "\n[peer disconnected]\n"` and `break;`.
- Convert the length back to host byte order: `i32u_t count = ntohl(net_count);`.
- Add a safety shield: What if a buggy or malicious client claims a message is 4 gigabytes long? Check `if (count > 10 * 1024 * 1024)`. If it's over 10 MB, print `"\n[message too large]\n"` and `break;`.
- Allocate the buffer size plus 1 byte for the null terminator:
- * `char *buf = malloc((sizeof char) * (count + 1));`
- * `if (!buf) break;`
- Read the full message payload:
- * if `recv_all(fd, buf, count)` < 0 free buf, print `"\n[peer disconnected]\n"`, and break;.
- Null-terminate `buf[count] = '\0'`, and call queue.push(buf);. Notice we do not free buf here, because the first edit we made: The queue owns buf now!

Now it's time to test.
Compile and run again, then copy a massive 3,000+ character wall of text (like a whole Wikipedia article or a big source file), paste it into one terminal, and hit Enter!
Both terminals should handle the entire message without cutting off anything.
My prefered test (because i'm lazy) is to type message and paste it 147 times.

If it worked, you have finished the core of the first final project!
