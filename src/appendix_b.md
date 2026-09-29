# Appendix B

Compile time code editing.

Currently, C^4 has 2 ways to have your code behave differently on compilation of different code / platforms.

## 1: Preproccessers

You already know of the include, link, and linkdir preproccessers, but there are a few more.

1. define
    Defines a constant value that replaces text during comptime.
    ```qc
    #define NOT_FOUND 404
    ```
    now NOT_FOUND is replaced with 404 at compile time.
2. undef
    Undefines a defined constant.
    ```qc
    #undef NOT_FOUND
    ```
    now NOT_FOUND does not exist.
3. if & endif
    Compares compile time known values (including macros from define). Allows all the important operators (+, -, ||, &&, !, -(unary), (), *, /, <, >, <=, >=, ==, !=...)
    If true code compiles
    ```qc
    #if NOT_FOUND == 404
        ...
    #endif
    ```
4. ifdef
    Code compiles if that macro is defined.
    ```qc
    #ifdef NOT_FOUND
        ...
    #endif
    ```
5. ifndef
    Code compiles if that macro is _not_ defined.
    ```qc
    #ifndef NOT_FOUND
        ...
    #endif
    ```

### Predefined Macros

C^4 provides a set of predefined macros.

A definition listed below is present when the corresponding condition is true. Platform and architecture definitions have the value `1`.

### Operating Systems

| Definition | Platform |
|---|---|
| `_WIN32` | Windows |
| `_WIN64` | 64-bit Windows |
| `__APPLE__` | Apple platforms |
| `__MACH__` | Darwin / Mach-based systems |
| `__linux__` | Linux |
| `__linux` | Linux |
| `__ANDROID__` | Android |
| `__FreeBSD__` | FreeBSD |
| `__OpenBSD__` | OpenBSD |
| `__NetBSD__` | NetBSD |
| `__unix__` | Unix |
| `__unix` | Unix |

### x86 Architectures

| Definition | Architecture |
|---|---|
| `__i386__` | 32-bit x86 |
| `__i386` | 32-bit x86 |
| `__x86_64__` | x86-64 |
| `__x86_64` | x86-64 |
| `_M_IX86` | 32-bit x86 |
| `_M_X64` | x86-64 |

### ARM Architectures

| Definition | Architecture |
|---|---|
| `__arm__` | ARM |
| `__aarch64__` | AArch64 |
| `_M_ARM` | ARM |
| `_M_ARM64` | AArch64 |

### RISC-V

| Definition | Meaning |
|---|---|
| `__riscv` | RISC-V |

### WebAssembly

| Definition | Architecture |
|---|---|
| `__wasm32__` | WebAssembly 32-bit |
| `__wasm64__` | WebAssembly 64-bit |

### PowerPC

| Definition | Architecture |
|---|---|
| `__powerpc__` | PowerPC |
| `__powerpc64__` | PowerPC 64-bit |
| `__powerpc64le__` | PowerPC 64-bit little-endian |

### MIPS

| Definition | Architecture |
|---|---|
| `__mips__` | MIPS |
| `__mips64` | MIPS 64-bit |

### C^4 Compiler

| Definition | Meaning |
|---|---|
| `__quarticc` | C^4 compiler version |

## 2: Comptime

> Currently `comptime` is only available on if.

Comptime makes code execution happen at compile time. This is what `comptime if` does. Comptime if makes a if statement run at compile time if the expression is evaluatable at compile time.

Comptime if can stop code from running period, which is useful for:

### Comptime Intrinsics

Currently there are 3 comptime intrinsics:

1. `` `compile_error ``: Takes a string. Compile errors with that string.
2. `` `compile_warn ``: Takes a string. Compile warns with that string.
3. `` `compile_note ``: At some time a compile error or warning must have happened before it. Takes a string. Attaches a note to the latest error/warning with that string as its text.

### Comptime Expressions

`proved_by` is an example of a compile-time expression.

```qc
comptime if (!(Iterable proved_by T)) {
    `compile_error("T must prove Iterable");
}
```

### Comptime-legal Expressions

Anything that does not use runtime memory is a comptime-legal expression.
