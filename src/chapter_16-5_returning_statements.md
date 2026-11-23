# Statement Expressions

That's a kinda contradictary title... right? Statements don't make values:
```qc
int x = 0;
```
And expressions do.
```qc
x
```
Statements end in a semicolon and expressions don't. Expressions can be subparts of other statements and expressions. A statement can't be a expression.





Well....

In C^4, there are six statement expressions, each being expression forms of control flow. Those being:

- Returning While
- Returning For 
- Returning Do While
- Returning Foreach 
- Returning Loop
- Returning Match

## Returning Loops

All returning loops have the following format: A loop, followed by "returning" then a type, and then after the ending brace, parenthesis with a expression that will be evaluated for the default if no break produces a value.

Breaks can produce values in returning loops, like this:

```qc
break 123;
```

Other than do while, where the returning goes after the ) in the `while`.

```qc 
int x = do {
...
} while (...) returning int(123);
```

## Returning Match 

As `match` is exhaustive, there is no fallback expression. You just put `returning` then the type before the opening brace, and that's all that's needed.
In returning `match`, the value produced by the final expression is considered the value for the stmt.


