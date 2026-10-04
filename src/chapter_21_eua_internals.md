# Aliases, Enums, and Unions

Let's cover aliases first, as they are the simplest.

## Aliases

Aliases are just substituted strings at compile time. My function (as in in the copmpiler), `llvmTypeFor`, takes a type string and returns it's type in LLVM. And the first step is alias resolving. It literally just checks if the type is in the aliases map, and substitutes it. Then does it again. And again.

## Enums

Become LLVM structs of a int (discriminant) and many arrays of bytes (payload), for example:
```qc
enum States : byte {
    Value(int);
    None;
}
```
becomes
```llvm
%enum.States = type { i8, [4 x i8] }
```

Because the type is declared as a byte (i8, defaults to i32), and the 1st payloads largest size is 4 bytes, so `[4 x i8]`

## Match

Match is just switch with bonus errors on no default/missing cases, and no fallthrough. Except for enums. On enum match, just like switch, it matches on the `extractvalue` of the payload of the enum struct, but what differs is the cases. What it does is in the begining of the case, it creates a alloca for each of your names and extractvalues the values and bitcasts them.
```qc
match (my_state) {
    States.Value(x) => ...
    None => unreachable;
}
```
becomes
```llvm
define i32 @main() {
    ...
    %my_state1 = extractvalue %enum.States %my_state, 0
    switch i8 %my_state1, label %match.default [
        i8 0, label %match.case1
        i8 1, label %match.case2
    ]
match.default:
    unreachable
match.case1:
    %x = alloca i32, align 4
    %match_raw = alloca [4 x i32], align 4
    %extract_element = extractvalue %enum.States %my_state, 1
    store [4 x i32] %extract_element, ptr %match_raw, align 4
    call @llvm.memcpy.inline.p0.p0.i64(ptr %x, ptr %match_raw, i64 4, i1 false)
    ...
    br label match.end
match.case2:
    unreachable
match.end:
    ...
}
```

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
