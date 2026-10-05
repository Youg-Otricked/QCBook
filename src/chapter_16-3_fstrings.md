# FStrings

FStrings are just formatted strings. You put braces in your strings, and expressions in those braces, and they are concattenated with the string.

```qc
f"Hello, {name}. You are {`to_int(age)} years old."
```

Is equivelent to:

```qc
"Hello, " + name + ". You are " _ `to_string(`to_int(age)) + " years old."
```

> ![using namespace std;](./images/bad.png) Using fstrings everywhere is a bad practice. Try to only use them when you have seriously heavy concattenation.
