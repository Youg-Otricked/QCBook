# Appendix F: Compiler Reference

The following table lists each compiler flag and what it does. (For flags with 2 flags only one is shown)

| Flag                     | Usage (For special flags)                                            | Does                                                                                                                                               |
| ------------------------ | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--progress`             |                                                                      | Prints when the compiler makes it past each stage of the compilation process. It may print like `[PARSING]: main.qc [DONE PARSING]: main.qc` etc. |
| `--target`               | `qc --target x86-pc-gnu-linux ...`                                   | Sets the LLVM target triple to that target.                                                                                                        |
| `--silent-version`/`-sv` | `qc -sv`/`qc --silent-version`                                       | Prints the version of the compiler with no other text                                                                                              |
| `-O0`                    |                                                                      | Sets the optimization level to 0.                                                                                                                  |
| `-O1`                    |                                                                      | Sets the optimization level to 1.                                                                                                                  |
| `-O2`                    |                                                                      | Sets the optimization level to 2.                                                                                                                  |
| `-O3`                    |                                                                      | Sets the optimization level to 3.                                                                                                                  |
| `-Oz`                    |                                                                      | Tells the optimizer to make the binary as small as possible.                                                                                       |
| `-v`/`--version`         | `qc -v`/`qc --version`                                               | Prints full version text.                                                                                                                          |
| `-a`/`--ast`             |                                                                      | Prints the AST of the compiled code.                                                                                                               |
| `-tkn`/`--tokens`        |                                                                      | Prints the generated tokens of the compiled code.                                                                                                  |
| `-t`/`--time`            |                                                                      | Prints the compile time of the code.                                                                                                               |
| `-r`/`--raw`             |                                                                      | Removes pipeline formatting of generated AST when using `--ast`/`-a` flag.                                                                         |
| `-b`/`--bst`             |                                                                      | Renders generated AST as a binary tree when using `--ast`/`-a` flag.                                                                               |
| `-s`/`--suspense`        |                                                                      | Prints errors and error code messages in small random chunks instead of all at once.                                                               |
| `-co`/`--compile-only`   |                                                                      | Only compile to LLVM, do not compile the LLVM IR or link.                                                                                          |
| `-oo`/`--object-only`    |                                                                      | Only compile to LLVM and compile the generated LLVM. Do not link.                                                                                  |
| `-o`                     | `qc -o myfile ...`                                                   | Tells the compiler to output to a specific file.                                                                                                   |
| `-ad`/`--alias-dir`      | `qc -ad ./llvm/core/lib/api/types/lib/int/binary llvm-binary-int...` | Alias a directory name as a separate name for includes.                                                                                            |
| `-A`/`--alias`           | `qc -A ./common/api/SQL/Lite/dump.qc sqlite-dump.qc ...`             | Alias a file name to a separate name for includes.                                                                                                 |
| `-L`                     | `qc -L my-dir ...`/`qc -Lmy-dir`                                     | Tells the compiler to also search in that directory for `.so`/`.a` files to link. (Search dirs always contain `.`.)                                |
| `-l`                     | `qc -l m ...`/`qc -lm`                                               | Tells the compiler to link that `libARGUMENT.so/.a` from the search dirs.                                                                          |
| `-Wl,`                   | `qc -Wl,...`                                                         | Add that argument directly to the linker.                                                                                                           |
| `-d`/`--debug`           |                                                                      | Prints the optimization pass and function body before running on each function.                                                                    |
| `-D`/`--define`          | `qc -D MY_THING ...`                                                 | Defines that name as a macro for 1.                                                                                                                |
| `-h`/`--help`            | `qc -h`                                                              | Prints the help text.                                                                                                                              |

## Warnings

Warnings are divided up into categories, and those categories are divided up into subcategories.
The categories:

- `all`: All warnings
- `core`: The most important warnings
- `extra`: The less-important / small chance of being intentional code warnings.
- `pedantic`: Stylization/Best practices warnings.

Warnings have a few flags:

- `-W`: Enable that category/subcategory of warnings.
- `-E`: Enable that category/subcategory of warnings as errors.
- `-Wno-`: Disable that category/subcategory of warnings.

Example:

```bash
$ qc -Ecore -Wextra -Wno-implicit-extension -Wpedantic ...
```

## REPL

The REPL currently is non-functional.
