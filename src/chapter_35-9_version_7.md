# Final Project 1: Final Bonus

Now, we'll implement some quality of life features: Commands and Usernames.
We'll make every user have a username, and make the following commands:
`/dm`: Message one specific user
`/ban`: (Server only) Ban a user
`/refresh`: Display all queued messages
`/exit`: Exit

# Keeping users and fds in Sync

On the server, our fds array already holds every active connection:

- `fds[0]` is stdin
- `fds[1]` is the listening socket
- `fds[2]` and up are the connected clients
  Instead of rewriting fds into a giant struct, let's keep a parallel array called users (`char**`) that tracks each client's name. Because `fds[2]` is the first client, client i in fds always corresponds to `users[i - 2]`.
  Just like `remove_fd` swaps the last element into the deleted slot to avoid shifting the whole array, `remove_user` does the exact same swap-and-pop trick so both arrays stay aligned:
  Try and make remove_user and add_user yourself! If you can't, click the dropdown.

<details>
    <summary>Solution</summary>

```qc
void add_user(char** *users, addr_t *count, addr_t *cap, char *name) {
    if (*count == *cap) {
        *cap = *cap * 2a;
        *users = `realloc(_users, (sizeof char_) * *cap);
    }
    (*users)[*count] = name;
    (*count)++;
}

void remove_user(char* *users, addr_t *count, addr_t index) {
    `free(users[index]);
    users[index] = users[*count - 1a];
    (*count)--;
}
```

</details>

Whenever a client disconnects, whether cleanly, from a failed send, or via /ban, call both remove_fd and remove_user together so usernames never drift out of sync with their sockets. We also wire up a defer block right after allocating users so every name string and the array itself get freed automatically when main exits.
Try and do this!

When connecting as a client, we now take a `<username>` argument (`./a.out <host> <port> <username> [--password <pw>]`). Immediately after client_handshake succeeds, the client ahouls send the 4-byte length of their username followed by the username bytes:

```qc
i32u_t num = strlen(pos[2]);
send_all(fd, &num, 4);
send_all(fd, pos[2], strlen(pos[2]));
```

On the server side, as soon as server_handshake succeeds on a new connection, the server reads that length, reads the username string, and pushes it into users with add_user.

To route messages or kick users by name, add fd_idx_from_user. It walks users and returns the matching index in fds (adding 2 to skip stdin and the listening socket, or returning 1 if the target is "server"):

```qc
int fd_idx_from_user(char _name, char_ *users, addr_t num_users) {
    if (strcmp(name, "server") == 0) return 1;
    for (addr_t i = 0; i < num_users; i++) {
        if (strcmp(name, users[i]) == 0) {
            return i + 2;
        }
    }
    return -1;
}
```

Before broadcasting whatever you type into stdin, null-terminate the input line (line[total] = '\0') and check if it starts with a command:

- `/exit`: Frees the input line, flushes any unread messages sitting in queue to stdout, and breaks out of the main loop.
- `/ban <user>`: Server-only. Strips the trailing newline, looks up the target's index in fds, and removes them from both users and fds, which closes their socket and boots them from the room.
- `/dm <user> <message>`: Server-only shortcut for messaging a single client. Split the string at the first space (space[0] = '\0') to separate the username from the message, look up their fd, and send the message directly to that one socket instead of looping over fds.
- `/refresh` or empty newline: Ignored as a message so pressing Enter just lets the loop cycle and print any queued messages without spamming empty lines to everyone.

Finally, when the server receives a packet from client i, have it checks if the message starts with /dm before broadcasting it to everyone:

- It splits the incoming buffer at the first space to grab target and msg (making sure a message actually exists after the space).
- It formats the message as `[DM from <username>/<fd>] <msg>` 
- If target is server, it pushes it into the server's local queue so it prints on the next refresh.
- Otherwise, it looks up dest_fd with fd_idx_from_user and sends the formatted DM straight to that specific user's socket, cleaning up fds and users if that send fails.

This is because dm's get routed to the server first, then to the user.

Try and implement all that and test it! If you fail or are having trouble, here's what the final code should look like:

<details>
    <summary>Solution</summary>

```qc
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <errno.h>
#include <arpa/inet.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <poll.h>
#include <sys/random.h>
void sha256(byte *data, addr_t len, byte *output) {
    i32u_t[64] K = [
        0x428a2f98iu, 0x71374491iu, 0xb5c0fbcfiu, 0xe9b5dba5iu, 0x3956c25biu, 0x59f111f1iu, 0x923f82a4iu, 0xab1c5ed5iu,
        0xd807aa98iu, 0x12835b01iu, 0x243185beiu, 0x550c7dc3iu, 0x72be5d74iu, 0x80deb1feiu, 0x9bdc06a7iu, 0xc19bf174iu,
        0xe49b69c1iu, 0xefbe4786iu, 0x0fc19dc6iu, 0x240ca1cciu, 0x2de92c6fiu, 0x4a7484aaiu, 0x5cb0a9dciu, 0x76f988daiu,
        0x983e5152iu, 0xa831c66diu, 0xb00327c8iu, 0xbf597fc7iu, 0xc6e00bf3iu, 0xd5a79147iu, 0x06ca6351iu, 0x14292967iu,
        0x27b70a85iu, 0x2e1b2138iu, 0x4d2c6dfciu, 0x53380d13iu, 0x650a7354iu, 0x766a0abbiu, 0x81c2c92eiu, 0x92722c85iu,
        0xa2bfe8a1iu, 0xa81a664biu, 0xc24b8b70iu, 0xc76c51a3iu, 0xd192e819iu, 0xd6990624iu, 0xf40e3585iu, 0x106aa070iu,
        0x19a4c116iu, 0x1e376c08iu, 0x2748774ciu, 0x34b0bcb5iu, 0x391c0cb3iu, 0x4ed8aa4aiu, 0x5b9cca4fiu, 0x682e6ff3iu,
        0x748f82eeiu, 0x78a5636fiu, 0x84c87814iu, 0x8cc70208iu, 0x90befffaiu, 0xa4506cebiu, 0xbef9a3f7iu, 0xc67178f2iu
    ];
    i32u_t h0 = 0x6a09e667iu;
    i32u_t h1 = 0xbb67ae85iu;
    i32u_t h2 = 0x3c6ef372iu;
    i32u_t h3 = 0xa54ff53aiu;
    i32u_t h4 = 0x510e527fiu;
    i32u_t h5 = 0x9b05688ciu;
    i32u_t h6 = 0x1f83d9abiu;
    i32u_t h7 = 0x5be0cd19iu;
    addr_t total = ((len + 9 + 63) / 64) * 64;
    byte *msg = `calloc(total, 1);
    memcpy(msg, data, len);
    msg[len] = 0x80;
    addr_t bits = len * 8;
    for (int i = 0; i < 8; i++) msg[total - 1 - i] = ((bits :> (8 * i)) & 0xff) as byte;
    i32u_t[64] w;
    for (addr_t off = 0; off < total; off += 64) {
        for (int i = 0; i < 16; i++) {
            addr_t o = off + i * 4;
            w[i] = ((msg[o] as i32u_t) << 24) | ((msg[o + 1] as i32u_t) << 16) |
                   ((msg[o + 2] as i32u_t) << 8) | (msg[o + 3] as i32u_t);
        }
        for (int i = 16; i < 64; i++) {
            i32u_t s0 = (w[i - 15] |>> 7) $ (w[i - 15] |>> 18) $ (w[i - 15] :> 3);
            i32u_t s1 = (w[i - 2] |>> 17) $ (w[i - 2] |>> 19) $ (w[i - 2] :> 10);
            w[i] = w[i - 16] + s0 + w[i - 7] + s1;
        }
        i32u_t a = h0; i32u_t b = h1; i32u_t c = h2; i32u_t d = h3;
        i32u_t e = h4; i32u_t f = h5; i32u_t g = h6; i32u_t hh = h7;
        for (int i = 0; i < 64; i++) {
            i32u_t S1 = (e |>> 6) $ (e |>> 11) $ (e |>> 25);
            i32u_t ch = (e & f) $ ((~e) & g);
            i32u_t t1 = hh + S1 + ch + K[i] + w[i];
            i32u_t S0 = (a |>> 2) $ (a |>> 13) $ (a |>> 22);
            i32u_t maj = (a & b) $ (a & c) $ (b & c);
            i32u_t t2 = S0 + maj;
            hh = g; g = f; f = e; e = d + t1;
            d = c; c = b; b = a; a = t1 + t2;
        }
        h0 += a; h1 += b; h2 += c; h3 += d; h4 += e; h5 += f; h6 += g; h7 += hh;
    }
    `free(msg);
    i32u_t[8] hs = [h0, h1, h2, h3, h4, h5, h6, h7];
    for (int i = 0; i < 8; i++) {
        output[i * 4]     = ((hs[i] :> 24) & 0xff) as byte;
        output[i * 4 + 1] = ((hs[i] :> 16) & 0xff) as byte;
        output[i * 4 + 2] = ((hs[i] :> 8) & 0xff) as byte;
        output[i * 4 + 3] = (hs[i] & 0xff) as byte;
    }
}
class PendingMessagesQueue {
    char **messages;
    addr_t head;
    addr_t height;
    addr_t capacity;
    PendingMessagesQueue() {
        this->messages = nullptr;
        this->head = 0a;
        this->height = 0a;
        this->capacity = 0a;
    }
    void push(char *message) {
        if (!this->messages) {
            this->capacity = 2a;
            this->messages = `malloc((sizeof char*) * this->capacity);
        } else if (this->height == this->capacity) {
            addr_t new_cap = this->capacity * 2a;
            char **new_msgs = `malloc((sizeof char*) * new_cap);
            for (addr_t i = 0a; i < this->height; i++) {
                new_msgs[i] = this->messages[(this->head + i) % this->capacity];
            }
            `free(this->messages);
            this->messages = new_msgs;
            this->head = 0a;
            this->capacity = new_cap;
        }
        addr_t tail = (this->head + this->height) % this->capacity;
        this->messages[tail] = message;
        this->height++;
    }
    char *pop() {
        if (this->height == 0a) {
            return nullptr;
        }
        char *message = this->messages[this->head];
        this->head = (this->head + 1a) % this->capacity;
        this->height--;
        return message;
    }
    void _destroy() {
        for (addr_t i = 0a; i < this->height; i++) {
            addr_t index = (this->head + i) % this->capacity;
            `free(this->messages[index]);
        }
        `free(this->messages);
        this->messages = nullptr;
        this->head = 0a;
        this->height = 0a;
        this->capacity = 0a;
    }
}
void add_fd(pollfd* *fds, addr_t *count, addr_t *cap, int fd) {
    if (*count == *cap) {
        *cap = *cap * 2a;
        *fds = `realloc(*fds, (sizeof pollfd) * *cap);
    }
    (*fds)[*count].fd = fd;
    (*fds)[*count].events = POLLIN;
    (*fds)[*count].revents = 0;
    (*count)++;
}
void add_user(char** *users, addr_t *count, addr_t *cap, char *name) {
    if (*count == *cap) {
        *cap = *cap * 2a;
        *users = `realloc(*users, (sizeof char*) * *cap);
    }
    (*users)[*count] = name;
    (*count)++;
}
void remove_user(char* *users, addr_t *count, addr_t index) {
    `free(users[index]);
    users[index] = users[*count - 1a];
    (*count)--;
}
void remove_fd(pollfd *fds, addr_t *count, addr_t index) {
    close(fds[index].fd);
    fds[index] = fds[*count - 1a];
    (*count)--;
}
int send_all(int fd, void *buf, addr_t len) {
    addr_t total_sent = 0;
    byte *ptr = buf;
    while (total_sent < len) {
        long int sent = send(fd, ptr + total_sent, len - total_sent, MSG_NOSIGNAL);
        if (sent <= 0) return -1;
        total_sent += sent;
    }
    return 0;
}
int recv_all(int fd, void *buf, addr_t len) {
    addr_t total_received = 0;
    char *ptr = buf;
    while (total_received < len) {
        long int bytes = recv(fd, ptr + total_received, len - total_received, 0);
        if (bytes <= 0) {
            return -1;
        }
        total_received += bytes;
    }
    return 0;
}
void make_proof(byte *nonce, char *password, byte *output) {
    addr_t plen = strlen(password);
    byte *buf = `malloc(16 + plen);
    memcpy(buf, nonce, 16);
    memcpy(buf + 16, password, plen);
    sha256(buf, 16 + plen, output);
    `free(buf);
}
int server_handshake(int c, char *password) {
    byte need = (password != nullptr) ? 1 : 0;
    if (send_all(c, &need, 1) < 0) return -1;
    if (!need) return 0;
    byte *nonce = `malloc(16);
    byte *got = `malloc(32);
    byte *want = `malloc(32);
    bool ok = false;
    if (getrandom(nonce, 16, 0) == 16 && send_all(c, nonce, 16) == 0 && recv_all(c, got, 32) == 0) {
        make_proof(nonce, password, want);
        byte diff = 0;
        for (int i = 0; i < 32; i++) diff = diff | (got[i] $ want[i]);
        ok = (diff == 0);
    }
    `free(nonce); `free(got); `free(want);

    byte result = ok ? 1 : 0;
    send_all(c, &result, 1);
    return ok ? 0 : -1;
}
int client_handshake(int fd, char *password) {
    byte need = 0;
    if (recv_all(fd, &need, 1) < 0) return -1;
    if (!need) return 0;
    if (password == nullptr) {
        fprintf(stderr, "server requires a password (--password <pw>)\n");
        return -1;
    }
    byte *nonce = `malloc(16);
    byte *proof = `malloc(32);
    bool ok = false;
    if (recv_all(fd, nonce, 16) == 0) {
        make_proof(nonce, password, proof);
        if (send_all(fd, proof, 32) == 0) {
            byte result = 0;
            if (recv_all(fd, &result, 1) == 0 && result == 1) ok = 1;
        }
    }
    `free(nonce); `free(proof);
    if (!ok) fprintf(stderr, "wrong password\n");
    return ok ? 0 : -1;
}
int fd_idx_from_user(char *name, char* *users, addr_t num_users) {
    if (strcmp(name, "server") == 0) return 1;
    for (addr_t i = 0; i < num_users; i++) {
        if (strcmp(name, users[i]) == 0) {
            return i + 2;
        }
    }
    return -1;
}

// Usage:
//   ./a.out --listen <port> [--password <pw>]
//   ./a.out <host> <port> <username> [--password <pw>]
int main(int argc, char **argv) {
    PendingMessagesQueue queue = PendingMessagesQueue();
    defer queue._destroy();
    int fd = 0;
    addr_t nfds = 0a;
    addr_t fds_cap = 4a;
    pollfd *fds = `malloc((sizeof pollfd) * fds_cap);
    add_fd(&fds, &nfds, &fds_cap, STDIN_FILENO);
    addr_t nusers = 0a;
    addr_t users_cap = 4a;
    char* *users = `malloc((sizeof char*) * users_cap);
    defer {
        for (addr_t i = 0a; i < nusers; i++) {
            `free(users[i]);
        }
        `free(users);
    }
    bool is_server = false;
    char *password = nullptr;
    char **pos = `malloc((sizeof char*) * argc);
    int npos = 0;
    for (int i = 1; i < argc; i++) {
        if (strcmp(argv[i], "--password") == 0) {
            if (i + 1 >= argc) {
                fprintf(stderr, "--password needs a value\n");
                return 1;
            }
            password = argv[i + 1];
            i++;
        } else {
            pos[npos] = argv[i];
            npos++;
        }
    }
    if (npos == 2 && strcmp(pos[0], "--listen") == 0) {
        int port = atoi(pos[1]);
        is_server = true;
        int s = socket(AF_INET, __socket_type.SOCK_STREAM, 0);
        if (s < 0) { perror("socket"); return 1; }
        int one = 1;
        setsockopt(s, SOL_SOCKET, SO_REUSEADDR, &one, sizeof one);
        sockaddr_in addr = sockaddr_in{0};
        addr.sin_family = AF_INET;
        addr.sin_addr.s_addr = htonl(INADDR_ANY);
        addr.sin_port = htons(port);
        if (bind(s, (&addr) as sockaddr*, sizeof addr) < 0) { perror("bind"); return 1; }
        if (listen(s, SOMAXCONN) < 0) { perror("listen"); return 1; }
        printf("listening on %d...\n", port);
        add_fd(&fds, &nfds, &fds_cap, s);
    } else if (npos == 3) {
        int port = atoi(pos[1]);
        fd = socket(AF_INET, __socket_type.SOCK_STREAM, 0);
        if (fd < 0) { perror("socket"); return 1; }
        sockaddr_in addr = {0};
        addr.sin_family = AF_INET;
        addr.sin_port = htons(port);
        if (inet_pton(AF_INET, argv[1], &addr.sin_addr) != 1) {
            fprintf(stderr, "bad address: %s\n", argv[1]);
            return 1;
        }
        if (connect(fd, (&addr) as sockaddr*, sizeof addr) < 0) { perror("connect"); return 1; }
        if (client_handshake(fd, password) < 0) return 1;
        i32u_t num = strlen(pos[2]);
        send_all(fd, &num, 4);
        send_all(fd, pos[2], strlen(pos[2]));
        printf("connected\n");
        add_fd(&fds, &nfds, &fds_cap, fd);
    } else {
        fprintf(stderr, "usage: %s --listen <port> [--password <pw>] | %s <host> <port> <username> [--password <pw>]\n", argv[0], argv[0]);
        return 1;
    }
    for (;;) {
        int r = poll(fds, nfds, -1);
        if (r < 0) {
            if (errno == EINTR) continue;
            perror("poll"); break;
        }
        if (fds[0].revents & POLLIN) {
            addr_t cap = 32;
            addr_t total = 0;
            char *line = `malloc(cap);
            long int n;
            for (;;) {
                n = read(STDIN_FILENO, line + total, 32);
                if (n <= 0) break;
                total += n;
                if (n < 32) break;
                pollfd p;
                p.fd = STDIN_FILENO;
                p.events = POLLIN;
                p.revents = 0;
                if (poll(&p, 1, 0) <= 0 || !(p.revents & POLLIN)) break;
                cap += 32;
                line = `realloc(line, cap);
            }
            if (n < 0 || (n == 0 && total == 0)) {
                `free(line);
                break;
            }
            line = `realloc(line, total + 1);
            line[total] = '\0';
            if (strcmp(line, "/exit\n") == 0 || strcmp(line, "/exit") == 0) {
                `free(line);
                char *rec = queue.pop();
                while (rec != nullptr) {
                    printf("them: %s", rec);
                    `free(rec);
                    rec = queue.pop();
                }
                fflush(stdout);
                break;
            } else if (strncmp(line, "/ban ", 5) == 0) {
                if (!is_server) {
                    printf("only the server can ban users\n");
                } else {
                    if (total > 0 && line[total - 1] == '\n') {
                        line[total - 1] = '\0';
                    }
                    int fd = fd_idx_from_user(line + 5, users, nusers);
                    if (fd == -1) {
                        printf("no such user %s\n", line + 5);
                    } else {
                        if (fd > 1 && is_server) remove_user(users, &nusers, fd - 2);
                        remove_fd(fds, &nfds, fd);
                        printf("banned user %s\n", line + 5);
                    }
                }
            } else if (is_server && strncmp(line, "/dm ", 4) == 0) {
                if (total > 0 && line[total - 1] == '\n') {
                    line[total - 1] = '\0';
                }
                char *user = line + 4;
                char *space = strchr(user, ' ');
                if (space == nullptr || space[1] == '\0') {
                    printf("expected message in /dm\n");
                } else {
                    space[0] = '\0';
                    char *msg = space + 1;
                    int fd = fd_idx_from_user(user, users, nusers);
                    if (fd == -1) {
                        printf("no such user %s\n", user);
                    } else {
                        i32u_t msg_len = strlen(msg);
                        i32u_t net_num = htonl(msg_len);
                        if (send(fds[fd].fd, &net_num, 4, MSG_NOSIGNAL) != 4 || send_all(fds[fd].fd, msg, msg_len) < 0) {
                            remove_fd(fds, &nfds, fd);
                            remove_user(users, &nusers, fd - 2);
                        }
                    }
                }
            } else if (strncmp(line, "/refresh", 8) == 0 || (strcmp(line, "\n") == 0)) {
            } else {
                i32u_t net_num = htonl(total);
                for (addr_t i = nfds - 1a; i >= 1a; i--) {
                    if (is_server && i == 1a) break;
                    if (send(fds[i].fd, &net_num, 4, MSG_NOSIGNAL) != 4 || send_all(fds[i].fd, line, total) < 0) {
                        remove_fd(fds, &nfds, i);
                        if (is_server && i > 2) remove_user(users, &nusers, i - 2);
                    }
                }
            }
            char *rec = queue.pop();
            while (rec != nullptr) {
                printf("them: %s", rec);
                `free(rec);
                rec = queue.pop();
            }
            fflush(stdout);
            `free(line);
            if (n == 0) {
                break;
            }
        }
        addr_t first_peer = is_server ? 2a : 1a;
        for (addr_t i = nfds - 1a; i >= first_peer; i--) {
            if (!(fds[i].revents & (POLLIN | POLLHUP | POLLERR))) continue;
            int pfd = fds[i].fd;
            bool ok = false;
            i32u_t net_count = 0;
            if (recv_all(pfd, &net_count, 4) == 0) {
                i32u_t count = ntohl(net_count);
                if (count <= 10 * 1024 * 1024) {
                    char *buf = `malloc(count + 1);
                    if (buf) {
                        if (recv_all(pfd, buf, count) == 0) {
                            buf[count] = '\0';
                            addr_t output_len = count + (is_server ? strlen(users[i - 2]) + 24a : 16a);
                            char *tagged = `malloc(output_len);
                            if (tagged) {
                                if (is_server) {
                                    if (strncmp(buf, "/dm ", 4) == 0) {
                                        if (count > 0 && buf[count - 1] == '\n') {
                                            buf[count - 1] = '\0';
                                        }
                                        char *target = buf + 4;
                                        char *space = strchr(target, ' ');
                                        if (space == nullptr || space[1] == '\0') {
                                            printf("expected message in /dm\n");
                                            continue;
                                        }
                                        space[0] = '\0';
                                        char *msg = space + 1;
                                        if (strcmp(target, "server") == 0) {
                                            snprintf(tagged, output_len, "[DM from %s/%d] %s\n", users[i - 2], pfd, msg);
                                            queue.push(tagged);
                                        } else {
                                            int dest_fd = fd_idx_from_user(target, users, nusers);
                                            if (dest_fd != -1) {
                                                addr_t dm_cap = strlen(users[i - 2]) + strlen(msg) + 32a;
                                                char *dm_out = `malloc(dm_cap);
                                                int dm_len = snprintf(dm_out, dm_cap, "[DM from %s/%d] %s\n", users[i - 2], pfd, msg);
                                                i32u_t net_dm = htonl(dm_len);
                                                if (send(fds[dest_fd].fd, &net_dm, 4, MSG_NOSIGNAL) != 4 ||
                                                    send_all(fds[dest_fd].fd, dm_out, dm_len) < 0) {
                                                    remove_fd(fds, &nfds, dest_fd);
                                                    remove_user(users, &nusers, dest_fd - 2);
                                                    if (dest_fd < i) i--;
                                                }
                                                `free(dm_out);
                                            }
                                            `free(tagged);
                                        }
                                    } else {
                                        snprintf(tagged, output_len, "[%s/%d] %s", users[i - 2], pfd, buf);
                                        addr_t tlen = strlen(tagged);
                                        i32u_t net_len = htonl(tlen);
                                        for (addr_t j = 2a; j < nfds; j++) {
                                            if (fds[j].fd == pfd) continue;
                                            send(fds[j].fd, &net_len, 4, MSG_NOSIGNAL);
                                            send_all(fds[j].fd, tagged, tlen);
                                        }
                                        queue.push(tagged);
                                    }
                                } else {
                                    snprintf(tagged, output_len, "%s", buf);
                                    queue.push(tagged);
                                }
                                ok = true;
                            }
                        }
                        `free(buf);
                    }
                }
            }
            if (!ok) {
                printf("\n[peer %d disconnected]\n", pfd);
                remove_fd(fds, &nfds, i);
                if (is_server) {
                    remove_user(users, &nusers, i - 2);
                } else {
                    goto done;
                }
            }
        }
        if (is_server && (fds[1].revents & POLLIN)) {
            int client = accept(fds[1].fd, nullptr, nullptr);
            if (client >= 0) {
                if (server_handshake(client, password) == 0) {
                    i32u_t username_length = 0iu;
                    recv_all(client, &username_length, 4);
                    char *name = `malloc((sizeof char) * (username_length + 1));
                    recv_all(client, name, username_length);
                    name[username_length] = '\0';
                    add_user(&users, &nusers, &users_cap, name);
                    add_fd(&fds, &nfds, &fds_cap, client);
                    printf("peer %s (id %d) connected\n", name, client);
                } else {
                    close(client);
                    printf("rejected a peer (bad password)\n");
                }
            }
        }
    }
    done:
    for (addr_t i = 0a; i < nfds; i++) close(fds[i].fd);
    `free(fds);
    return 0;
}
```

</details>


You now have built a full P2P communication app!
