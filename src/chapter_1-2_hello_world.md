# Hello, World!

Time to do the age-old tradition: Printing hello, world! to console.

> Note: Competence is assumed (normal and command-line)

## Setup:

Using the setup feature of the package manager won't be neccessary for such a  simple project.

## Basics:

Create and open a main.qc file. C^4 files end with .qc, and are kebab-case (words seperated by -) 

Filename: main.qc
```qc
int main() {
    `qout("Hello, World!\n");
    return 0;
}
```

Save the file, go back to terminal and run:

```bash
qc ./main.qc
./a.out
> Hello, World!

```

It should have printed `Hello, World!`, Mac and Linux alike. Congrats: You wrote a C^4 program.

## Disection:

Breaking it up:

```qc
int main() {
}
```

This declares the `main` function. It's a special function that's called at the start of your program. It is always what runs first. The `int` means it returns a whole number (integer)

The () mean this function takes no parameters (explained later). Paramaters would go inside the () if there were any.
The function "body" (code) is wrapped in {}. Braces wrap all function bodys. According to C^4 style, the opening brace is on the same line as the definition.

The body of the function is 
```qc
`qout("Hello, World!\n");
return 0;
```

`` `qout `` is a compiler intrinsic that writes to console. All compiler intrinsics start with backtick. The string "Hello, World!\n" is what it will write.
`return 0;` tells the OS that this program succesfully ran.

### Compilation and Execution.

The `qc` tool compiles a qc file into a binary. The name defaults to `a.out`, but with the `-o` flag you can change it.

```bash
qc main.qc -o hello
```
This command would create a binary named hello.

If you use languages like `Python` or `JavaScript`,
A: Welcome to a real language,
B: You may not be used to a 2-step run. That's because those languages are `interpreted ` which means they are ran line-by-line, but C^4 is `Ahead Of Time Compiled`
meaning it is turned into a binary and then ran. This is significantly faster, and allows shipping just a binary instead of both your source code and a interpreter for your language.
