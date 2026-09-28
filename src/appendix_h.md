# Appendix H: Undefined Behavior (UB)

UB is everywhere. You remember the stuff from the memory chapter. Here's a list of it all:

- **Running `unreachable`**: The compiler has no clue what could happen, because it assumes that code path is impossible.
- **Using uninitialized variables**: The memory is unset and contains garbage.
- **Calling methods on uninitialized classes**: Same as above; object state is undefined.
- **Dereferencing `nullptr`**: Reading or writing through a null pointer.
- **Use-after-free**: Reusing an `inval` or freed pointer.
- **Double-freeing**: Calling free on an allocation that was already freed.
- **Out-of-bounds access**: Reading or writing past the bounds of raw arrays, buffers, or structs.
- **Integer overflow**: (Technically wraps most of the time, but not guaranteed).
- **Division or modulo by zero**: `x / 0` or `x % 0` (crashes at runtime with `SIGFPE` or causes LLVM to fold the block into `undef`/`poison`).
- **Oversized bit shifts**: Shifting an integer by a count greater than or equal to its bit-width (e.g., `x << 32` on a 32-bit int) or shifting by a negative value.
- **Aliasing violations**: Breaking a parameter contract with `restrict`, `out`, or `inout`.
