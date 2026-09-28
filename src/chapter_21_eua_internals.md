# Aliases, Enums, and Unions

Let's cover aliases first, as they are the simplest.

## Aliases

Aliases are just subtituted strings at compile time. My function, `llvmTypeFor`, takes a type string and returns it's type in LLVM. And the first step is alias resolving. It literally just checks if the type is in the aliases map, and subtitutes it. Then does it again. And again.

## Enums

Enums literally compile down to the same mechanism as unions but are literal only.

## Unions

Unions are tagged in C^4. Specifically, they store 2 things.

1. The tag (a integer).
2. A void pointer to the data.

Then when you access it basically generates either a switch on the tag for unknown types or for specific cases is comptime.

> Sometimes, Unions are NOT a zero-cost

This union:
```qc
type T = int | string;
```

Becomes
```llvm
%union.T = type { i32, ptr }
```
