# Final Project 1: Version 3

If you did the bonus last lesson, you probably see the problem. If the client sends the server a message while typing or vice versa, your terminal freaks out. We're going to solve this by making a queue that will get cleared at the send of every message so you send a message to see what the other sent.
First, right after your includes, declare a class, PendingMessagesQueue. It should have a `char* *` messages, and a `addr_t` head, height and capacity. Make it a constructor that sets all of these to 0a/nullptr.
Give it a push method that takes a `char *message`.
- If `this->messages` is nullptr, set capacity to 2a, and initialize messages with `malloc((sizeof char*) * this->capacity)`.
- If `this->height == this->capacity` then 
- * create a addr_t, newCapacity, set to `this->capacity * 2a`, a `char **newMessages` set to `malloc((sizeof char*) * newCapacity)`
- * Create a for loop that:
- * - goes through every message in this->messages & sets `newMessages[i]` to `this->messages[(this->head + i) % this->capacity]` where i is the index of the loop.
- * Free `this->messages`
- * set `this->messages` to newMessages.
- * set `this->capacity` to newCapacity.
- * set `this->head` to 0a.
- create a `char *`, copy, set to `malloc(1024)`.
- create a for loop from 0 to 1024.
- * set `copy[i]` to `message[i]` and break if `message[i]` is `'\0'`.
- create a addr_t, tail, set to `(this->head + this->height) % this->capacity`. We modulo against capacity because it's a circular queue, meaning that if tail wraps around, it goes to index 0 to reuse the slots.
- set `this->messages[tail]` to copy
- increment `this->height`
Give it a `char *pop()` method that:
- if `this->height == 0a` returns nullptr
- creates a `char *message` set to `this->messages[this->head]`
- sets `this->head` to `(this->head + 1a) % this->capacity`
- decrements `this->height`
- returns message.
Give it a `void _destroy()` method that:
- for i from 0 to `this->height`:
- * create a `addr_t` index set to `(this->head + i) % this->capacity;`
- * free `this->messages[index]`
- free `this->messages`
- set messages, head, height, and capacity to nullptr/0a

You just implemented a circular buffer-queue!

Now, after creating fd and the fds array, create a `PendingMessagesQueue queue` and defer it's ._destroy() method.

In the `fds[0].revents & POLLIN` section of the main loop, after sending the message:

- [ ] Create a `char *` rec, initialized with `queue.pop()`
- [ ] while rec != nullptr:
- * [ ] print `"them: %s"` where %s is rec
- * [ ] free rec
- * [ ] set rec to `queue.pop()`
- [ ] flush stdout

In the other section of the main loop, on `fds[1].revents & (POLLIN | POLLHUP | POLLERR)`:

- [ ] Replace the printf call with queue.push(buf);

Now compile and run! Send a message. It shouldn't display till you send a message with another client!
