# Patterns

Patterns allow you to extend pattern matching with custom behavior for your types, such as:

```qc
pattern Process {
    Idle;
    Running(int time);
    Stopped(int code);
}
class Proc {
    string command;
    int run_time;
    int exit_code;
    ...
}
Proc fits Process(p) {
    Idle if (p->run_time == 0 && p->exit_code == -1);
    Running(p->run_time) if (p->exit_code == -1);
    Stopped(p->exit_code) if (p->exit_code >= 0);
}
```

Now match on Proc checks that fits statement to determine the branch. Patterns are just like tagged enums, except that they can also define struct tags like this:

```qc
Tag{int x; int y;}...
```
Fits statements are like this:

```qc
Type fits Pattern(p) /* p is a variable of type Type that is passed like the `this` pointer into the fits block on use */ {
    PatternCase if (condition);
    PatternCase if (condition);
    ...
    default PatternCase;
}
```

Then it just works.
```qc
Type t...
match (t) {
    PatternCase => ...
}
```
