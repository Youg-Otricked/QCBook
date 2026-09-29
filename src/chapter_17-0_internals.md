# Internals

> The sciences, each straining in its own direction, have hitherto harmed us little; but some day the piecing together of dissociated knowledge will open up such terrifying vistas of reality.
>
> > H.P. Lovecraft, The Call Of Cthulu

Up until now, we've mostly been covering _using_ C^4. For almost the entire remainder of the book, we're going to look at how C^4 actually works, how the compiler turns your code into something a computer can execute, and why

```qc
if (x > 0) {
    return 1;
}
return 0;
```

becomes

```llvm
    %x1 = load i32, ptr %x, align 4
    %icmpgt = icmp sgt i32 %x1, 0
    br i1 %icmpgt, label %then, label %ifcont
then:
    ret i32 1 ; preds = %entry
ifcont:
    ret i32 0 ; preds = %entry
```

before becoming

```asm
    mov rax, [x]
    cmp rax, 0
    jg then
    jmp ifcont
then:
    mov rax, 0
    ret
ifcont:
    mov rax, 1
    ret
```

You don't need to understand compiler internals to write C^4. You do, however, need to understand them if you want to know why the language behaves the way it does, how the compiler works, or why your perfect three-line program turned into several hundred lines of machine code.

## The Compiler

When you write C^4 code, your computer obviously cannot execute it directly.
For example:

```qc
int x = 10;
int y = x + 20;
```

Your CPU doesn't understand `int`, variable declarations, or C^4 syntax. The C^4 compiler has to translate your code into something the computer can actually execute.

## Lexing

The first thing the compiler needs to do is to tokenize your source code. This turns some text like this:

```qc
int x = 10;
```

into smaller chunks of text with specific meanings, tokens.

```text
KEYWORD int
IDENT x
EQ =
INT 10
```

We don't compile text directly because that significantly increases the difficulty of compilation & parsing, because it requires a lot of backtracking.

## Parsing

The compiler takes the text you wrote and turns it into a structured representation.
For example:

```qc
int x = 10;
```

isn't particularly useful to the compiler as a string of characters.

and once we lex it,

```qc
KEYWORD int
IDENT x
EQ =
INT 10
```

The compile still cannot do something useful with this.
Instead, it can represent it more like:

```text
VarAssignNode
├── type_tok: int
├── Name: x
└── Value
    └── NumberNode: 10
```

This structure is called an Abstract Syntax Tree, or AST.
The AST represents what your program means structurally rather than how it was written.
Whitespace, comments, and other pieces of syntax that aren't important to the program and the compiler ignores it.

## Intermediate Representations

The compiler doesn't normally go directly from an AST to machine code.
Instead, it uses intermediate representations.
An intermediate representation (IR) is another way of representing a program.
This gives the compiler somewhere to work on the program before it has to worry about the details of a particular CPU.
For example, this:

```qc
int x = 10;
int y = x + 20;
```

could eventually be represented by operations resembling:

```text
x = 10
y = x + 20
```

The exact representation depends on which stage of the compiler we're talking about.

C^4 may have its own internal representations before eventually producing LLVM IR.

## LLVM

C^4 uses LLVM as part of its compilation process. LLVM is a collection of compiler technologies that can take an intermediate representation and turn it into efficient machine code for many different architectures.
This is useful because there are a unreasonable number of CPUs and platforms that exist. (No like actually. Like 250+). Without LLVM, a compiler would need to implement its own backend for every architecture it wanted to support.
Instead of C^4 having to know how to generate instructions for every CPU, C^4 can generate LLVM IR and let LLVM handle much of the platform-specific work.

## LLVM IR

LLVM has its own intermediate representation called LLVM IR.
LLVM IR is a low-level, typed representation of a program.
For example, a very simple function that adds two integers could look like:

```llvm
define i32 @add(i32 %a, i32 %b) {
entry:
    %result = add i32 %a, %b
    ret i32 %result
}
```

LLVM IR describes operations without being tied to one specific CPU.

This:

```llvm
%result = add i32 %a, %b
```

means

> Add the two 32-bit integer values `%a` and `%b`, and produce a new 32-bit integer value.

LLVM can later turn that operation into whatever machine instructions are appropriate for the target architecture.

## Why Not Just Generate Assembly?

You might be wondering why C^4 doesn't simply generate assembly directly.

It could.

That would mean the C^4 compiler would need to understand things such as:

- CPU instructions
- registers
- calling conventions
- stack layout
- instruction selection
- register allocation
- target-specific optimizations
- different CPU architectures

And then it would have to do all of that again for another architecture.
Some people wouldn't want to maintain 1 version of the compiler. Why would you think I hate myself enough to maintain 12?

> You would probably think correctly though. At some point in time, a not only self-hosted (written in C^4), but directly-to-asm compiler is coming. It probably will only support x86-64 and ARM64 though.

LLVM provides a common interface between the language compiler and the machine.

## Optimization

LLVM doesn't just translate LLVM IR into machine code.
It can also optimize it.
For example, suppose the compiler produces something equivalent to:

```text
x = 10 + 20
```

There is no reason for the final program to calculate `10 + 20` every time it runs.
The compiler can determine that the answer is always `30` and replace it with:

```text
x = 30
```

This is an example of _constant folding_.
LLVM performs many different kinds of optimization.
Some examples include:

- Removing code that can never be reached
- Removing calculations whose results are never used
- Simplifying expressions
- Inlining functions
- Optimizing loops
- Improving memory accesses
- Simplifying control flow

The goal is to produce better machine code without changing what the program does.

## SSA

LLVM IR uses a form called Static Single Assignment, or SSA.
The basic idea is that an SSA value is assigned only once.
Normal source code can do this:

```qc
int x = 10;
x = 20;
x = 30;
```

There are multiple assignments to `x`.
In SSA, these would instead become different values:

```text
x1 = 10
x2 = 20
x3 = 30
```

This makes it much easier for the compiler to understand where values come from and how they are used.
You don't need to think of LLVM IR as being a direct representation of C^4 variables.
LLVM IR is a lower-level representation designed to make program transformations and machine-code generation practical.

## Functions

Functions also become LLVM functions.
For example:

```qc
int add(int a, int b) {
    return a + b;
}
```

can become something resembling:

```llvm
define i32 @add(i32 %a, i32 %b) {
entry:
    %result = add i32 %a, %b
    ret i32 %result
}
```

The C^4 compiler is responsible for deciding what the C^4 function means and generating the appropriate LLVM representation.
LLVM then takes that representation and eventually turns it into machine code.

## Memory

Not everything in a program is just a value sitting in a register.
Programs also need memory.
Variables, arrays, structures, dynamically allocated objects, and many other things require the compiler to deal with memory.
LLVM IR has instructions for working with memory, including:

```text
alloca
load
store
```

- `alloca` reserves stack memory.
- `store` writes a value into memory.
- `load` reads a value from memory.

The actual LLVM IR can be considerably more complicated, especially once pointers, structures, lifetimes, and optimization are involved.
This is one of the areas where the C^4 compiler has to translate its own rules into LLVM's model of memory.

## Linking

Generating machine code isn't necessarily the final step. A program can depend on code that exists somewhere else.
For example, C^4 programs may use functions provided by the C^4 runtime or the operating system.
The compiler can generate references to these functions, but those functions may need to be connected to the final executable.
This process is called linking.

Another important thing. LLVM doesn't have if. It doesn't have loops. IR is basically assembly but it hates you just a pinch less. Everything hates you in the systems world.
