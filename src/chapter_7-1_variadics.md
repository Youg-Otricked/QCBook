# Variadics

Sometimes, it's important to be able to take in a variable amount of arguments (despite how some people debate). This is what variadics are for.

To make a variadic function, make the final parameters type `...`.

```qc
int addMany(...args) {
    ...
}
```

To get the next argument in a variadic argument, you use the `` `next `` intrinsic. The first argument should be the variadic arglist, and the second should be the type to cast it to.

```qc
int nextArg = `next(args, int);
```

But before getting the next argument, you MUST check if it is empty using the `` `is_empty `` intrinsic.

```qc
bool is_empty = `is_empty(args);
```

If you next a empty vararglist, you will access out-of-bounds memory.

```qc
int addMany(...args) {
    int result;
    while (!`is_empty(args)) {
        result += `next(args, int);
    }
    return result;
}
```
