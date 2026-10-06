# Appendix E: Type System Reference

T1 lists primitive types:

Table T1:

| Type         | LLVM Type                                 | For                                    |
| ------------ | ----------------------------------------- | -------------------------------------- |
| `int`        | `i32`                                     | Normal signed integers                 |
| `short int`  | `i16`                                     | Short signed integers                  |
| `long int`   | `i<size>`                                 | Longer signed ints                     |
| `nibble`     | `u4`¹                                     | Small unsigned chunks of data          |
| `byte`       | `u8`¹                                     | Singular unsigned bytes of data        |
| `addr_t`     | `u<size>`¹                                | (Unsigned) Addresses, loop incrementor |
| `char`       | `i8`                                      | ASCII characters                       |
| `string`     | `ptr`                                     | String of text                         |
| All pointers | `ptr`                                     | Pointers                               |
| `bool`       | `u1`¹                                     | Conditions                             |
| `qbool`      | `u2`¹                                     | 4 state logic/Error codes              |
| `float`      | `f32`                                     | Low precision decimal numbers          |
| `double`     | `f64`                                     | High precision decimal numbers         |
| Arrays       | Either `ptr` or `[<elemtype> x <count> ]` | Arrays                                 |
| Usertypes    | LLVM structs                              | Structs                                |
| Enums        | LLVM structs                              | Constant Groups                        |
| Unions       | LLVM Structs                              | Type Unions                            |
| Classes      | LLVM Structs                              | Classes                                |
| Tuples       | LLVM Literal Structs                      | Tuples                                 |

¹ LLVM integer types do not encode signedness. uN is used here to indicate that the language treats the corresponding iN value as unsigned.

## Casting

Almost all of the time, upwards casting (`float` -> `double`, `int` -> `long int`, `short int` -> `long int`, `nibble` -> `addr_t`) is implicit. The specific times not being:

- Upwards casting a `bool`/`qbool`
- Signed -> Unsigned

Sometimes, downwards casting (`double` -> `float`, etc) is implicit too. Those occasions being:

- Integer assignment
- Specific edge cases

Pointer types all atomatically cast in situations such as assignment.

To cast not-allowed casts/cast in the middle of an expression (such as for `void*` -> `int*`) you use the `` `cast `` intrinsic. It's first argument is your value and it's second is your type to interpret as. If it's a valid conversion, such as pointer conversion or integer casting it will cast.

```qc
*`cast(`malloc(sizeof int), int*) = 123;
```

You can also use `as` instead of cast.

```qc
*(`malloc(sizeof int) as int*) = 123;
```
