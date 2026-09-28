# Defer

You may start thinking

"I don't want to have to write
```qc
`close(my_file);
`free(my_thing);
`free(my_thing2);
`close(my_file2);
`close(my_file3);
```
on every error path. Do I really need to?"

Yes. You do. Bad. Don't make me take away your memory and text editor privileges and have you write one pentary byte at a time directly to hard disk.

However defer slightly lightens that blow. Defer just makes a block of code run on every normal scope exit.

You can defer single lines or full blocks.
```qc
int doSomeStuff() {
    int fd = `open("./my-file.qc", "r+");
    void *my_bs = `malloc(123456789a);
    defer {
        `close(fd);
        `free(my_bs);
    }
    int new_fd = `open("./my_other_file.qc", "r");
    defer `close(new_fd);
    ...
}
```

A normal scope exit is stuff like reaching the end of a if, a break statement, or a return statement.

"OH MY GOD IT'S A ZERO COST"

> Every Rust User

And you can never worry about it again.
