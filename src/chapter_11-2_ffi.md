# FFI

C^4 uses the C ABI for external interoperability.
There are two directions:

## 1. Export QuarticC code

To expose QuarticC functions to other languages through the C ABI:

```qc
extern:
int add(int a, int b) {
    return a + b;
}
:extern
```
This is equivelant to 
```c
extern "C" {
    int add(int a, int b) {
        return a + b;
    }
}
```
in many other languages.

## 2. Import external functions

To use functions provided by an external C ABI-compatible library or file:

```
foreign:
int add(int a, int b);
:foreign
```

This is like puting signatures in a `extern "C"` in other languages.

Then, to actually link the .so/.a files for your C-imported code to work,

- In the compile command:
    Add your link librarys and link. To add a link search directory:
        add -Lyour_directory to the compile command
    To link a library from a search dir (. is default)
        add -lyour_lib to the compile command to link a .so/.a file in the current dir titled lib<name>.extention
        add -laspecificfile to link that exact file.
    To add a specific link command
        add -Wl,COMMAND
- In the file
    add `#searchdir<dir>` to add -LTHATDIR to the command.
    add `#link<name>` to add -lNAME to the compile command.
You can also include from ".hqc" files, which can also have the link preproccessers, so you don't need to compile entire librarys every compile and instead just 
include from .so/.a's

Simple! (part 2)
