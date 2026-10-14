# C Include

So, with FFI you can use C code. But retyping signatures is _so_ annoying. Can we not do that?

Yes! You win the internet for today.

You can directly include C headers with include statements, and link the .o's with `#link` or just putting the object files in your compile command.


```c
=== math_helpers.h ===

int factorial(int n);

=== math_helpers.c ===

int factorial(int n) {
    if (n < 0) {
        return -1;
    }
    int result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

======================
```

Then we compile the `.c` file.

```bash
$ clang math_helpers.c -c -o math_helpers.o
```

and finally, we make our `.qc` file.

```qc
=== main.qc ===
#include<math_helpers.h>
#link<math_helpers.o>
int main() {
    `qout("%i", factorial(6));
    return 0;
}
===============
```

Then if we compile and run,

```bash
$ qc main.qc
$ ./a.out
720
$
```
