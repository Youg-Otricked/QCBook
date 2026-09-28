# Namespace Internals

Namespaces are guess what... COMPILE TIME ZERO COSTS BABY!

They just prefix the namespace path to the symbol name.

```qc
namespace Math {
    int add(int a, int b) {
        return a + b;
    }
}
```

becomes

```llvm
define i32 @"Math::add"(i32 %a, i32 %b) {
    %add_result = add i32 %a, %b
    ret i32 %add_result
}
```

Simple!
