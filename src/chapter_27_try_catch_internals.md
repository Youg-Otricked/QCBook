# Try Catch Internals

## Error Values

This is just a convention I decided upon because it seemed intuitive.
The struct-field-0-is-0 is available because it also allows for less checking logic because unions and enums are all structs with field 0 as a integer, so I can use the same logic.

## Error Handling Methods

1. panic

Panic just prints a message and calls the `abort` libc function, which calls the `abort` syscall.

2. try/catch

`try` becomes a comparison and a bb.

```qc
type MyErr = int | string;
MyErr error()...

...
try error();
...
```

becomes:

```llvm
    %result = call %MyErr @error()
    %tag = extractvalue %MyErr %result, 0
    %is_err = icmp ne i32 %tag, 0
    br i1 %is_err, label %try.err, label %try.ok
try.err:
    ; extract the Err and re-wrap it as the function's return type
    ret %Res %err
try.ok:
    %try.result = ; payload as int
```

`catch` becomes something similar, except there is just a shared field in the middle. It creates a output of the expressions expected type, puts the expression value in it if it's not a error, and if it is a error, it either terminates how your code makes it, or loads your final stmt of the catch block into the shared value instead. This is called a `phi` in llvm.

## Why Errors As Values

Mainly because of `defer`. Exceptions need stack unwinding, which has a heavy runtime cost, so I didn't want `defer` to depend on it. 
Keeping exceptions without unwinding would mean deferred code gets skipped when an error passes through, which makes `defer` useless for its sole purpose, cleanup.
With errors as values, an error is an ordinary return, so every `defer` runs like normal exit path.
