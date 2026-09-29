# Class Internals

## Methods

When a method is compiled, it's compiled with an additional first argument, the `this` pointer, and the name is just prefixed with the class name followed by a _.

```qc
class MyClass {
    int add(int other) {
        ...
    }
}
```
becomes
```llvm
define i32 @MyClass_add(ptr %this, i32 %other) {
    ...
}
```
The this pointer is actually just a special argument.
Constructors get the same treatment


```qc
class Class {
    int x;
    Class() {
        ...
    }
}
```
becomes
```llvm
%class.Class = type { ptr, i32 } ; the vpointer is ptr

define void @Class_Class(ptr %this) {
    ...
}
```

Then when you do
```qc
Class c = Class();
```
it actually creates an alloca of type Class then constructs it.
```llvm 
%c = alloca %class.Class, align 4
call void Class_Class(ptr %c)
```

### Overloading

Overloaded methods just get prefixed by their changed types.
```qc
class MyClass {
    ...
    int addStuff(int x) {
        ...
    }
    int addStuff(float x) {
        ...
    }
}
```
becomes 
```llvm
define i32 @MyClass_addStuff_int(i32 x) {
    ...
}
define i32 @MyClass_addStuff_float(float x) {
    ...
}
```
These simple mangling rules allow C^4 llvm to always be readable.

## Access Control

Access control is not a concept in LLVM. Instead, whenever you perform a operation on a method the compiler checks if you are allowed to. It's a ZERO COST!

## Inheritance

Inheritance just tells the compiler the class may use these methods and adds the parents fields to the child.
Overriding just creates a new method and replaces it in the vtable & compiler metadata.

## Static

Static fields and methods get a `::` instead of `_` in their name and don't get the vptr.

```qc
class Thing {
    static int add(int a, int b) {
        ...
    }
}
```
becomes
```llvm
define i32 @"Thing::add"(i32 a, i32 b) { ; quoted identifier to allow : in the name
    ...
}
```

## Friend & Friendly

Just sets metadata. Nothing special. Just like access control.

## Operator Overloading

The compiler just calls these methods. Nothing too special.

## Abstract Classes

Abstract classes just become classes. Nothing changes, they are just compiler rules.

## Final

Once again, just a compiler rule (noticing that most fancy OOP features are just compiler rules?)

## Polymorphism

The `vptr` becomes a hidden first field of the class `__vptr` with type `THISCLASS*`. It stores the address of a global variable which is a array indexed by method indexies to their address.

```qc
class MyClass {
    int x;
    int add(int x) {
        return x;
    }
}
```
becomes 
```llvm
@MyClass_vtable = local_unnamed_addr constant [1 x ptr] [ptr @MyClass_add]
; Function Attrs: mustprogress nofree norecurse nosync nounwind willreturn memory(none)
define i32 @MyClass_add(ptr readnone captures(none) %0, i32 returned %1) #0 !qc.return_types !0 {
entry:
  ret i32 %1
}
attributes #0 = { mustprogress nofree norecurse nosync nounwind willreturn memory(none) }
!0 = !{!"int"}
```
The vpointer is just an array of the methods. Notice the qc.return_types? That's a attribute for the compiler to track method returns for my sanity because once again... llvm pointers are bad.

The compiler is stupid. Not really stupid, just a little stupid. VTables are generated in the order the methods are defined, which is why you need to define in the order of parent. Because if you do this:

```qc
class A {
    A();
    int doStuff();
}
class B : A {
    int doStuff();
    void otherThing();
    B():
}
```
then A vtable index 0 will be "A()", and A vtable index 1 will be "doStuff()", but B's vtable will be `[doStuff(), otherThing(), B()]`, which is... bad. because then calls to doStuff call otherThing, etc.
