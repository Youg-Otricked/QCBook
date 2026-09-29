# Comments & Control Flow

Comments literally dont exist in the final file.

## Control Flow

### Conditionals

`if` is not a concept of llvm. Instead, `if` statements become jumps. You see, in asm, you compare things with the `cmp` instruction. This sets specific flag bits in the RFLAGS register, which communicates with the Arithmetic Logic Unit of your CPU what results where true for the instruction. In LLVM, you use the `icmp` and `fcmp` instruction, which returns a i1, the result of the comparison e.g.

```llvm
%cond = icmp ne i32 123, i32 21 ; checks if 132 != 21
%cond2 = icmp sge i32 12, i32 12 ; checks if 12 >= 12
```

In ASM, you separate code with labels, which are just named segments in your code.
```asm
my_label:
    add 123, 321
    ...
my_other_label:
    ...
```

LLVM has a similar concept to labels, called basic blocks. They are also the control flow. Each bb(basic block) has one entry point and one terminator, e.g. bg, ret, or switch.

`cmp` internally basically checks the result of left - right. The `zero` bit is set if they are equal, the sign flag is set if the result is negative, the carry flag is set if the result unsigned overflowed, the overflow flag is set if the result signed overflowed, and the parity flag is set if the lowest byte has an even amount of `1`s
In asm to jump to labels you use specific instructions:

```asm
my_label:
    ...
_start:
    jmp my_label ; unconditional jump. Always jumps to label.
    jz my_label ; jumps IF the last `cmp` had ZF(zero flag) set. (equal)
    je my_label ; jumps IF the last `cmp` had ZF set (equal)
    jne my_label ; jumps IF the last `cmp` did NOT have `ZF` set. (not equal)
    jne my_label ; jumps IF the last `cmp` did NOT have `ZF` set. (not equal)
    js my_label ; jumps IF SF (sign flag)
    jc my_label ; jumps IF CF (carry flag)
    jo my_label ; jumps IF OF (overflow flag)
    ja my_label ; jumps IF CF and ZF = 0 (above/greater) (unsigned comparison)
    jbe my_label ; jumps IF CF or ZF = 1 (below or equal to) (unsigned comparison)
    jl my_label ; jumps IF SF != OF (less than)
    jge my_label ; jumps IF SF == OF (greater than or equal to)
    jg my_label ; jumps IF ZF == 0 and SF == OF (greater than)
```

In LLVM, you instead use the `br` instruction. `br` ing a plain label is equivalent to a `jmp` instruction
```llvm
1:
    ; my stuff
2:
    br label %1 ; unconditional jump to 1
```

But if you want a condition, you use br with a `i1` (which you can get from a cmp)

```llvm
1: 
    ; my stuff
2:
    ; other stuff
3:
    br i1 %condition, label %1, label %2
```

It is like a `if (condition)`.

This `if` statement

```qc
int x = 12;
if (x < 24) {
    return 2;
}
return 1;
```

Would become 

```llvm
    %x = alloca i32, align 4
    store i32 12, ptr %x, align 4
    %x1 = load i32, ptr %x, align 4
    %icmplt = icmp slt i32 %x1, 24
    br i1 %icmplt, label %then, label %ifcont
then:
    ret i32 2
ifcont:
    ret i32 1 
```

If there was no return statement, (a terminator), then at the end of then their would be a unconditional jump to `ifcont`. There is no jump after the return anyways because llvm basic blocks cannot have more than one terminator.
Labels can't exist more than once, so multiple if's just add a number to the end of then/ifcont.

Else statements just change the 2nd label in the br to `%else` and create a `else` label with the else code. Else also jumps to ifcont if it fails and there is no terminator.
`else if`'s just add even more conditions. This
```qc
int x = 0;
if (x < 2) {
    x = 2;
} else if (x < 4) {
    x = 4;
} else {
    x = 5;
}
...
```

Becomes (when useless loads are removed)
```llvm
    %x = alloca i32, align 4 ; creates x
    store i32 0, ptr %x, align 4 ; sets x to 0 
    %x1 = load i32, ptr %x, align 4 ; loads the value for the condition
    %icmplt = icmp slt i32 %x1, 2 ; x < 2
    br i1 %icmplt, label %then, label %elif.cond ; jumps to the else if condition if false and the then block if true

then:
    store i32 2, ptr %x, align 4 ; set x to 2
    br label %ifcont ; continue
elif.cond:
    %icmplt1 = icmp slt i32 %x1, 4
    br i1 %icmplt1, label %elif.body, label %else ; jumps to the else body if false and the else if body if true

elif.body:
    store i32 4, ptr %x, align 4 ; set x to 4
    br label %ifcont ; continue at ifcont
else:
    store i32 5, ptr %x, align 4 ; set x to 5
    br label %ifcont ; continue at ifcont (here because unlike asm, all bb's MUST have exactly 1 terminator)
ifcont:
    ...
```
And this could eventually become asm like this
```asm
    mov eax, [x] ; load x's value in memory to eax
    cmp eax, 2 ; compare against 2
    jl .then ; less than: jump to then
    jmp .elif.cond ; else jump to elif.cond
.then:
    mov eax, 2 ; load 2 to eax
    jmp .ifcont ; continue
.elif.cond:
    cmp eax, 4 ; compare against 4
    jl .elif.body ; less than: jump to elif.body
    jmp .else ; else jump to else
.elif.body:
    mov eax, 4 ; load 4 to eax
    jmp .ifcont ; jump to ifcont
.else:
    mov eax, 5 ; load 5 to eax and fallthrough to ifcont
.ifcont:
    mov [x], eax ; store eax back to [x]
    ...
```
Ternarys don't actually become a if statement nonsense. They are actual llvm instructions! They kinda look like a `br`.

```llvm
%ternary = select i1 %condition, <type> %lhs, <type> %rhs
```
And these can become various instructions, such as `cmovl`(conditional move).

## Loops

Loops basically take the concept of labels on steroids.
### While Loop

The while loop is like a if statement, except it jumps to the beginning if a condition is true.

```qc
int x = 5;
while (x >= 0) {
    x--;
}
```
becomes
```llvm
  %x = alloca i32, align 4 ; int x
  store i32 5, ptr %x, align 4 ; = 5;
  br label %while.cond ; start while loop

while.cond:
  %x1 = load i32, ptr %x, align 4 ; load x
  %icmpge = icmp sge i32 %x1, 0 ; compare it with 0
  br i1 %icmpge, label %while.body, label %while.end ; if its >= 0 jump to the body, otherwise jump to the end

while.body:
  %dec_deref = load i32, ptr %x, align 4 ; load x
  %dec = sub i32 %dec_deref, 1 ; decrement it
  store i32 %dec, ptr %x, align 4 ; store it back to x
  br label %while.cond ; recheck the condition

while.end: 
    ...
```
A if statement with a jump to the condition at the end of `then:` is just a loop.

Thus, this LLVM would become something like 
```asm
    mov eax, [x]
    jmp .while.cond
.while.cond:
    cmp eax, 0
    jge .while.body
    jmp .while.end
.while.body:
    dec eax
    jmp .while.cond
.while.end:
    mov [x], eax
```

A lot of the simplicity of ASM you trade away for the ability to not make 15 compilers and instead only make one.

### For Loop

The for loop just emits the init expression before the cond & body then adds an additional `for.inc:` label which has the step expression then jumps to cond and body jumps to inc instead of cond.

```qc
for (int x = 5; x >= 0; x--) {
    ...
}
```

Becomes
```llvm
  %x = alloca i32, align 4 ; for (int x
  store i32 5, ptr %x, align 4 ; = 5;
  br label %for.cond ; start loop
for.cond:
  %x1 = load i32, ptr %x, align 4 ; load x
  %icmpge = icmp sge i32 %x1, 0 ; compare it with 0
  br i1 %icmpge, label %for.body, label %for.end ; if its >= 0 jump to the body, otherwise jump to the end

for.body:
  ...
  br label %for.inc ; jump to inc 
for.inc:
  %dec_deref = load i32, ptr %x, align 4
  %dec = sub i32 %dec_deref, 1
  store i32 %dec, ptr %x, align 4
  br label %for.cond ; check condition
for.end:
  ...
```
In ASM:
```asm
    mov eax, [x]
    jmp .for.cond
.for.cond:
    cmp eax, 0
    jge .for.body
    jmp .for.end
.for.body:
    ...
    jmp .for.inc
.for.inc:
    dec eax
    jmp .for.cond
.for.end:
    mov [x], eax
    ...
```

### Break & Continue

Break just creates an immediate `br label %<loop>.end`, and continue just creates a `br label %for.inc`/`br label %while.cond`/it's equivalent ASM.
## Do While Loop

The do-while loop is actually really simple!

```qc
int x = 5;
do {
    x--;
} while (x >= 0);
```
becomes
```llvm
  %x = alloca i32, align 4 ; int x
  store i32 5, ptr %x, align 4 ; = 5;
  br label %while.body ; start do while loop

while.cond:
  %x1 = load i32, ptr %x, align 4 ; load x
  %icmpge = icmp sge i32 %x1, 0 ; compare it with 0
  br i1 %icmpge, label %while.body, label %while.end ; if its >= 0 jump to the body, otherwise jump to the end

while.body:
  %dec_deref = load i32, ptr %x, align 4 ; load x
  %dec = sub i32 %dec_deref, 1 ; decrement it
  store i32 %dec, ptr %x, align 4 ; store it back to x
  br label %while.cond ; recheck the condition

while.end: 
    ...
```
It literally just changes the br label from while.cond to while.body.

## Switch

Switch normally only can operate on numbers, so C^4's switch compiles directly to a else if chain if it's not a whole number type.

Normal switch is actually a instruction in llvm: You switch a value to a ton of labels.

```qc
int x = 0;
switch (x) {
    case 1:
        return 1;
    case 2:
        x = 12;
        break;
    case 0:
        x = 2;
        break;
    default:
        x = -1;
        break;
}
```
becomes
```llvm
  %x = alloca i32, align 4
  store i32 0, ptr %x, align 4
  %x1 = load i32, ptr %x, align 4
  switch i32 %x1, label %switch.default [ ; switch on value x1, with default label switch.default
    i32 1, label %switch.case ; on 1 jump to .case
    i32 2, label %switch.case2 ; on 2 jump to .case2
    i32 0, label %switch.case3 ; on 3 jump to .case3 
  ]
switch.case: 
  ret i32 1

switch.case2:
  store i32 12, ptr %x, align 4
  br label %switch.end

switch.case3:
  store i32 2, ptr %x, align 4
  br label %switch.end
switch.default:
  store i32 -1, ptr %x, align 4
  br label %switch.end
switch.end:
    ...
```

Switch statements are VERY fast. That's because instead of a jump chain, they become a jump _table_. Basically a array of index -> label.

```asm
.section .rodata
.align 4
.JUMP_TABLE:
    .long .switch.case3 - .JUMP_TABLE   ; index 0 maps to case 0
    .long .switch.case - .JUMP_TABLE  ; index 1 maps to case 1
    .long .switch.case2 - .JUMP_TABLE  ; index 2 maps to case 2

.text
.global _start ; entry point is _start

_start:
    ...
    mov eax, [x] ; load x's value to eax
    cmp eax, 2 ; compare eax and the case count 
    ja .switch.default ; if the case count is less than eax jump straight to default
    lea rdx, [rip + .JUMP_TABLE] ; put the address of the jump table into rdx
    movsxd rax, dword ptr [rdx + rax * 4] ; signed extend the calculated table idx and put it back into rax.
    add rax, rdx ; add rax to rdx, thus giving you the address of the code label.
    jmp rax ; jump to it (did i say you can jump to addresses?)

.switch.case:
    ... exit with code 0...
.switch.case2:
    mov rax, 12
    jmp .switch.end
.switch.case3:
    mov rax, 2
    jmp .switch.end
.switch.default:
    mov rax, -1
.switch.end:
    mov [x], eax
    ...
```
It's obvious why this approach can't work on non integers (pointers and stuff just... wouldn't work for this). It's way more complex, but it is hella fast. For reference, this runs in CONSTANT TIME (O(1)) for all non default cases.

Meanwhile, in else if chains, assuming == conditions (equivelent to switch conditions), that's 3 instructions per condition. For 4 conditions, that's:
| Condition | Instruction count |
| --------- | ----------------- |
| 1         | 3                 |
| 2         | 6                 |
| 3         | 9                 |
| 4         | 12                |

For switch, in the above example it is always 7.

But imagine if it gets bigger. And if it gets even bigger, it can use _binary search_. That means for if in the middle of a 100000 case set that's 150000 instructions. For binary search that's around 51. 

We have one more terminator, too along with `break` and `continue`: `unreachable`! It compiles straight down to LLVM unreachable. It's for optimization purposes, and if you run it, it's UB because the compiler didn't do any cleanup past unreachable because... it's unreachable.
