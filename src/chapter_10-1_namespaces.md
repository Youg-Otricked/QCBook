# Namespaces

Namespaces are like a box for symbols. 

```qc
namespace X {
    int Y;
    ...
}
```

Now everything in the namespace X must be access with it's qualifier. To get things in the scope of the namespace, you use the `::` (scope resolution) operator.

> Remember it from static?

```qc
X::Y = 123;
```

Simple!
