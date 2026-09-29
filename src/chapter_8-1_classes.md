## Classes

> TLDR: Classes are structs with behavior attached.


Classes are a core part of the Object Oriented Programming paradigm, which is on the middle of the idea of state.
Imperative -> State is external to the code
**Object Oriented** -> State is part of the code
Functional -> State is not a thing

Classes have instances which have all their state wrapped up in the instance.
The thing that makes classes not structs is _methods_. Basically functions that can access the actual class.

Until you add methods classes work the exact same as struct.

```qc
class Something {
    .......
}
```

## Methods

Structs describe data. Classes describe data _and the operations that can be performed on it_.
Methods are what makes OO special. Methods have access to a _pointer_ to the current instance (this instantiation) of the class. It's called the `this` pointer.
Methods just look like functions inside the class, except they can use `this`.

```qc
class Accumulator {
    int data;
    void accumulate(int value) {
        this->data += value;
    }
}
```

### Constructors

You may be thinking

> But how do I create new classes. What if I want specific values for the methods?

That's what constructors do. They are special methods with no return types and the name is the class name. They are called to create a class and you can setup the class there.

```qc
class MyThing {
    int noSetByUser;
    MyThing(int n) {
        this->noSetByUser = 12;
    }
}
MyThing thing = MyThing(312);
```

### Overloading

Unlike functions, methods have _overloading_. This means that you can declare multiple methods with the exact same name, the only difference being the param count & param types. This allows you to have, for example, multiple constructors for different arguments.

## Access Control

Some things we don't want accessible to everybody. That's what `private` is for. It makes something inaccessible to anything but this class and it's methods.

```qc
class Mine {
    private int x;
    public void doStuff() {
        ...
    }
    ...
}
```

`public` is the default, and means accessible by everything. You can use it explicitly too.

## Inheritance

Sometimes, you want to have the same fundamental building blocks in many classes. Does this mean you need to copy your code around in every class? No. This is because of inheritance: You make a Base (Parent) class that has the shared state, then the children _inherit_ from it. To inherit from a class you use the following syntax:

```qc
class Base {
    ...
}
class Child : Base /* Child inherits from Base */ {
    ...
}
```

Now methods defined in Base can be _overriden_ in Child, meaning they are redefined with new behavior.
You may not want to copy it's constructor. That is also a thing you can use externally, by after your constructor params, putting `: ` then the parent constructor call.

```qc
class Child : Base {
    Child() : Base(12) /* When this constructor is called Base is called with args 12 to initialize bases fields in child */ {
        ...
    }
}
```

There is also another access specifier: `protected`. This makes a field accessible only by a class _and it's children_

## Static

Static fields and methods belong to the class instead of a instance, and are access with the :: (scope resolution) operator.

```qc
class Statistics {
    static int x = 123; // static fields can have default initializers.
    static void doStuff() {
        ...
    }
    ...
}
int x = Statistics::x; // 123
Statistics::doStuff();
```

## Friend & Friendly

Sometimes, access control can feel a little restrictive: This is what `friend` and `friendly` are for. They give another class access.
Friend gives another class access to private and protected fields, and friendly gives a class access to protected.

> This is not advice. Do not give people who you are just friendly with your social security number.

## Operator Overloading

Classes can never feel like native language features...

_Or can they_

> Queue VSauce intro


Operator overloads are special methods the compiler generates calls to for normal language syntax, such as addition.

```qc
struct Point {
    ...
}
struct Ray {
    ...
}
class Angle {
    ...
    Angle operator+(Angle other) {
        ...
    }
}
int main() {
    Angle ang = ...;
    Angle other = ...;
    ang = ang + other; // compiler generates ang = ang.operator+(other);
}
```

It's as you would expect for all the other binops, then unary operator overloads just take no parameters, and then there are a few special ones.
1. `roperator`
    roperators run when the class is used as the _rhs_ of a expression. 
    Roperators exist for `-` `/` `%` `#^` `|>` `:>` `|>>` `<<` and `<<<` because those are the only ones which matter with a different rhs.
    ```qc 
    roperator-(int lhs) {...}
    ```
2. `operator[]=`
    `operator[]=` runs on initialization with a array initializer. It takes a `<type> *` data and a `int` length.
    It can also be used as a constructor (e.g. `Array x = [1, 2, 3];`), so your code must be safe for running on a uninitialized instance.
3. `operator[]`
    `operator[]` runs on subscript. Remember in the reference lesson I talked about returning references? This is where it is useful. If you heap allocate your data, 
    you can make custom collection types subscript modify the data (for like `x[1] = 2`) by returning a REFERENCE to the data.
4. `_repr`
    `_repr` takes no arguments and returns a string, the stringified version of the class. _repr is automatically called on print with %cs or in use of a fstring / converting anything to a string.
5. `_eval`
    `_eval` takes no arguments and returns a bool, the truthiness of the class. It is used when converting a class to truthiness.
6. `_destroy` 
    `_destroy` is not automatically called, and is instead a convention to create as a method to clean up the classes heap allocations, then you can defer it at creation.
    This is something to `defer`

## Abstract Classes

Abstract classes create the outline for a actual class. They cannot be instantiated, and cannot have fields or constructors.

> ![panik](./images/panik.png) This code will not compile for 2 reasons. 1. An `abstract class` is instantiated and 2. `abstract class`es cannot have constructors.
```qc
abstract class MyThing {
    MyThing() {
    }
    void xyz() {
        ...
    }
    void zy();
}
MyThing x;
```
```bash
$ qc ./testerrors.qc
- Running...
=== Diagnostics ===
error invalid syntax: : QC-S090: Cannot make constructor on abstract class 'MyThing'
 --> ./testerrors.qc:1:16
  1 | abstract class MyThing {
    |                ^^^^^^^
  2 |     MyThing() {
  3 |     }

==============
= Error Code =
Program exited with code 1
==============
```

## Final

Final is a modifier that can be placed on a method or class. Final methods cannot be _overriden_, meaning child classes cannot define new versions of this method.

Final classes can not be inherited from period.

## Polymorphism

Here is the important part of OOP. Polymorphism.

> Is that a Pokémon?

No. Polymorphism basically allows for a pointer to a parent class to store a pointer to any child class. We want this because then you can use the pointer like the parent class but get the new behavior, allowing for the concept of _dependency injection_, which we will cover later.

```qc
class Base {
    ...
    void myMethod() {
        ...some code
    }
}
class Child : Base {
    ...
    void myMethod() /* Overrides myMethod from base */ {
        ...other code
    }
}
Base b = ...;
Base *p = &b;
Child c = ...;
p = &c;
p->myMethod();
```

## Important

All methods are virtual. If you want to use polymorphism, inherited methods MUST be defined in the same order as the parent class, and new methods must be defined after.

---

POP QUIZ!

{{#quiz ../quizzes/oop.toml}}

And that's because of the most unapreciated pointer ever: the _vpointer_.

The vpointer is hell for me (the compiler engineer) to deal with, but not for you. Your vpointer is your best friend.

For a measly 4/8 bytes of memory, the vpointer stores a mapping of every method name to the methods address, so that way instead of polymorphic pointers methods being called just calls the base classes method, it calls the _correct method_!


