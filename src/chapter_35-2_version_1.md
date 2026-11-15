# Final Project 1: Version 1

Before we support many messages going around back and forth without waiting, we should start with two, in a back-and-forth.
To avoid you writing everything, and get you use to C includes, were gonna use a lot of libc for this project, and NO STL. We're also going to use libc's io functions, printf & fprintf. printf has the exact same syntax as IO::qout, except double and float share formatters, and int is both %i and %d. fprintf is just like printf, but the first argument is `stdout`, `stderr`, or `stdin`, and it prints to one of those. `stdout` is terminal output, `stderr` is meant for errors, and `stdin` is for input.

First, initialize your project. This is just the simplest setup possible. Make a project dir, such as `p2p`, and `qcm init` it with all the defaults.
Then, we'll put in our pile of includes.
```qc
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <sys/socket.h>
#include <netinet/in.h>
```
These are all the headers you will need. stdio.h is your io functions, stdlib.h has some important things I will explain, string.h has string functions (because as I said, no stdlib),
unistd.h has some syscall-as-function-functions, and the rest are for networking.

Now, let's write some code!

Our goal for this stage is to have an app that takes either the `--listen` flag and a port, or a ip address and a port, and communicates between the two, with the syntax:
`./a.out --listen <port>` or `./a.out <ip> <port>`.

You're gonna' need to handle CLI arguments, so make sure your sig for main is 

```qc
int main(int argc, char **argv)
```
So you can get arguments from the command line. Now:

For the first step, let's just get our CLI parsing working. Create the following structure:
- [ ] Make a integer variable, fd. This will store the peer's networking fd.
- * [ ] if argc isn't three, print `"usage: %s --listen <port> | %s <host> <port>\n"` where the %s's are `argv[0]` to stderr and return 1. 
- [ ] return 0.

Now, compile and run the program.
```bash
qc main.qc
./a.out
```
This should error, and print the help message. Then run it with 3 arguments, and it should work.

Step 2: Let's connect two users. No messaging yet, just connected over the internet.
After declaring fd:
- [ ] If argc (arg count) is 3 and the result of calling libc's `strcmp()` function on `argv[1]` and the string `"--listen"` is 0 (this function compares two c strings, but libc string functions return 0 for true)
- * [ ] create a integer variable, port, that is the result of calling atoi on `arg[2]`. atoi stands for ASCII to integer, and converts a `char*` to a int.
- * [ ] create a integer variable, s, that is the result of `socket(AF_INET, __socket_type.SOCK_STREAM, 0)`. This creates a new network socket. `AF_INET` tells socket to use IPv4 (the connection standard, the typical ip address), `__socket_type.SOCK_STREAM` is a two-way stream, and `0` tells the OS to use the default communication protocol (TCP (Transmission Control Protocol))
- * [ ] if that variable s is less than zero, call `perror` with the message "socket" and return 1. This prints the error message and the function it came from.
- * [ ] create a integer variable one with the value one.
- * [ ] call the setsockopt function with args s, SOL_SOCKET, SO_REUSEADDR, the address of one, and the size of one. This just tells the OS it can reuse the socket, which fixes "socket already open" errors.
- * [ ] create a sockaddr_in variable addr, set to `sockaddr_in{0}`. This is used to store the port number and ip address.
- * [ ] store it's fields like this:

```qc
        addr.sin_family = AF_INET;
        addr.sin_addr.s_addr = htonl(INADDR_ANY);
        addr.sin_port = htons(port);
```

htonl & htons stand for host to network (short/long), and are required because they change the integer encoding for the network.

- * [ ] `if (bind(s, (&addr) as sockaddr*, sizeof addr) < 0) { perror("bind"); return 1; }`. This just calls bind, which binds the network, and fails if it fails.
- * [ ] `if (listen(s, 1) < 0) { perror("listen"); return 1; }`. Above, except for listen. This calls listen, which listens on s (the port) for a ip ready to join.
- * [ ] Print the text `listening on %d...\n` where %d is the port.
- * [ ] Set fd to the result of calling accept with s, nullptr, and nullptr. This accepts a waiting ip as a fd.
- * [ ] If the fd is less than 0, perror("accept") and return one. This handles accept failures.
- * [ ] Call close on s, as you already recieved the connection.
- * [ ] Print `"peer connected\n"`.
- [ ] Otherwise, if argc is 3:
- * [ ] create a integer variable port just as you did above.
- * [ ] set fd to the result of calling socket with the same socket call as above, once again creating a two way TCP socket..
- * [ ] `if (fd < 0) { perror("socket"); return 1; }`
- * [ ] Create addr just as above except don't set `.s_addr`.
- * [ ] if the result of calling inet_pton with AF_INET, `argv[1]`, and the address of addr.sin_addr is not equal to one, call fprintf with the arguments stderr, `"bad address: %s\n"`, and `argv[1]`, then return 1. This converts the users human-readable IPv4 string into it's binary format and errors if it fails. 
- * [ ] if the result of calling connect with fd, the address of addr casted as `sockaddr*`, and the sizeof addr is less than 0, perror on `"connect"` and return one. This connects to the server.
- * [ ] print `"connected\n"`.
- [ ] otherwise, print that help message you just made.
Now right before the return stmt, close fd.

Open two terminals. Compile in the first one, then run with the command:
```bash 
./a.out --listen 8080
```
This starts the server listening on port 8080. Then in the other, run
```bash 
./a.out 127.0.0.1 8080
```
You see, 127.0.0.1 is a special IP called localhost, which routes back to your own machine. 8080 is the port, so it should connect. If you see in your first terminal peer connected, and in your second `connected`, it worked!

Finally, let's actually code that mesaging!

After the else block, right before closing fd, do this:

- [ ] declare a boolean, my_turn, which's value should be set to `(argc == 3 && strcmp(argv[1], "--listen") != 0)`. This makes sure the connecte messages first.
- [ ] declare a variable buf, that's type is a character array of 1024 elements, initialized with `[char, 1024]`.
- [ ] in a infinite loop (take your pick of ways to represent it):
- * [ ] if my_turn is true:
- * - [ ] print a `>` followed by a space, without a newline.
- * - [ ] call fflush with the argument stdout. This makes sure that was sent to console.
- * - [ ] if the result of calling `fgets` with arguments buf, sizeof buf, and stdin is false, break. This checks for input.
- * - [ ] if buf is equal to "exit\n", break. If you need help with string comparison, check above.
- * - [ ] `if (send(fd, buf, strlen(buf), 0) < 0) { perror("send"); break; }`. This sends fd the text of buf.
- * [ ] otherwise:
- * - [ ] declare a long int, n, that is the result of `recv(fd, buf, (sizeof buf) - 1, 0);`. This recieves text from fd.
- * - [ ] `if (n < 0) { perror("recv"); break; }`. This fails if a error happend during recieval.
- * - [ ] `if (n == 0) { printf("[peer disconnected]\n"); break; }`. n is only zero when the peer disconnected.
- * - [ ] set buf at index n to `'\0'`.
- * - [ ] print the text `them: %s` where %s is buf.
- * [ ] finally, set my_turn to !my_turn, so the turns swap.
Now, compile and run again with those same arguments in your first and second terminal. It should print "> " in the second terminal. Type something, and see it pop up in the first! That was all done over the internet. Now type exit and see the server shut down.

You now have made a basic P2P communication app!
