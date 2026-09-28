# Try/Catch

Try/Catch in C^4 works similar to C++.

```qc
void throwsSomeStuff() {
    throw 123;
}
int main() {
    try {
        throwsSomeStuff();
    } catch (int e) {
        ...
    }
}
```

`try` blocks hold code that can throw, and `catch` blocks catch thrown values of a specific type. `throw` statements throw code for a `catch` block to catch.

## Important

Defer does _not_ run during stack unwinding, as that would be an additional runtime cost. They only run during normal scope exits.

### Importanter

You may not nest try/catch. It is additional obfuscation for no bonus.
