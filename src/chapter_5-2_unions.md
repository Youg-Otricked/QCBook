# Aliases & Unions

## Type Aliases

Sometimes a type's real name doesn't say much about what it's for. `addr_t` is technically correct for "a timestamp," but it doesn't look like one, and we all know the quote: If it behaves like a duck, and it quacks like a duck, WHY ON GOD'S GREEN EARTH IS IT NOT A DUCK. Aliases let you give an existing type a second, more meaningful name:
```qc
type Time = addr_t;
```
`Time` isn't a new type, it's just another name for `addr_t`. Anywhere `addr_t` is expected, a `Time` works, and vice versa. This is only for you and whoever reads your code after you (which is probably still you, because apparently nobody contributes to open source).
```qc
Time now = 0a;
addr_t later = now;
```

## Unions

Aliases give a type a second name. Unions let a single value hold more than one type.
```qc
type Value = int | string;
Value x = 123;
x = "hello";
```
`x` can hold either an `int` or a `string`.

Since a union value's type can change at runtime, you need a way to ask "which one do I shoot?" That's the `` `typeof `` builtin. It returns the current type of a value as a string.
```qc
Value x = 123;
`qout("%s", `typeof(x)); // int
x = "hello";
`qout("%s", `typeof(x)); // string
```

### Constant Members

Unions aren't limited to types — they can also be restricted to specific constant values:
```qc
type Nothing = 0.0 | 0 | 0.0f;
```
A `Nothing` can only ever be `0.0`, `0`, or `0.0f`, not "any double, int, or float," just those exact values. This is handy for things like status codes, where you want a value that's "one of these int-or-string things, and nothing else":
```qc
type StatusCode = int | "OK" | "ERROR";
StatusCode code = 123;
code = "OK";
code = 0;
```

You can also use a enum for this purpose.
