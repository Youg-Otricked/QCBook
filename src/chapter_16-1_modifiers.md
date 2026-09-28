# Modifiers

Modifiers let you wrap functions and values in custom behavior.
```qc
modifier async {
    on_call {
        ...
        proceed();
        ...
    }
    on_return {
        returns = ...
        ...
    }
}

modifier await {
    on_use {
        ...
        return value;
    }
}
```qc
async ... myFunc() {
    ...
}

await myFunc();
```
proceed() in on call = on_return(theFunction());
returns is a reference to the return value.
value in on_use is the value being on_used'.

> Now see [Appendix B](./appendix_b.md) and [C](./appendix_c.md)
