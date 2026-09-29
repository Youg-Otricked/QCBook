QuarticC has unusual naming conventions:

| Type                               | Casing               | Why                                                                                                                           |
| ---------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Variable                           | snake_case           | It's familiar to C++, C, Zig, Go, and Rust devs.                                                                              |
| Functions                          | camelCase            | It allows for instant knowledge between if an identifier is a var, or function (lambdas use var casing, not function casing)  |
| User Types                         | PascalCase           | It is common across basically every programming language.                                                                     |
| Constants                          | SCREAMING_SNAKE_CASE | Same as above.                                                                                                                |
| Private Member Variables           | __snake_case         | Variable case prepended with __. Most underscores.                                                                            |
| Protected Member Variables         | _snake_case          | Less underscores.                                                                                                             |
| Protected Methods                  | __camelCase          | Unique casing, more underscores.                                                                                              |
| Private Methods                    | camel_Snake_Case     | Function casing, more underscores.                                                                                            |
| Namespaces                         | PascalCase           | Same as user types.                                                                                                           |
| Namespaces Not Meant For Inclusion | Pascal_Snake_Case    | Unique casing style, more underscores, you have to be trying to include this.                                                 |
| Global Scope Functions             | camel_Snake_Case     | Unique casing style, more underscores, similarity to private methods is intentional, because global scope cannot be included. |
| Methods Used By Compiler           | _camelCase           | Different from everything else. (Special methods recognized by the compiler (for example iterator methods).)                  |
| Compiler Reserved                  | _qc_                 | _*qc* and qc_,Unique, hard to use accidentally                                                                                |
| Compiler Intrinsics                | `snake_case          | Clearly distinguishes compiler intrinsics from user-defined functions.                                                        |

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
2. Namespaces should have either: 1. one type (or group of TIGHTLY related types, eg bigints) and their core helpers, 2. above + namespaces containing extra helpers 3. helper functions / utility functions (think a `Math` namespace with log, cos...) 4. OR anything if directly mapping C/C++/Zig/Rust code to C^4
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
QuarticC naming conventions are designed to make code readable without requiring the reader to inspect library code. Names should provide immediate context.

## Philosophy

> RTFM once, not RTMSCE5S (Read The Manual and Source Code Every 5 Seconds).

Names should provide enough context that readers rarely need to inspect library implementations to understand their role.

Example:

```
namespace Network {
    class Client {
        string server_name;

        void connectToServer() {
            ...
        }
    }
}
namespace Nothing_Illegal_I_Promise { // Intentionally formatted as a non-inclusion namespace.
    // If users don't want to type this, they probably shouldn't be including it.
    ...
}
```

## Package and Version manager

QuarticC has a package and version manager (obviously). If you do not have it installed, do.
Once installed, you can use the following commands:

- `qcm setup`: Sets up qcm. Must be ran before any other command. Also adds qcm to your path.
- `qcm tooling install <version>`: Installs that version of qc. Latest installs latest
- `qcm tooling list`: Lists installed versions
- `qcm tooling list-remote`: Lists all versions
- `qcm tooling uninstall <version>`: Uninstalls selected version.
- `qcm tooling help`: Prints help text

- `qcm help`: Prints help text for non-tooling
- `qcm init`: Initializes project
- `qcm add <package alias>`: Installs registry package of name alias and adds it to dependencies
- `qcm add <package alias> git <package tarball url>`: Installs a package from a tarball url amd adds it to dependencies
- `qcm sync`: Installs qc version for this project & installs all dependencies
- `qcm uninstall <package alias>`: Removes dependency `<package alias>`

### Packages

qcm isn't just for your own projects. You can create librarys (packages) using qcm for other people to install & include, the same way we used the `std` library in the
include lesson.

A package that's meant to be included by others needs an API: a namespace your callers are meant to use, versioned so they know what they're depending on.

#### Package Structure

Really, there are 3 ways to structure packages.

1. Many many files that each have one namespace and add sub namespaces, e.g.

```qc
======file.a.qc======
namespace myFile {
    namespace Types {
        ...
    }
}
======file.b.qc======
namespace myFile {
    namespace Values {
        ...
    }
}
=====================
```

Then you include specific subnamespaces from specific files.

2. One massive monolithic file with one big namespace and many sub namespaces

```qc
======lib.qc======
namespace myLib {
    namespace Core {
        ...
    }
    namespace Sub {
        ...
    }
    ...
}
=================
```

Then you include specific subnamespaces from this one file.

3. Many small files with various namespaces

```qc
======lib.core.qc======
namespace Core {
    ...
}
======lib.bonus.qc====
namespace Bonus {
    ...
}
======================
```

Then you include various things from the different files.

Personally, I like the first 2 styles, and sometimes when making the first approach, you make a core.qc file or something that includes all the most basic core parts so
you can just include core.qc as a dummy file and get includes as a sideeffect.

To install packages with qcm, you either use

```qc
qcm add <package name>
```

if it is a registry package, and that will auto-alias it to the package name in the registry, then in includes instead of ./dependencies/packagename/... you can just use
packagename/...

otherwise:

```qc
qcm add <alias> git <url to a .tar.gz>
```

and you can still use
alias/...
