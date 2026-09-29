# Control Flow

## Conditionals

Conditionals allow code to run on conditions. (duh.)

`if` statements are the most common conditional.

```qc
int x = 12;
if (x < 10) {
    // this code will run if x is less than ten
}
```

`if` statements can also have else blocks, which run if the condition is _false_.

```qc
if (...) {
    ...
} else {
    ...
}
```

You can also chain conditions with `else if`. It is just shorthand for
```qc
else {
    if (condition) {
        ...
    } else {
        ...
    }
}
```

That means

```qc
int x = 0;
if (x > 0) {
    x -= x;
} else if (x < 0) {
    x += x;
} else {
    x = 1;
}

// is equivalent to
int x = 0;
if (x > 0) {
    x -= x;
} else {
    if (x < 0) {
        x += x;
    } else {
        x = 1;
    }
}
```

`else if` is preferred because it is more terse and readable.
You can omit braces if the body is only one line.

```qc
if (x < 10) `qout("%i", x);
else ...
```

C^4 also has the quality-of-life feature, ternary. Ternary is a ternary operation: argument one is a boolean, and arguments 2 & 3 are of the same type. If the condition is true it returns argument 2 and otherwise returns 3.

Its syntax is this:

```qc
<CONDITION> ? <TRUEVAL> : <FALSEVAL>
```

## Loops

Repeating code is important (obviously). Loops are how you do that.


### While Loop

The `while` loop runs code while the condition is true.

```qc
int x = 0;
while (x < 10) {
    x++;
}
// x is 10
```


### For Loop

A common pattern with `while` loops is creating a variable to track the number of iterations that have passed, then incrementing it every iteration. For loops do this automatically.

```qc
for (start; stop; step) {
}
```
Start runs before the loop runs, stop is the condition that must be false for it to stop, and step runs at the end of every iteration. Both start and step can be omitted.

```qc
for (int x = 0; x < 10; x++) {
    `qout("%i", x);
} // loop ends after 10 iterations & prints 0123456789
for (int i = 0; ++i < 9;) {
    // omitted the step, but the step happens in the condition.
}
```

### Break & Continue

In loops, you may want to stop early or skip an iteration. That's what break and continue do. Break immediately stops the loop (in for it does not run the step) and continue immediately ends this iteration of the loop and run the condition again (and the step in for)

### Loop Loop

That wasn't a typo. The `loop` loop is equivalent to `while (true) { }`.

```qc
loop {
    ...
}
```

## Do While Loop

The do-while loop is like the while loop but the code is guaranteed to run once.

```qc
do {
    ...
} while (false); // still runs once
```

## Switch

You may think a pattern like this:

```qc
if (x == ...) {
    ...
} else if (x == ...) {
    ...
} else if (x == ...) {
    ...
} else if (x == ...) {
    ...
} else if (x == ...) {
    ...
} ...
```
Is common, but it's not. That's because of the switch statement. The switch statement switches on a value and runs a block based off that value. There are 2 types of blocks in a switch statement: case and default.

cases run on a specific value, and look like this:
```qc
case <VALUE>:
    code
```
and default runs if no cases run.

```qc
switch (x) {
    case 1:
        ...
        break;
    case 2:
        ...
        break;
    ...
    default:
        ...
        break;
}
```
You may be confused seeing those break statements considering those are for loops: They are there because of something called fallthrough.

Fallthrough happens if there is no break at the end of the loop, and it runs the next cases code also, and you can keep falling through to the end of the switch. It can be useful though.

```qc
switch (day) {
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
        `qout("Weekday");
        break;
    default:
        `qout("Weekend");
}
```

You can repeat less code by using fallthrough.

## Quiz

{{#quiz ../quizzes/control_flow.toml}}
