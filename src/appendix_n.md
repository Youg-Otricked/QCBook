# Contributing

If you want to contribute to C^4, fork the repository, make your changes, and open a pull request.

## Commit Syntax

Commits should follow this format:

```text
category(thing): message
```

Available categories:

```text
improve       Improvements to existing functionality
feat          New functionality or language features
clean         Code cleanup, refactoring, or technical debt
errors        Changes to diagnostics, warnings, or error handling / adding more errors, warnings, notes, help, suggestions, etc
fix           Bug fixes
todo          Something to do before this PR is merged. (Must be part of another commit)
finish        Finished a todo.
feat::partial Partiallly finished, similar to todo, but active work/50% done. Finish should also be used on this.
remove        Delete a feature. More narrow clean
rev           Revision on previous commit/todo/partial, not done yet
oops          Forgot to add to previous commit
change        An actual change, not a improvment or a new feature. e.g. changing a syntax. Can have an additional too, such as change(x, y)
feat::minor   Minor feature / QOL improvment, not neccesarily a full featutre
```

For example:

```text
feat(parser, compiler): add modifier support
errors(warnings, diagnostics, help, suggestions): add help suggestions to warnings
clean(compiler): simplify type checking
fix(codegen): handle missing returns in main
improve(lexer): reduce tokenization overhead
feat::partial(install): mostly finished install script
```

If your commit is about multiple catagorys, comma-seperate.

```text
errors(warnings),feat(cli-flags): added warnings & -W flags
```

Finish syntax is:

```text
finish(catagory(commit)::named)
```

if the catagory is todo, parens can be ommited, commit can be ommited. For example:

```text
finish(feat::partial(HEAD~1)::install)
```

if your commit thing is a stdlib improvment, prefix it with `std::`

```text
feat(std::Vector):...
```

if your commit is a breaking change, put a ! between the topic and the ( for each breaking change, such as

```text
clean!(string),change!(unions): ...
```

But at least make your commits sensical. Unlike mine

```commit
FINALLY IM DONE WHY DID THAT TAKE 5 DAYS AAGHAGAHGAH IT WORKS
```

Please don't.
