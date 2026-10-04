# Appendix L: Bad Practices

Currently, C^4 has a small bad practice list. Those being:

1. Using concepts for the lone purpose of giving structs behavior.
```qc
concept Empty {
}
struct Thing...
Thing proves Empty with_proof {
...methods
}
```
2. Making anything smart-pointer like.
3. Ambiguous mixed casing schemes.
```qc
int my_var = 321;
int myOtherVar = 123;
```
4. Spliting up functions into tons of one-use helpers. A good rule is 3 in the same function, 2 different functions, or 1 different context.
5. More than 6-level nesting (in a function, namespace-in-namespace-in-namespace-in-namespace-in-class-in-method doesn't count)
6. Unrelated thins in one namespace (not unrelated subnamespaces)
7. Magic numbers used more than once.
8. Dead code
9. Ignoring/Swallowing errors.
```qc
try {
    ...
} catch (...) {
}
```
10. Using uninitialized variables (that's just UB).
11. More than 7 parameters in a function (Just use a struct)
```qc
void create_thing(
    int a,
    int b,
    int c,
    int d,
    int e,
    int f,
    int g
) ...
```
12. Premature `<abstraction|optimizaion|helpers>`
13. Outdated comments.
14. Excesssive commentation in readable code.
15. Abusing langauge features for reasons that are against the core goals of the language. Not being clever, being against the language.
