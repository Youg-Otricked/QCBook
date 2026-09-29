# Now how did that simple project work?

## Variables

When you declare a variable, a llvm `alloca` is created, which is a stack storage space.

```qc
int x = 12;
```
could become
```llvm
%x = alloca i32, align 4
call void @llvm.memset.p0.i64(ptr align 4 %x, i8 0, i64 4, i1 false)
store i32 0, ptr %x, align 4
```

Because `int` is a 32 bit integer, the llvm type is `i32`.

The `alloca` instruction creates a alloca of x type, and `align` aligns the memory to a specific byte alignment, so

```llvm
%x = alloca i32, align 4
```

Creates a 4 byte stack slot aligned with every 4 bytes and stores it in x.

The `call` calls the `llvm.memset` intrinsic, which sets all the bits to 0, then finally the store stoes a 0 into x. The align 4 is there for the same reason as the alloca.

In ASM, variables are just stored directly in memory. You know the stack? That's still a part of ASM. That alloca instruction just moves the stack pointer.
The stack pointer points to where in the stack you are currently accessing. That's the `rsp` register. At the beginning of your function, `rsp` is subtracted enough bytes to create enough space for the function, e.g.

```asm
sub rsp, 64
```

Then, `alloca` actually just stores the stack pointer + an offset. e.g.
```asm
mov [rsp + 4], 64
```

Or if the size is unknown, 
```asm
; size is in rdi
add rdi, 15 ; alignment calculation
and rdi, -16 ; forces 16 bit align
sub rsp, rdi ; sets up rsp
mov rax, rsp ; moves data to rsp
```

## Functions

Functions in llvm look somewhat similar to normal functions.
```qc
int ret1() {
    return 1;
}
```
becomes 
```llvm
define i32 @ret1() !qc.return_types !0 {
    ret i32 1
}
```

Define defines a function, the i32 is the return type, the @ marks the names start, the parameters are empty, the !qc.return_types !0 are attributes storing the functions return type metadata for the compiler,
and the ret instruction returns a value.

A function with parameters would look like this
```llvm
define i32 @add(i32 %a, i32 %b) {
    ...
}
```

They look similar to normal parameters.

To call, the call instruction is emitted.

```llvm
%res = call i32 @add(i32 12, i32 12)
```

It goes `call <return type> <name>(<args>)`

In asm, functions are just labels (spots you can jump to in code) with special conventions and instructions.

The conventions: arg 1 goes in `rdi`, arg 2 goes in `rsi`, arg 3 goes in `rdx`..., up to `r9` then your return value goes in rax. All arguments past 6 must go inside the stack.
Certain registers are saved by the function (callee save)
Our add function:
```asm
add_nums:
    mov rax, rdi ; store rdi in rax
    add rax, rsi ; add rsi to it
    ret ; return 
_entry:
    mov rdi, 12
    mov rsi, 2
    call add_nums
```
The call function stores on the stack (yes, just the top of rsp) `rip` (the instruction pointer, stores the current instruction address, thus the address after the call).
The ret instruction just looks at the top of the stack to see where to go.

## Printing

The `` `qout `` intrinsic literally just emits a ton of calls, such as:

```llvm
call void qc_print_string(call ptr qc_fmt_int(i32 123))
```

The `` `qout `` intrinsic just turns your format string into a lot of calls, which can then be optimized.

This actually works via something called _syscalls_, which are special functions exposed by the operating system that allows you to perform operations that you can't do by your self. Specifically, the `` `qout `` intrinsic uses the write syscall.

Syscalls work like this: You move the number of the syscall (1 for write) into `rax`, then the arguments like normal calling conventions except `rcx` is `r10`, and then the return result is either not there or in rax. `rcx` and `r11` are destroyed by syscalls and are _caller save_, unlike _callee save_. All the argument registers + `r10` and `r11` are caller save, `rbp`, `rsp`, and `rip` are callee save.
The write syscalls argument 1 is the file descriptor to write to (Both input AND output are actually files! `0` is input (stdin), `1` is output (stdout), and `2` is error (stderr)), arg 2 is the text to write, and arg 3 is the length of the text.
```asm
mov rax, 1
mov rdi, 1
mov rsi, my_string
mov rdx, 14
syscall ; prints the string to console
```

## Types 

This is the llvm mapping of the core types.

| Type     | Maps To  |
| -------- | -------- |
| `bool`   | `i1`     |
| `int`    | `i32`    |
| `float`  | `float`  |
| `double` | `double` |
| `string` | `ptr`    |
| `char`   | `i8`     |

## Math

The math instructions are as follows:

```llvm
add <type> <lhs> <rhs> ; adds lhs and rhs and produces type type
sub <type> <lhs> <rhs> ; above for subtraction
mul <type> <lhs> <rhs> ; above for mul
div <type> <lhs> <rhs> ; above for div
srem <type> <lhs> <rhs> ; above for modulus
```

There are also floating point operations, prepended with `f`. The power instruction calls a runtime function.

These actually just become `add` `sub` `mul`/`imul` (signed), and `div` instructions. On x86_64, `srem` is unecesarry, as the remainder of the division is stored in `rdx`.
However this means the `rdx` register must be cleared out to use `div`, as it fills up rdx. To clear, a common practice is to use `xor rdx, rdx` because it's faster.
Signed numbers use the `idiv` instruction instead of `div` on asm. `srem` stands for `signed remainder`, and there is also a `rem` instruction for unsigned.
To use `idiv`, you need to turn rax and rdi into one big signed number using the `cqo` instruction first.

## Boolean Logic

`and` `or` and `not` instructions. Simple.

They just become `and` `or` and `not` instructions.
