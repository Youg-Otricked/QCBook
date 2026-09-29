# Memory Internal

So... how does this crap work?

## Structs

Structs actually exist in llvm! However they behave more like arrays. This is how struct definitions look:
For the struct
```qc
struct Ints {
    int x;
    int y;
}
```
you would get
```llvm
%struct.Ints = type { i32, i32 }
```

As you see, they depend on order, not names. Access works using the `getelementptr` instruction.
```qc
Ints y = ...;
...
y.x;
```
That `y.x` would become
```llvm
getelementptr %struct.Ints, ptr %y, i32 0, i32 0
```

- `%struct.Ints` is the type we are operating on.
- `%y` is the pointer to the struct we want to access
- the first `i32 0` is the starting offset.
- the second `i32 0` is the field index relative to the starting offset. (in this case field 0, x)

These integers need to be known at compile time.
The `getelementptr` instruction returns a pointer to the element... obviously. `getelementptr`. `Get` `Element` `Pointer`

Sizeof might give a unexpected size. We know `sizeof char` is 1, and `sizeof int` is 4. So why is
```qc
struct MyStruct {
    char c;
    int i;
}
sizeof MyStruct;
```
8 bytes?

This is because _padding_. The CPU naturally wants to fetch things of a specific size. So your int, which is 4 bytes, wants to be fetched as 4. But your char want's to be fetched as 1 byte. So the compiler inserts 3 bytes of empty space (padding) so the CPU doesn't explode.
## The Heap

Before we can explain this their is an important preface. Memory is stored in pages, which are larger typically 4kb chunks of memory.
So you might know that the `mmap` syscall is what we use to allocate memory. Is that all `malloc` does?
Not exactly. `mmap` is _slow_. That's because syscalls in general are slow. Not because the instruction is inefficient, but because you need to transition from ring 3 to ring 0. You see, your cpu is split into protection levels (rings).
On x86, there are 4 levels but only 2 matter: Ring 0, which gives you absolute control and no protection. However only the OS has access to this memory. Ring 3 is userspace, which gives you memory protection and other things like this. In ring 0, everything can access all the memory, and one bad pointer crashes the OS. In ring 3, memory is isolated between programs, so your browser can't read the memory from your password manager.
Some asm instructions are restricted in ring 3, and instead of normal memory access, when you _think_ you accessed an address, you are accessing virtual memory. Virtual memory are fake addresses that map to real addresses.

Because these addresses arn't real, you can't direct access specific addresses in ring 3. This is why you need syscalls.
Syscalls jump straight to ring 0, and run a function exposed by the kernel, allowing you to do things like reading and writing to files.
That jump from ring 0 to ring 3 is the slow part. However, because `mmap` allocates one full page and just gives you the chunk size you asked for, allocating 1 byte and 4 kilobytes takes the exact same amount of time.

So, `malloc` just grabs a FULL page of memory, then slowly segments it into little chunks till there is not enough left, then it allocates another page.
Free just... says the split chunk is usable again. Eventually once enough memory is freed (typically 1 page), it calls the `unmap` syscall, which unallocates.
Realloc basically is a tiny wrapper around malloc, and `calloc` basically just `memcpy`s the memory and fills it with `0`.

## Lvalues and Rvalues

Only very specific instructions are `lvalues`, specifically:

- VarAccesses: `x;`
- Dereference & Address Of: `*x;`/`&x;`
- Property Accesses: `x.y;`
- Reference/Pointer returning Methods.
- Reference/Pointer returning Calls.
- Array Accesses: `x[2];`

## Pointers and Arrays

Pointers are all `void*` in `llvm`. They do not exist. It's all just `ptr`. This means

1. The restrictions are manually implemented into the compiler
2. The compiler needs to manually store every pointers type
3. This makes my life harder

These restrictions slightly help with the whole shotgun pointed at the foot, but they also mean I need to deal with this crap.

When you dereference a pointer, it creates a _load_ instruction.

```qc
int *p = &x;
*p;
```
could become
```llvm
%deref = load i32, ptr %p, align 4
```

Load takes the type being loaded and the pointer (noticing why I need to track pointers element types?)
## Ownershio

You may have noticed that I am fully manual but have some non-enforced rules. Why not make these forced? Why allow people to use dangerous things?

### Design Rationale 

I personally hate anything that hides the difficltys & power of systems programming. I think that to make some systems level program, you need to not only deal with struggles, but you need to use them correctly. You are not a systems programmer if you only code in rust without `unsafe` and have never used anything other than a smart pointer.
C^4 is designed to allow you to do anything, so be that that thing might be segfaulting in your segfault handler. C^4 is intentionally designed to not allow you to make smart pointers. C^4 is designed to force you to do the hard stuff™.

## Bitwise Operator Design Commentary

You may have seen some interesting choices in the bitwise section. They have their reasons.

### Why $ Instead of ^

C^4 focuses on not repeating operators, and `^` is used already for logical XOR. Along with that, I found that `$` fits how the bitwise symbols look. The bitwise symbols look smooth and curved most of the time.
- AND: `&`. Ampersand is probably the most curved ASCII character.
- OR: `|`. It's just a straight line.
- NOT: `~`. Tilde is literally a squigly line.
- XOR: `^` <- the odd one out. Meanwhile `$` fits the theme. `^` fits the sharp theme of the boolean more (`&&`, `||`, `!`)

### Why Dedicated Rotation Operators?

I find that something that is a core to systems engineering should have you do shifts with or and nonsense. You shouldn't need to do 7 instructions to perform a 1 instruction operation. Who cares if it's 1 instruction with optimization. If my CPU can do it in one instruction it shouldn't need to be optimized to be one instruction.

### Why Dedicated Logical VS Arithmetic RSHFT?

C^4 is designed to be an explicit language. Nonsense like `>>` is arithmetic when signed and logical when unsigned is the definition of implicit. Sometimes you want to logical rshift a signed value.

### Why Do the Shifts Look Like That?

You probably noticed the weird rshifts: `|>`, `:>`, `|>>`. Why use pipes and colons instead of many shifts, and keep the `:` for `:>`? That is because of the same reason as the `$ instead of ^`. If I used >>>, then I would need to backtrack and nonsense to parse generics. These unique operators allow me to never backtrack because the tokens are different.
```qc
class X<T>...

X<X<int>>
```

See the double `>`? In C++ the parser needs to backtrack and do tons of checks. In my language that's unrelated.

### Shift Precedence Rationale

In C^4 shifts have higher precedancy than `+` and `-`. This is because shifts are the equivelnt of multipliying the lhs by `2^rhs`. I just think it makes more sense that `3 * 2 ^ 2 + 2` looks like `3 * 4 + 2`, as exponents have higher precedancy than addition and subtraction.

