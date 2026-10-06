# Tuples

Tuples are like structs except nothing has names. Including the fields!

So how do we access them?

With numbers.
```qc
(int, int) x = (123, 321);
x.0 // the 0th field, 123.
```

Tuple types are comma-seperated types wrapped in `()` and tuple values are comma-seperated values/expressions wrapped in `()`.

You can also destructure tuples, which assigns every value of a tuple to a seperate lvalue.

```qc
int x;
int y;
(int, int){ x, y } = my_coord_tuple;
```

If you use a non-existant variable as one of the lvalues, it will declare them.

```qc
(int, int){ x, y } = my_coord;
```

You can also use this to multi-var-decl.

```qc
(int*, int){ p, x } = (nullptr, 0);
```

You can also make a custom destruction operator for destructing a class. It's return type should be the tuple the returned values should be treated as.

```qc
class Coordinate {
    private int x;
    priavte int y;
    ...
    (int, int) operator{}() {
        return (this->x, this->y);
    }
}
...
Coordinate c = ...
...
(int, int){ x, y } = c;
```

Simple (pt 4)!
