# Final Project 1: Bonus 2

We have a problem: Any rando from the internet can join! So let's fix this, by implementing password verification and handshakes.

# Hashing Algorithms

Before we understand handshakes, you need to understand: Nobody in their right mind stores a password in plain text. Instead, they use a _hashing algorithm_

Hashing algorithms are just one way conversion functions with two important properties: They turn your any-size text into a fixed size hash, and they are _deterministic_, meaning the same input always produces the same output.
SHA256 (The hashing algorithm we will implement today) makes
hello, world 
into
09ca7e4eaa6e8ae9c7d261167129184883644d07dfba7cbfbc4c8a2e08360d5b
And an important thing about good hashing algorithms: _they avalanche_, meaning that a one letter change majorly changes the entire hash.

You may think "how can a hash be irreversible?" That's because hashes are _destructive_. And this is for two reasons:
- They do operations such as oversized bitshifts, bitwise OR, bitwise XOR, bitwise AND, modular addition, and so on, which permanently loses bits.
- It's cramming infinitely many inputs into a fixed size of outputs. The 256 bit output has 1.15792089e77 many combinations. The any-size input has infinite combinations. And infinite is so infinite that that means any one hash has infinite inputs that produce it. Something, something, converging infinities, hollow purple, JJK reference.
This is called "pre-image resistance"
Collisions are a big worry in the hashing space. That's when two inputs make the same output. They are guaranteed for the same reasons hashes are irreversible, however with any sha2 series algorithm, they are basically impossible to find. The thing people are worried about is checksums: Hashes of files to guarantee they are trustworthy. If you have an entirely different file that has the same checksum, then you could put malware in it.
Most passwords don't actually use SHA256. Not because it's bad, but because it's _too good_. It's too fast. A lot of hashing attacks revolve around hashing billions of common passwords to see if they match your password. If an algorithm is too fast, then attackers can solve it too fast. This is why we use algorithms like BCrypt and Argon2id.
Another typical way to make passwords more secure is _salting_. This is adding random bytes to the beginning of the password. This isn't actually to stop those files of passwords: It's to stop _rainbow tables_: Precomputed lookup tables with text and their hashes.

# Implementation 

I won't force you to write sha256: It's awfull to write. Just put this into your file right before your Queue class:
```qc
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
    msg[len] = 0x80y;
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
```

Now, it's time for the handshake.

# Handshakes

There's a problem: Let's say you want to log onto a server with a password and an open socket. If you send a plain text password, anyone sniffing (looking at the packets comming to and fro) the traffic steals it. Even if you send a hash, any attacker can just... steal the hash and replay it later to find your password. (A replay attack).
So how do you prove to the server that you know the password without ever sending the password? You use a challenge-response handshake:
1. The server generates a handfull of random bytes, called a nonce (short for number used once), and sends them to the client.
2. Both the client and the server glue that random nonce to the front of the password (nonce + password) and hash the whole thing with sha256.
3. The client sends its 32-byte hash back to the server. If it matches the server's hash, the server knows the client has the right password and lets the client in.

# Implementation:

Before main, after your send_all/recv_all functions:

- [ ] `void make_proof(byte *nonce, char *password, byte *output)`:
- * [ ] Create a addr_t, plen, set to strlen of password
- * [ ] Create a `byte*`, buf, set to mallocing plen + 16
- * [ ] Call memcpy with buf, nonce, and 16. This puts the nonce first.
- * [ ] Call memcpy with buf + 16, password, and plen. This puts the password second. If nonce was ff618207e8c3ad99, and password was PSWD, then it would produce ff618207e8c3ad99PSWD, 
- * [ ] Call sha256 with buf, 16 + plen, and output 
- * [ ] Free buf
- [ ] `int server_handshake(int c, char *password)`:
- * [ ] Create a byte, need, set to 1 if the password is not nullptr, and 0 if it is.
- * [ ] If the result of calling send_all with c, the address of need, and 1, is less than 0, return -1.
- * [ ] If !need return 0.
- * [ ] Create a `byte*` nonce set to mallocing 16.
- * [ ] Create a `byte*` got set to mallocing 32.
- * [ ] Create a `byte*` want set to mallocing 32.
- * [ ] Create a bool, ok, set to false.
- * [ ] If calling getrandom with nonce, 16, and 0, is equal to 16 and calling send_all with c, nonce, and 16, is equal to 0 and calling recv_all with c, got, and 32, is equal to 0 then:
- * - [ ] Call make_proof with nonce, password, and want.
- * - [ ] Create a byte, diff, set to 0.
- * - [ ] For a integer, i, from 0 to 32, set diff to `diff | (got[i] $ want[i])`
- * - [ ] Set ok to `diff == 0`
- * [ ] Free nonce got and want
- * [ ] Set a byte, result, to 1 if ok and 0 if not.
- * [ ] send_all with c, the address of result, and 1.
- * [ ] Return 0 if ok and -1 if not.
- [ ] `int client_handshake(int fd, char *password)`:
- * [ ] Create a byte, need, set to 0.
- * [ ] If `recv_all(fd, &need, 1)` is less than 0, return -1.
- * [ ] If !need return 0.
- * [ ] If password is null:
- * - [ ] `fprintf(stderr, "server requires a password (--password <pw>)\n");`
- * - [ ] return -1
- * [ ] Create a byte, nonce, set to mallocing 16.
- * [ ] Create a byte, proof, set to mallocing 32.
- * [ ] Create a bool, ok, set to false.
- * [ ] If calling recv_all with fd, nonce, and 16, produces 0:
- * - [ ] Call make_proof with nonce, password, and proof
- * - [ ] If send_all called with fd, proof, and 32, equals 0:
- * - * [ ] Create a byte, result, set to 0.
- * - * [ ] If calling recv_all with fd, the address of result, and 1, produces 0 and result is equal to 1: Set ok to true.
- * [ ] Free nonce and proof.
- * [ ] If !ok print `"wrong password\n"` to stderr.
- * [ ] Return 0 if ok and -1 otherwise.

Now, in main:

Replace the manual argc & --listen check line with this small arg parsing loop:
```qc
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
```
This just simplifys things. Our password will be passed at the end of arguments, prefixed with --password.
Replace both lines of `int port = atoi(argv[2])` to `int port = atoi(pos[1])`.
Replace the `argc == 3` check with a `npos == 2` check.
Right after calling connect, before printing connected, in the client startup else if (The npos == 2 one), If calling client_handshake with fd and password is less than 0, return 1.
Change the help print to `fprintf(stderr, "usage: %s --listen <port> [--password <pw>] | %s <host> <port> [--password <pw>]\n", argv[0], argv[0])`

Replace the full i <= first_peer for loop with:
```qc
        for (addr_t i = nfds - 1a; i >= first_peer; i--) {
            if (!(fds[i].revents & (POLLIN | POLLHUP | POLLERR))) continue;
            int pfd = fds[i].fd;
            int ok = 0;
            i32u_t net_count = 0;
            if (recv_all(pfd, &net_count, 4) == 0) {
                i32u_t count = ntohl(net_count);
                if (count <= 10 * 1024 * 1024) {
                    char *buf = `malloc(count + 1);
                    if (buf) {
                        if (recv_all(pfd, buf, count) == 0) {
                            buf[count] = '\0';
                            addr_t output_len = count + 16;
                            char *tagged = `malloc(output_len);
                            if (tagged) {
                                if (is_server) {
                                    snprintf(tagged, output_len, "[%d] %s", pfd, buf);
                                    addr_t tlen = strlen(tagged);
                                    i32u_t net_len = htonl(tlen);
                                    for (addr_t j = 2a; j < nfds; j++) {
                                        if (fds[j].fd == pfd) continue;
                                        send(fds[j].fd, &net_len, 4, MSG_NOSIGNAL);
                                        send_all(fds[j].fd, tagged, tlen);
                                    }
                                } else {
                                    snprintf(tagged, output_len, "%s", buf);
                                }
                                queue.push(tagged);
                                ok = 1;
                            }
                        }
                        `free(buf);
                    }
                }
            }
            if (!ok) {
                printf("\n[peer %d disconnected]\n", pfd);
                remove_fd(fds, &nfds, i);
                if (!is_server) goto done;
            }
        }
```

Inside the  if (client >= 0) block that calls add_fd and prints if the peer connected, wrap the add_fd and print with a `if (server_handshake(client, password) == 0)` check, and if that fails, close the client and print `"rejected a peer (bad password)\n"`

You should be done! Compile and run just like you do in every lesson, except add a `--password Password` flag to the server, and then with the client, first try not supplying a password, then supplying a bad password, then supplying the right password.
