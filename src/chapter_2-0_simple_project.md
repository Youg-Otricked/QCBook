# Your First Project

Time to move past a single file. In this chapter we'll build a small program that takes a name and age as input and prints a formatted greeting, along the way covering variables, functions, input, and how formatters work.

## Initializing a Project

So far we've compiled a lone `.qc` file directly. For anything bigger than Hello World, you'll want an actual project, managed by `qcm`.

```bash
mkdir greeter
cd greeter
qcm init
```
Press `n` for all the questions about printing compiletime, dependencies and library.
This creates the following structure:
```
greeter/
    scope.yaml
    main.qc
```

`scope.yaml` holds your project's metadata (name, version, and (later, once we cover them) dependencies). `main.qc` is your entry point, with the same `main` function from Chapter 1.

## Variables

Declaring a variable in C^4 looks like this:
```qc
int age = 25;
string name = "Me";
```
Type comes first, then the name, then `=` and a value. Unlike some languages, C^4 requires an explicit type. There's no implicit `let`-style inference outside of the `auto` keyword:
```qc
auto age = 25; // compiler infers `int`
```

| ![using namespace std;](./images/bad.png) | Prefer explicit types over `auto`. Inferred types are very occasionally usefull in real projects, however they are against the purpose of the language: being explicit, and make it harder to learn the type system. |
| ---- | ---- |

You can then reassign (change the value of variables).

```qc
age = 26;
```

### `const`

Values that shouldn't change after initialization use the `const` modifier:

```qc
const int max_players = 4;
```

Attempting to reassign a `const` variable is a compile error.

## Functions

Functions look similar to `main`, since `main` is itself just a function:

```qc
int square(int n) {
    return n * n;
}
```

Breaking it down: `int` is the return type, `square` is the name, and `(int n)` declares one parameter named `n` of type `int`. The return type is the type of the value returned (see that return statement in the function?) from the function, which the caller can access.
Calling it runs the code and gives you the value of the function. You call with the syntax funcname(arguments), and each parameter is used with those arguments.

```qc
int result = square(5); // 25
```

Functions that don't return a value use `void`:

```qc
void greet() {
    `qout("Hi there!\n");
}
```

You can also use multiple returns.

```qc
int, int addmul(int a, int b) {
    return a + b, a * b;
}
int x, int y = addmul(123, 321);
```

## Input

To read from the user, use the `` qin `` feature, the inverse of `` `qout `` from Chapter 1. It reads a single line from standard input and puts it in a variable.

```qc
string name = "";
qin |> name;
```
You can also input to multiple variables by chaining |>, and each variable will contain up to a space.
You can also input to any type and it casts if possible and comptime-errors if not.
```qc
int x;
string name;
qin |> x |> name;
```

## Printing with Formatters

You already saw plain strings in Chapter 1. For anything with variables mixed in, you must use formatters. You can't use `f-strings` or string concatenation (taught later) becuase the first argument must be a compile-time known string:

```qc
string name = "Me";
int age = 25;
`qout("Hi %s, you are %i years old.\n", name, age);
```
Each of those %'s represents a variable to be inserted.

%b = bool
%s = string
%c = char
%d = double
%f = float
%i = int

If you want to use % you type %%
## Types 

The following types are the types you should familiarise yourself with.

| Type     | Stores                                      |
| -------- | ------------------------------------------- |
| `bool`   | `true` or `false`                           |
| `int`    | A whole number between -2.1 and 2.1 billion |
| `float`  | A seven meaningful digit decimal number     |
| `double` | A 14 meaningful digit decimal number        |
| `string` | A string of text                            |
| `char`   | A single letter                             |

## Literals

Literals are the name for values. Here are the important ones:

bool literal (has bool type)
`true` and `false`

int litral (has int type)
Just a number. e.g. 1346

float literal (has float type)
Decimal number + f. e.g. 123.456f

double literal (has double type)
Any decimal number.

string literal (has string type)
Any text wrapped in ""

char literal (has char type)
Any single character wrapped in ''

## Escape Sequences

You cannot just type certain characters in a string or char (namely a newline, tab, " (in string) and ' (in char))
This is what escape sequences are: They represent a character.

\n == newline
\t == tab
\" == "
\' == '
\0 == nothing

## Math

You can do math on variables and basicaly any numerical value.

+ = addition
- = subtraction
* = multiplication
/ = division
% = modulus
#^ = power

### Combinational Operations

You may notice if you have code like this:

```qc
int x = 12;
x + 2;
`qout("%i", x);
```
It prints 12! Is there a bug in the compiler?

No. This happens because math operations only produce a value, not edit memory. If you wanted to assign the value, you would need to do:
```qc
x = x + 2;
```
However becuase this is so common, you can use combinational operators, where you append = to the math operator (except for power) and it is equivelent to the longer version.

```qc
x += 2;
// is 
x = x + 2;

x -= 123;
// is
x = x - 123;

x %= 12;
...
```

## Boolean Logic

These operations operator on true and false.

&& = left and right are true
|| = either side is true
^ = exactly one side is true
! = operand is not true

true && true == true
true || false == true
true ^ false == true 
true ^ true == false
!false == true

Comparison operators operate on any primitive.

==: equality
1 == 1 // true
!=: inequality
1 != 123 // true
>: greater than
<: less than
>=: greater than or equal to
<=: less than or equal to

When using a value in a boolean context when it is not a bool, it is converted to "truthiness".
Truthiness rules:

int: != 0
float: != 0.0f
double: != 0.0
char: != '\0' // null escape sequence
string: != ""

## Putting It Together

Here's the full program.

`main.qc`
```qc
string ask_name() {
    `qout("What's your name? ");
    string result;
    qin |> result;
    return result;
}

int main() {
    string name = ask_name();
    `qout("Nice to meet you, %s!\n", name);
    return 0;
}
```

Build and run it:

```bash
qcm run build # builds the projects code
./greeter
What's your name? Me
Nice to meet you, Me!
```

## Recap

- `qcm init` makes a new project with a manifest and a `main.qc` entry point.
- Variables need an explicit type unless you use `auto`.
- `const` makes a variable's value constant after initialization.
- Functions declare a return type, a name, and typed parameters. `void` means "returns nothing." Functions can return multiple values at once.
- `qin |> variable` reads a line of input into a variable, and can be chained to read into several at once. Input casts to the target type where possible, errors at runtime if its a invalid value, and errors at compile time if it is a uncastable type.
- Formatted printing uses `%`-placeholders (`%s`, `%i`, `%f`, etc.).
- C^4 has six core types (`bool`, `int`, `float`, `double`, `string`, `char`) and a literal form for each.
- Escape sequences (`\n`, `\t`, `\"`, `\'`, `\0`) represent characters that can't be typed directly in a string or char literal.
- Non-bool values convert to booleans via "truthiness". Each type has its own zero/empty value that's `false`.
