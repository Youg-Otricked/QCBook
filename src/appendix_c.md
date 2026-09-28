# Appendix C: Intrinsics

There are a lot of intrinsics in the language. This is a quick reference of all of them.

| Intrinsic              | Function                                                                                                                                       |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `` `time ``            | Returns the current time.                                                                                                                      |
| `` `seed ``            | Seeds the random number generator.                                                                                                             |
| `` `random ``          | Generates a random integer. With two arguments, generates a random integer within a specified range.                                           |
| `` `len ``             | Returns the length of a value, such as a string or array.                                                                                      |
| `` `to_lower ``        | Converts a string to lowercase.                                                                                                                |
| `` `to_upper ``        | Converts a string to uppercase.                                                                                                                |
| `` `substring ``       | Returns a substring from a string.                                                                                                             |
| `` `contains ``        | Checks whether a string contains another string.                                                                                               |
| `` `startswith ``      | Checks whether a string starts with another string.                                                                                            |
| `` `endswith ``        | Checks whether a string ends with another string.                                                                                              |
| `` `trim ``            | Removes surrounding whitespace from a string.                                                                                                  |
| `` `replace ``         | Replaces occurrences of one string with another.                                                                                               |
| `` `to_int ``          | Converts a value to `int`.                                                                                                                     |
| `` `to_float ``        | Converts a value to `float`.                                                                                                                   |
| `` `to_double ``       | Converts a value to `double`.                                                                                                                  |
| `` `to_char ``         | Converts a value to `char`.                                                                                                                    |
| `` `to_bool ``         | Converts a value to `bool`.                                                                                                                    |
| `` `to_string ``       | Converts a value to a string representation.                                                                                                   |
| `` `to_byte ``         | Converts a value to `byte`.                                                                                                                    |
| `` `to_nibble ``       | Converts a value to `nibble`.                                                                                                                  |
| `` `to_addr_t ``       | Converts a value to `addr_t`.                                                                                                                  |
| `` `to_qbool ``        | Converts a value to `qbool`.                                                                                                                   |
| `` `to_long_int ``     | Converts a value to `long int`.                                                                                                                |
| `` `to_short_int ``    | Converts a value to `short int`.                                                                                                               |
| `` `qout ``            | Prints to console with formatting, truncation, zext, and other fancy stuff. All the printf formatting features with different names for types. |
| `` `typeof ``          | Returns the type of an expression as a string.                                                                                                 |
| `` `open ``            | Opens a file and returns its file descriptor.                                                                                                  |
| `` `close ``           | Closes an open file.                                                                                                                           |
| `` `read ``            | Reads data from a file.                                                                                                                        |
| `` `write ``           | Writes data to a file.                                                                                                                         |
| `` `malloc ``          | Allocates a block of memory.                                                                                                                   |
| `` `calloc ``          | Allocates and zero-initializes a block of memory.                                                                                              |
| `` `free ``            | Frees previously allocated memory.                                                                                                             |
| `` `realloc ``         | Resizes a previously allocated block of memory.                                                                                                |
| `` `mapped_ptr ``      | Converts an integer address into a pointer. The integer must be pointer-sized.                                                                 |
| `` `ternary ``         | Selects between two values based on a boolean condition. Equivalent to a ternary conditional expression.                                       |
| `` `to_address ``      | Converts a pointer into its integer address representation.                                                                                    |
| `` `inline ``          | Emits inline assembly with specified inputs, outputs, and register clobbers.                                                                   |
| `` `flush ``           | Flushes buffered output.                                                                                                                       |
| `` `next ``            | Retrieves the next argument from a variadic argument list and converts it to the requested type.                                               |
| `` `is_empty ``        | Checks whether a variadic argument list has any remaining arguments.                                                                           |
| `` `cast ``            | Performs an explicit type cast between compatible integer, floating-point, and pointer types.                                                  |
| `` `float_bits ``      | Reinterprets an integer's bits as a `float`.                                                                                                   |
| `` `double_bits ``     | Reinterprets an integer's bits as a `double`.                                                                                                  |
| `` `compile_error ``   | Emits a compile-time error using a compile-time string.                                                                                        |
| `` `compile_warn ``    | Emits a compile-time warning using a compile-time string.                                                                                      |
| `` `compile_note ``    | Emits a compile-time note using a compile-time string.                                                                                         |
| `` `atomic_load ``     | Atomically loads the value of an atomic variable.                                                                                              |
| `` `atomic_store ``    | Atomically stores a value into an atomic variable.                                                                                             |
| `` `atomic_exchange `` | Atomically exchanges an atomic variable's value and returns its previous value.                                                                |
| `` `atomic_add ``      | Atomically adds a value to an atomic variable and returns the previous value.                                                                  |
| `` `atomic_sub ``      | Atomically subtracts a value from an atomic variable and returns the previous value.                                                           |
| `` `atomic_and ``      | Atomically performs a bitwise AND on an atomic variable.                                                                                       |
| `` `atomic_or ``       | Atomically performs a bitwise OR on an atomic variable.                                                                                        |
| `` `atomic_xor ``      | Atomically performs a bitwise XOR on an atomic variable.                                                                                       |
| `` `atomic_nand ``     | Atomically performs a bitwise NAND on an atomic variable.                                                                                      |
| `` `atomic_min ``      | Atomically replaces a value with the signed minimum of the current and supplied values.                                                        |
| `` `atomic_max ``      | Atomically replaces a value with the signed maximum of the current and supplied values.                                                        |
| `` `atomic_umin ``     | Atomically replaces a value with the unsigned minimum of the current and supplied values.                                                      |
| `` `atomic_umax ``     | Atomically replaces a value with the unsigned maximum of the current and supplied values.                                                      |
| `` `atomic_cmpxchg ``  | Atomically compares an atomic variable with an expected value and, if equal, replaces it with a desired value.                                 |
| `` `atomic_fence ``    | Emits a sequentially consistent atomic memory fence.                                                                                           |
| `` `lseek ``           | Changes the current position of an open file's file pointer.                                                                                   |
| `` `opendir ``         | Opens a directory for reading.                                                                                                                 |
| `` `readdir ``         | Reads the next entry from an open directory.                                                                                                   |
| `` `closedir ``        | Closes an open directory.                                                                                                                      |

## Notes

The following intrinsics are implemented directly by the compiler rather than being simple runtime function calls:

- `` `qout ``
- `` `typeof ``
- `` `mapped_ptr ``
- `` `ternary ``
- `` `to_address ``
- `` `inline ``
- `` `next ``
- `` `is_empty ``
- `` `extract ``
- `` `cast ``
- `` `float_bits ``
- `` `double_bits ``
- `` `compile_error ``
- `` `compile_warn ``
- `` `compile_note ``
- `` `atomic_load ``
- `` `atomic_store ``
- `` `atomic_exchange ``
- `` `atomic_add ``
- `` `atomic_sub ``
- `` `atomic_and ``
- `` `atomic_or ``
- `` `atomic_xor ``
- `` `atomic_nand ``
- `` `atomic_min ``
- `` `atomic_max ``
- `` `atomic_umin ``
- `` `atomic_umax ``
- `` `atomic_cmpxchg ``
- `` `atomic_fence ``

The remaining intrinsics are backed by runtime functions. For example, `` `time `` maps to `qc_time`, `` `malloc `` maps to `qc_malloc`, and the directory operations map to `qc_opendir`, `qc_readdir`, and `qc_closedir`.
Atomic operations use sequentially consistent ordering.
