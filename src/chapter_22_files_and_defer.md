# Files & Defer

Files use the open, read, write and close syscalls.
The `open` syscall is syscall 2, `read` is 0, `write` is 1 (Remember? Output is a file you `write` to), and `close` is 3.

Open returns a file descriptor, `read` returns the amount of bytes read, `write` returns the amount of bytes written and `close` doesn't return. Simple!

## Defer

Defer just emits your deferred code on every scope exit.

```qc
int main() {
    int *x = `malloc(sizeof int);
    defer `free(x);
    ...
    if (...) {
        return 1;
    }
    return 0;
}
```

Will emit to:

```llvm
define i32 @__user_entry() { ; what main compiles to
    %x = call ptr malloc(i32 4);
    ...
    %ifcond = % ; my condition <% is a placeholder>
    br i1 %ifcond, label %then, label %ifcont
then:
    call void free(ptr %x)
    ret i32 1
ifcont:
    call void free(ptr %x)
    ret i32 0
}
```

And thus

```asm
...
_start:
    ...
    mov rdi, 4
    call malloc
    mov [x], rax
    ...
    cmp ...
    je .then
    jmp .ifcont
.then:
    mov rdi, [x]
    call free
    ; exit with code 1
.ifcont:
    mov rdi, [x]
    call free
    ; exit with code 0
```
