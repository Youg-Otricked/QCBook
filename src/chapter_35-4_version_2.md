# Final Project 1: Version 2.

This version, we're gonna implement real time messaging, just like any chat app.

First, were gonna add two more includes: `errno.h` and `poll.h`. These are necceary for realtime. 
Then, in main, declare a array of 2 pollfds, initialized with `[pollfd, 2]`. This is what will store the standard input & internet connection file descriptors. Set `fds[0].fd` to STDIN_FILENO, and 
`fds[0].events` to POLLIN, which tells it to poll stdin, and set `fds[1].events` to POLLIN too, for out eventual 2nd fd.
Then, delete my_turn, and instead set `fds[1].fd` to fd.
Along with buf, declare a second array just like it, named line.
Were making this fd list to use poll. This will basically instead of endlessly blocking on user input, wait till either of these fds has content to read, and wake up the app for it!
Now delete the entire if (my_turn) block. Replace it with:

- [ ] Declare a integer named r set to the result of calling poll with fds, 2, and -1. This starts polling those two file descriptors we setup. The 2 is the number of fds.
- [ ] if r is less than 0, then check errno (a variable in the errno header). If it is equal to EINTR, continue, and otherwise, perror on `"poll"` and break.
- [ ] if `fds[0].revents` bitwise anded with POLLIN:
- * [ ] declare a long int, n, set to the result of read with args STDIN_FILENO, line, and sizeof line. This reads sizeof line (1024) chars from stdin into line.
- * [ ] if n is less than or equal to 0, break.
- * [ ] call send with fd, line, n, and 0. This will send fd (the server/client's network connection fd) the first n bytes of line.
- [ ] if `fds[1].revents` bitwise anded with (POLLIN | POLLHUP | POLLERR):
- * [ ] declare a long int n, set to the result of recv with args fd, buf, (sizeof buf) - 1, and 0. This reads up to sizeof buf - 1 (1023) chars from the network in to buf.
- * [ ] if n is less than or equal to 0, print `"[peer disconnected]\n"` and break.
- * [ ] set `buf[n]` to `'\0'`.
- * [ ] print `them: %s` where %s is buf.

Delete the setting of my_turn to !my_turn.

Now you should have a unbuffered version! Try it. Compile and run just like you did last time, and try and send mutliple messages in a row from client to server. It should work! You now have a unbuffered chat system!

Let's do a little challenge and see if you can see what and why we are going to fix next. Type half a message on one instance of the app, and send a message on the other.
