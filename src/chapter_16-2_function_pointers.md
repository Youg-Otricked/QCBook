# Lambdas

Lambdas are functions, but they are also values. Which means you can pass them to functions.

Lambda types are like a function signature, except return types are written prefixed with a `->` AFTER the params, and the name is replaced with `fn`.

```qc
fn (int x, int y) -> int
```

Then after the return types you could put the name, for example as a parameter:

```qc
int wrap(int x, fn (int x) -> int func) {
    return func(x);
}
```

And you make a lambda by putting braces with the function code after the lambda type.

```qc
wrap(123, fn(int x) -> int {
    return x * 3;
});
```

## Function Pointers

Lambdas are actually pointers to functions. When you pass a lambda, it passes a pointer to the function to the function you are calling.

You can also address a normal function with the address-of-operator (`&`), just like if it was a variable!

```qc 
int square... // just take the add example functions and imagine it but + b is replaced with #^ 2.
wrap(21, &add);
```
