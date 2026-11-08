# Appendix M: File Structure

The perfered filestructure in C^4 is as follows:

1. File-level doc comments.
2. The `Exported` namespace.

- 1. Includes
- 2. C Includes

3. Usertype definitions outside namespaces.

- 1. Forward declarations
- 2. Definitions

> > Prefer your "interface" types declared first (concepts, modifiers, patterns, etc), then your basic types (structs, enums, raw unions), then your complex types (classes, unions), then your aliases.

4. Non-inclusion usertype fulfilment of interfaces

- 1. Concepts
- 2. Patterns

5. Constants
6. Non-inclusion functions
7. Your namespaces (in the above structure)
8. Non-inclusion helpers dependent on namespaces
9. Above two, in order of dependencies
10. Note-comments (`//?`)

The ideal file structure looks something like this.

```qc
//! arg-parsing.qc
//! parses CLI arguments into a one-way linked list of arguments.
//! argument is owned by arg-parsing.qc, however you must call destroy_args.
//! may only be used once per program
namespace Exported {
    // #include <StringHelpers, utils.hqc>
    // #include <stdlib.h>
    // just pretend this uses includes in this structure (it doesn't need includes)
}
// types as above rules listed.
namespace Args {
    struct Argument {
        Argument *next;
        char* value;
    }
    Argument *args;
    void destroy_args(Argument *arg = nullptr) {
        if (!arg) arg = args;
        if (arg->next) { 
            destroy_args(arg);
            `free(arg->next);
            // if using allocated strings:
            // `free(arg->value);
            // notice: strings will be majorly changed in upcoming C^4 versions.
        }
    }
    /// @summary parses cli arguments
    /// @param argv the cli arguments passed to main
    /// @param argc the number of arguments in argv, also passed to main
    /// @return a heap-allocated pointer to the parsed linked-list of arguments. parser owns
    /// @note returns nullptr if argc is 0
    Argument *parse_args(char **argv, int argc) {
        if (argc == 0) {
            args = nullptr;
            return nullptr;
        }
        Argument *result = `malloc(sizeof Argument);
        args = result;
        for (int i = 0; i < argc; i++) {
            result.value = argv[i];
            if (i < argc - 1) {
                result->next = `malloc(sizeof Argument);
                result = result->next;
            }
        }
        result->next = nullptr;
        return args;
    }
}
//? Implementation Notes
//? One use per program was decided because most times you only ever need to parse args once.
```
