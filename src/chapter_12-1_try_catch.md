# Try/Catch

Errors are important to any programming language. C^4 has a few ways of handling them.

## Error Values

Error values are any:

- Union
- Enum
- Struct with first field as a int

The "unhappy path" (error states) are:

- Union with current variant not set to the first (`char*` for `int | char*`)
- Enum with current variant not set to the first (`Bad` for `enum ... { OK; Bad; }`)
- Struct field 0 (int) != 0

## Error Handling Methods

1. panic

Panic is a unrecoverable error, useable for things such as out-of-bounds indexing.

```qc
panic "my msg"
```

This crashes the program. It's also usefull for asserts.

```qc
void assert(bool condition, char* msg) {
    if (!condition) panic msg;
}
```

2. try/catch

> Note: In this section, I used "produces" to mean "evaluates to", as in `2 + 2` produces 4, because "returns" is used here for actually returning, like `return <x>`.

`try` can be used on a error value, and will pass the error through if it is a error and keeps going if not.

```qc
type MyError = int | Err; // Err is a error (not type 0)
type MyFun = double | Err;
MyFun func() {
    int x = try errorReturn(); // if it returns Err, it passes down and basically becomes return (errorReturn() as Err), if it doesn't int x gets the int, like it was (errorReturn as int).
    // if MyError was directly contained in MyFun instead of it's error fields just existing, no unwrapping would be neccesery
    // if MyError was a enum, it would just produce the enum (there's nothing to unwrap)
    ...
}
```

`catch` can be used to handle the error, for example:

```qc
type MyError = ...
... {
    int x = func() catch 1; // defaults to 1 if error.
    x = myFunc() catch (e) { // captures error
        ...
        myValue; // sets x to this value
    };
}
```

Catch can either end with a expression stmt or terminate the function. If you end with a expression stmt, the catch produces that value on a error. The capturing of the error (the error name in parenthesis) is optional.
