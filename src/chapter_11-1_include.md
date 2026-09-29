# Includes & Namespaces

C^4 has a include system (obviously), but it's a little different from what you see in C or C++.
In C^4, you cannot include files directly. Instead, you include namespaces _from_ files.
This is because C^4 cares about _what_ you're including, rather than just dumping an entire file into your code.

> Um... our languages include system that is basically just using namespace is obviously superior
> > Some Rust dev

No, it's not.

## Exported

If you want to include something from other code, you first create an `Exported` namespace.

```qc
namespace Exported {

}
```

Then you put your include statements inside it.

```qc
namespace Exported {
    #include<OSInterop, std>
}
```

The `Exported` namespace is the place where a file says "these things are so core to my execution that every includer must have them." It is auto-merged at include time, and should be reserved exclusively for dependency inclusion.

## Include Syntax

The syntax for an include is:

```qc
#include<Namespace1, Namespace2::Nested, myfile.qc>
```

You can include multiple things at once by separating them with commas.

For example:

```qc
namespace Exported {
    #include<Math, Utilities::Strings, myfile.qc>
}
```

There are two things being included here and one being included _from_:

- `Math`
- `Utilities::Strings`
- `myfile.qc`

The first two are namespaces, while the last one is the include file.

## Nested Namespaces

Namespaces can be nested, and you can include a specific nested namespace using `::`.
For example:

```qc
namespace Utilities {
    namespace Strings {
        ...
    }
    namespace Math {
        ...
    }
}
```

You can include only `Strings` with:

```qc
#include<Utilities::Strings>
```

This only includes the `Strings` namespace*.

It does not include `Math`, or the entire `Utilities` namespace.

This is useful when you only need one part of a namespace hierarchy and don't want to include everything in it.

## The `std` Alias

C^4 has a builtin alias called `std`.

It points to:

```text
~/.qc/lib/stdlib.qc
```

So instead of having to write the path to the standard library every time, you can just use `std`.

For example, the standard library contains the `OSInterop` namespace. To include it, you can write:

```qc
namespace Exported {
    #include<OSInterop, std>
}
```

This tells C^4 to get `OSInterop` from the standard library.

## Including Your Own Files

You can also include namespaces from your own `.qc` files.

Suppose you have a file called `math.qc`:

```qc
namespace Exported {
    namespace Math {
        ...
    }
}
```

Another file can include it with:

```qc
namespace Exported {
    #include<Math, math.qc>
}
```

Now the `Math` namespace from `math.qc` is available.

The important part is that the namespace is what gets included. The `.qc` file just tells C^4 where to look for it.

## Why `Exported`?

You might be wondering why C^4 doesn't just let you include directly in global scope.
This is because in C^4, the global scope is considered file-private boundary, so in that model, you would never be able to expose includes and share them.

## Summary

The important stuff:

- C^4 includes **namespaces**, not files.
- Include statements go inside `Exported`.
- The syntax is:

```qc
#include<Namespace1, Namespace2::Nested, myfile.qc>
```

- `::` is used to include nested namespaces.
- Including `Namespace::Nested` only includes `Nested`, not the whole parent namespace.
- `std` is a builtin alias for `~/.qc/lib/stdlib.qc`.

That's basically it. Includes aren't complicated, they just have a slightly different idea behind them than C's `#include`. 
