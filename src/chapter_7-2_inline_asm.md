# Inline ASM

## Raw Strings
Raw strings allow you to put any character in your string, raw. This includes multi-line strings. To make a raw string, before the opening quote you put a `R`, and right after the quote you put some
combination of (, ), {, }, [, ], <, and >, then when you are done with your string you put the inverse of that. e.g.

```qc
R"([<(
I Can 
Contain anything 
 even unico
de!`                    and tabs and """"" quotes!<A<<<<E< 
I end with the invers of the opening, which is 
)>])"
```

Running assembly in code is obviously important, for this allows you to run syscalls. The inline asm syntax is the follows:

```qc
`inline(R"(
YOUR_ASM_STRING
)", YOUR_ARGUMENTS, YOUR_CLOBER_STRING
```

To use arguments in inline asm, you use the following format:

`$<argnum>[=]<i|m|g|r>`

= makes a argument a output. All outputs must go before inputs. I makes a argument a constant integer, m makes a argument go in memory, g makes a argument somthing, and r makes a argument go in a register.

You cannot make a i or g argument a output.

Clober strings use this format:

"~{clobered,clobered...}"

e.g.

`"~{rsi,rdi,rax,rcx,r11,memory}"`


> ![panik](./images/panik.png) You cannot clobber rsp or rbp, because this will cause the program to crash the moment the inline asm finishes running, as this is where the program stores where the programs position in the stack is.

```qc
`inline(R("
"), "~{rsp}");
```
