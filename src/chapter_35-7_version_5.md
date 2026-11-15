# Final Poroject 1: Bonus 1

Two people is _soooo_ boring. How about... a lot of people?

Remember our awsome best friend poll? It's still just as awsome and can handle any amount of fds.

First, right after your MessagesQueue class, make two helpers, add_fd and remove_fd.
- `void add_fd(pollfd **fds, addr_t *count, addr_t *cap, int fd)`:
> remember to dereference
- [ ] if count is equal to capcity:
- * [ ] set cap to cap times two
- * [ ] set fds to the result of reallocating fds with the size of pollfd times cap.
- [ ] set fds at count's `.fd` field to fd
- [ ] set fds at count's `.events` field to POLLIN
- [ ] set fds at count's `.revents` field to 0
- [ ] increment count
- `void remove_fd(pollfd *fds, addr_t *count, addr_t index)`:
- [ ] close fds at index's `.fd` field
- [ ] set fds at index to fds at count - 1
- [ ] decrement count

Then, in send_all, change the 0 argument in send to MSG_NOSIGNAL to handle clients crashing.
Now, replace the big `pollfd[2] fds` block with:
- [ ] Declare a addr_t variable nfds set to `0a`
- [ ] Declare a addr_t variable fds_cap set to `4a`
- [ ] Declare a `pollfd *` variable fds set to mallocing the size of pollfd times fds_cap
- [ ] call add_fd with the address of fds, address of nfds, addreess of fds_cap, and STDIN_FILENO
- [ ] create a boolean, is_server, set to false.

In the `--listen` block:
- [ ] In the begining of the block, set is_server to true.
- [ ] In the if (listen(s, 1) < 0) block, change 1 to SOMAXCONN.
- [ ] Delete the fd = accept ... up to the printing peer connected line, and repalace it with a call to add_fd with the first three args the same as previously, and s.
In the else if block, after printing connected, call add_fd with the first three args the same as previously, and fd.
Delete the line that sets `fds[1].fd` to fd.
Change the poll call to use nfds instead if 2.
Change the `long int n = read... while (n == 32)... {` lines to:
- [ ] Declaring a long int, n
- [ ] infinite loop (your pick)
- * [ ] set n to the read call you just deleted, except instead of calling with line as arg 2, call with line + total.
- * [ ] if n is less than or equal to 0, break.
In that same loop, after adding n to total, check if n is less than 32, and break if it is.
Then:
- [ ] Declare a pollfd p
- [ ] set it's `.fd` field to STDIN_FILENO
- [ ] set it's `.events` field to POLLIN
- [ ] set it's `.revents'` field to 0
- [ ] if calling poll with the address of p, 1, and 0 is less than or equal to 0 or `!(p.revents & POLLIN)` break
- [ ] delete the `n = read (STDIN_FILENO, line + total, 32)` line at the end of the loop - you already do it earlier.
After the loop, after the `n < 0...` check that frees line and breaks, delete the `total += n` line and replace the `send(fd... send_all(fd, ...)` lines with:
- [ ] `for (addr_t i = nfds; i >= 1a; i--)`:
- * [ ] if is_server and i is 1, break
- * [ ] create a i32u_t, net_num, set to the result of calling htonl with total.
- * [ ] if calling send with `fds[i].fd`, the address of net_num, 4, and MSG_NOSIGNAL is not 4, or calling send_all with the same fd, line, and total is less than 0:
- * - [ ] call remove_fd with fds, the address of nfds, and i.

Delete the entire `if (fds[1].revents...)` block, and replace it with:
- [ ] Create a addr_t, first_peer, set to 2 if is_server and 1 otherwise.
- [ ] `for (addr_t i = nfds - 1a; i >= first_peer; i--)`:
- * [ ] `if (!(fds[i].revents & (POLLIN | POLLHUP | POLLERR))) continue;`
- * [ ] Create a int, pfd, set to `fds[i].fd`
- * [ ] Create a bool, ok, set to false.
- * [ ] Create a i32u_t, net_count, set to 0.
- * [ ] If calling recv_all with pfd, the address of net_count, and 4 is 0:
- * - [ ] Create a i32u_t, count, set to the result of calling ntohl with net_count.
- * - [ ] If count is less than or equal to 10 times 1024 times 1024:
- * - * [ ] Create a `char*`, buf, set to the result of calling malloc with count + 1.
- * - * [ ] If buf:
- * - * - [ ] if calling recv_all with pfd, buf, and count results in 0:
- * - * - * [ ] set buf at count to `'\0'`
- * - * - * [ ] Create a size_t, out_len, set to count + 16.
- * - * - * [ ] Create a `char*`, tagged, set to the result of calling malloc on out_len
- * - * - * [ ] If tagged:
- * - * - * - [ ] If server:
- * - * - * - * [ ] Call snprintf with tagged, out_len, `"[%d] %s"`, pfd, and buf
- * - * - * - * [ ] Create a addr_t, tlen, set to calling strlen on tagged.
- * - * - * - * [ ] Create a i32u_t, net_len, set to the result of calling htonl on tlen
- * - * - * - * [ ] `for (addr_t j = 2a; j < nfds; j++)`:
- * - * - * - * - [ ] if `fds[j].fd` is equal to pfd continue
- * - * - * - * - [ ] `send(fds[j].fd, &net_len, 4, MSG_NOSIGNAL);`
- * - * - * - * - [ ] `send_all(fds[j].fd, tagged, tlen);`
- * - * - * - [ ] Else:
- * - * - * - * [ ] Call snprintf with tagged, out_len, `"%s"`, and buf
- * - * - * - [ ] push `tagged` onto queue and set ok to true.
- * - * - [ ] free buf
- * [ ] if not ok:
- * - [ ] `printf("\n[peer %d disconnected]\n", pfd);`
- * - [ ] Call remove_fd with fds, the address of nfds, and i.
- * - [ ] If !is_server, jmp done.
- [ ] If is_server and `(fds[1].revents & POLLIN)`
- * [ ] Create a int, client, set to calling accept with `fds[1].fd`, nullptr, and nullptr
- * [ ] If client is `>= 0`:
- * - [ ] `add_fd(&fds, &nfds, &fds_cap, client);`
- * - [ ] `printf("peer %d connected\n", client);`

Replace `close(fd);` with:
```
done:
    for (addr_t i = 0a; i < nfds; i++) close(fds[i].fd);
    `free(fds);
```

Done! Now compile and run just like the first times, except, connect a third terminal to the ip with the same command as the second. They should all message eachother!
