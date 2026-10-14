# Current Keyword List

These are the currently in-use keywords:

## Types

- `int`: i32
- `float`: f32
- `double`: f64
- `bool`: u1
- `string`: char*
- `qbool`: u2
- `void`: void
- `char`: i8
- `byte`: u8
- `nibble`: u4
- `addr_t`: uPTRSIZE
- `ai64_t`: i64
- `ai64u_t`: u64
- `i32u_t`: u32
- `i16u_t`: i16

## Literals

- `nullptr`: null pointer
- `true`: 1
- `false`: 0
- `qtrue`: 2
- `qfalse`: 1
- `none`: 0
- `both`: 3

## Type Modifiers

- `const`: Makes a variable constant
- `out`: Marks a parameter as write-only and says its memory address will not be copied.
- `inout`: Marks a parameter as having a no-copy memory address.
- `restrict`: Marks a pointer parameter as the only way to access this memory address in this function.
- `volatile`: Says not to optimize this.
- `atomic`: Tells devs this is atomic (means nothing to the compiler, effectivly is a comment)
- `long`: Modifier for int or double, doubles sizeof
- `short`: Modifier for in, halves size

## Control Flow

- `if`: if statement
- `else`: else statement
- `do`: do in do-while loop.
- `jmp`: Jumps to a labeled statement
- `goto`: Alias for jmp.
- `loop`: Creates an unconditional loop.

## Switch

- `switch`: switch statement
- `case`: case block
- `default`: default case

## Match

- `match`: match statement

## Loops

- `for`: for loop
- `while`: while loop
- `continue`: continue to next iteration
- `break`: exit loop/switch
- `unreachable`: says to LLVM this is unreachable
- `foreach`: iterate over collection
- `in`: marks what to iterate in foreach.

## Functions

- `return`: Return from function

## QFlow

- `qif`: qif statement
- `qelse`: qelse statement
- `qelif`: qelif statement
- `qswitch`: qswitch statement

## User Types

- `class`: Creates a class
- `struct`: Creates a struct
- `enum`: Creates a enum
- `type`: Creates a alias/union
- `concept`: Creates a concept
- `modifier`: Creates a modifier
- `union`: Creates a raw c-style union type.

## Modifiers

- `on_call`: Modifier handler that runs code when a function is called.
- `on_return`: Modifier handler that runs code when a function returns.
- `on_use`: Modifier handler that runs code when a value is used.

## Special

- `fn`: Declares lambda, lambda type
- `auto`: Infer type
- `function`: Less explicit lambda type

## FFI

- `foreign`: Pulls foreign code in
- `extern`: Externalizes code

## Class

- `public`: Public access
- `protected`: Protected access
- `private`: Private access
- `operator`: Operator overload
- `roperator`: R-operator overload
- `abstract`: Marks a class as abstract
- `final`: Marks a class or method as final
- `friend`: Gives a class access to private & protected fields.
- `friendly`: Gives a class access to protected fields.
- `static`: Makes a method/member belong to the class not the instances.
- `override`: Marks a method as overriding a base class method.
- `virtual`: Marks a method as overridable in derived classes.

## Blocks

- `namespace`: Adds a accessible scope block to code.
- `try`/`catch`: The `catch` runs for the right type if a error is `throw`n in the `try` block.
- `defer`: Makes this code run at end of normal scope exit (not stack unwinding).

## Unary Keywords

- `sizeof`: Gives sizeof a type in bytes.
- `throw`: Throws a value to a catch block.

## Concepts

- `proves`: Prove a concept for type.
- `with_proof`: Provides method implementation for a prove block.
- `_of`: Used prefixed with a number in concept definitions.
- `all_of`: Used in concept definitions
- `at_least`: Used before a _of in concept definitions.
- `proved_by`: Returns a compitme bool which is if this concept is proved by this type.

## Comptime

- `comptime`: Makes a if run at compile time.
