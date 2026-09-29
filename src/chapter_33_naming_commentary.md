# Naming Commentary

Here's a quick reference;
| Type | Casing | Why |
| ---- | ------ | --- |
| Variable | snake_case | It's familiar to C++, C, Zig, Go, and Rust devs. |
| Functions | camelCase | It allows for instant knowledge between if an identifier is a var, or function (lambdas use var casing, not function casing)  |
| User Types | PascalCase | It is common across basically every programming language. |
| Constants | SCREAMING_SNAKE_CASE | Same as above. |
| Private Member Variables | __snake_case | Variable case prepended with __. Most underscores.  |
| Protected Member Variables | _snake_case | Less underscores.      |
| Protected Methods | __camelCase | Unique casing, more underscores.                      |
| Private Methods | camel_Snake_Case | Function casing, more underscores. |
| Namespaces | PascalCase | Same as user types. |
| Namespaces Not Meant For Inclusion | Pascal_Snake_Case | Unique casing style, more underscores, you have to be trying to include this.           |
| Global Scope Functions | camel_Snake_Case | Unique casing style, more underscores, similarity to private methods is intentional, because global scope cannot be included. |
| Methods Used By Compiler | _camelCase | Different from everything else. (Special methods recognized by the compiler (for example iterator methods).) |
| Compiler Reserved | _qc_ |  __qc_ and qc_,Unique, hard to use accidentally         |
| Compiler Intrinsics | `snake_case | Clearly distinguishes compiler intrinsics from user-defined functions.  |

General formatting recommendations:
- Maximum line length: approximately 120 characters relative to the current indentation.
- Tabs or spaces are both acceptable.
- Use LF line endings.
- `//` for comments.
- `///` for documentation comments.
- `//!` for file-level documentation.
- File paths are written without quotes.
- Place everything except `main` inside a namespace when practical.
A namespace should generally contain one of the following:
1. Namespaces should do one thing well, similar to the UNIX philosophy, 
2. Namespaces should have either:
        1. one type (or group of TIGHTLY related types, eg bigints) and their core helpers,
        2. above + namespaces containing extra helpers
        3. helper functions / utility functions (think a `Math` namespace with log, cos...)
        4. OR anything if directly mapping  C/C++/Zig/Rust code to C^4
3. Types in namespaces should have short names: The namespace should have the longer name
        e.g.
```
namespace Array {
    class Arr<T, int S = 0> {
        ...
    }
}
```
Pointer asterisks bind to the type rather than the variable. The final * belongs to the declarator, unless its a function return type. Then its all on the type.
```
int** *x;
int* ptr_add(int *p) ...
```
Files are `kebab-case` (optional, sometimes I dont follow this)

Why these conventions? Why are they so weird?

Let's start from the bottom and go up.

1. Files are `kebab-case`. I just decided this on the spot. I think it makes files more readable. You can use any case. Camel, Pascal, Snake, who cares.
2. Pointer asterisks bindo to type type rather than the variable, but...
    This is because pointers are a pointer to a type. `int ***x` isn't true. It's a pointer _to_ a pointer to a pointer to a int. It's not a pointer to a pointer to a pointer _to_ a int.
    The final `*` binds to the declarator because it says this symbol is a pointer _to_ this type.
3. Types in namespaces should have short names, the namespace gets the descriptive one.
    This is because the namespace should organize the code, the types should be the code. Otherwise, we would be typing `Vector::ReverseIterator::Iterator::next` all day long.
4. Namespaces should have either:
    1. One Type. This is to stick to the above rule.
    2. One Type + Helper Namespaces. You shouldn't need to include 50 namespaces to use one type. If your type has really important helpers, stick them in their.
    3. Helper functions/utility functions. One big `Math` namespace is better than 50 namespaces with 1 function each.
    4. Anything, if directly mapping another languages code to C^4. You shouldn't need to refactor a full API to rewrite in C^4. That's some other open source persons job. (most likely mine)
5. Namespaces should be like the UNIX philosophy.
    Having one massive namespace with 500 uncorrelated things not split into subnamespaces is just bad design.

6. Maximum line length: approximately 120 characters relative to the current indentation. Because of the nature of this language, you may be writing code in a method in a class in a namespace in a namespace. That's already 16 levels of indenation. Nobody needs to code like this:
```qc
if (
 Some
ethin
g
) {
...
}
```
7. Tabs or spaces are both acceptable. Who cares?
8. Use LF line endings. `\r\n` is stupid.
9. `//` for comments. How the language works
10. `///` for documentation comments. Just a convention, not enforced neither does it do anything. Borrowed from Zig.
11. `//!` for file-level documentation. Same as above.
12. File paths are written without quotes. I like includes looking clean.
13. Place everything except `main` inside a namespace when practical. Ideally not much code should be private to your file.
