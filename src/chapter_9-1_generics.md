# Generics

Generics allow one type to work on many other types. This allows you to make one type for everything instead of 

```qc
class VecInt {
    ...
}
class VecDouble {
    ...
}
class VecString {
    ...
}
class VecXYZABCDEF {
    ...
}
```
forever.

Generics allow you to define types that are substituted with the users chosen type at compiletime.

## Basic Generics

A generic type is declared using angle brackets with the generic type names in the center:

```qc
class Box<T> {
    T value;

    Box(T value) {
        this->value = value;
    }
}
```

You can then instantiate a generic type by after the type name putting `<THETYPESTOSUBSTITUTE>`, e.g.

```qc
Box<int> x = Box<int>(123);
```

---

# Generic Constraints

Generic parameters can have constraints to restrict what types are allowed.
The syntax is:

```qc
<T([constraint]:[[!]<subconstraints>])>
```

For example:

```qc
class NumberBox<T(numeric:)> {
    T value;
}
```

This means `T` must be a numeric type.

Available built-in constraints include:

| Constraint  | Meaning               |
| ----------- | --------------------- |
| `usertype`  | Any user-defined type |
| `primitive` | Any primitive type    |
| `pointer`   | Any pointer type      |
| `numeric`   | Any numeric type      |

---

# Subconstraints

Generic constraints can also have _subconstraints_, which either restrict allowed types or exclude specific types.
Syntax:

```qc
<T(:!Type)>
```
The `!` means "not this type".

Example:

```qc
class NotInt<T(:!int)> {
    T value;
}
```

This allows any type except `int`.
Multiple types can be included or excluded using `|`.
Example:
```qc
<T(:!int|string)>
```
means:
> T cannot be int or string.

---

# Combining Constraints

Constraints and exclusions can be combined.
Example:

```qc
<T(numeric:!int|float)>
```

This means:

- `T` must be numeric
- `T` cannot be `int`
- `T` cannot be `float`

---

# Non-Type Generic Parameters

You can also make generic parameters that are instead constant compile-time values.

Example:

```qc
class Array<T, int Size> {
    T data[Size];
}
```

`Size` is not a type. It is a compile-time integer parameter.

Usage:

```qc
Array<int, 32> numbers;
```

The compiler knows the size during compilation.

---

# Generic Functions

Functions can also use generics.

Example:

```qc
T max<T(numeric:)>(T a, T b) {
    if (a > b) {
        return a;
    }
    return b;
}
```

Usage:

```qc
int x = max<int>(10, 20);
double y = max<double>(1.5, 2.5);
```

> Because implicitness = bad, generic parameters are not inferred. You must provide them manually.

---

# Generic Methods

Methods can have generic parameters independently from their class.
Example:

```qc
class Printer {
    T print<T>(T value) {
        `qout("%s", value);
        return value;
    }
}
```

---

# Generic... Everything?

Any usertype can be generic other than enums. Structs, aliases, unions, all of it.

---

# Generic Naming

By convention, generic parameters use short uppercase names:

```qc
class Array<T, int Size>
```

Common names:

| Name          | Meaning           |
| ------------- | ----------------- |
| `T`           | General type      |
| `A`, `B`      | Additional types  |
| `K`           | Key type          |
| `V`           | Value type        |
| `S`, `Size`   | Compile-time size |

However, generic parameter names are normal identifiers and follow the same rules as other names.
Specifically, generic parameters may use either the constant or usertype casing rules.

---

# Example

```qc
class Array<T, int S = 0> {
    T* data;
    int size;
    Array() {
        this->data = nullptr;
        this->size = 0;
    }
    T get(int index) {
        return this->data[index];
    }
}
int main() {
    Array<int, 10> numbers;
    Array<string> names;
}
```
