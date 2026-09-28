# Generic Internals

Generics are _monomorphised_. This means a new copy of the class is generated for each type. This is a tradeoff.

Pros:
- It's a ZERO COST!
- It's hella fast.
Cons:
- It makes a bigger binary.

So this:
```qc
class C<T> {
    T x;
    ...
}
C<int>...
C<float>...
```

Becomes:

```llvm
%"class.C<int>" = type { ptr, i32 }
%"class.C<float>" = type { ptr, float }
```

Methods are also just generated with this old mangling scheme but the class name has the genericised type. Generic functions/methods just stick the generic params in their name.
```qc
T add<T>(T a, T b) {
    return a + b;
}
add<int>(123, 321);
```
Becomes
```llvm
define i32 @"add<int>"(i32 %a, i32 %b) {
    %add_result = add i32 %a, %b
    ret i32 %add_result
}
```

Generic constraints, just like access control, are compile-time-only. ZERO COST BABY!
