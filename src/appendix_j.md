# Appendix J: APIer? I don't even know how it works!

## Package/API Structure

Really, there are 3 ways to structure packages.

1. Many many files that each have one namespace and add sub namespaces, e.g.
```qc
======file.a.qc======
namespace myFile {
    namespace Types {
        ...
    }
}
======file.b.qc======
namespace myFile {
    namespace Values {
        ...
    }
}
=====================
```
Then you include specific subnamespaces from specific files.

2. One massive monolithic file with one big namespace and many sub namespaces
```qc
======lib.qc======
namespace myLib {
    namespace Core {
        ...
    }
    namespace Sub {
        ...
    }
    ...
}
=================
```
Then you include specific subnamespaces from this one file.

3. Many small files with various namespaces
```qc
======lib.core.qc======
namespace Core {
    ...
}
======lib.bonus.qc====
namespace Bonus {
    ...
}
======================
```
Then you include various things from the different files.

Personally, I like the first 2 styles, and sometimes when making the first approach, you make a core.qc file or something that includes all the most basic core parts so
you can just include core.qc as a dummy file and get includes as a sideeffect.

Remember the naming conventions: The namespaces get the descriptive names.
Prefer verb_names for methods and data operations, and noun-names for things that should be treated as constants, such as:

```qc
void removeFile(...)...

DataLayout *datalayout() {
...
}
```

## Memory & Resource Contracts

If not using `Owned::Owned`, above your function make sure to put doc comments (see [Documentation Guidelines](#documentation-guidelines).

## nullptr, errors as values, sentinels, or throw?

Return nullptr IF:
- You are a function creating something.
- You explicitly document it and are returning a pointer anyways.

Use errors-as-values IF:
- You prefer them to throw
- You are dealing with a common place error (invalid input, etc)
- Or inplace of `throw` if you like them more.

Use sentinels IF:
- You are doing operations that return numbers and the sentinel is obviously a bad value.
- Simpler operations where the other options would be overkill.

Use throw IF:
- You prefer it to errors-as-values
- You are dealing with a error where the code would have crashed (such as out-of-bounds indice)
- Or inplace of errors-as-values if you like trycatch more.

## Documentation Guidelines

As you saw in the style guide, doc comments are `///`. For multi-line doc comments you can either use a ton of those, or `/** ... */`.
The format is this:
```qc
/// @summary Summary of your function here.
/// @param my_param What your param is here.
/// @param my_other_param More params, each on new lines.
/// @return What the function returns.
/// @return Next return value. Each on new lines.
/// @note Notes that might not be obvious. Separate lines when different things are covered.
/// @inval things_to_inval
```
e.g.
```qc    
/// @summary Parses an SQL query string into an AST.
/// @param query The raw SQL string to parse.
/// @return A heap pointer to the root QueryNode. Caller owns the pointer.
/// @note inval query is NOT triggered; the input string remains untouched.
```

## Extensibility & Stability

Structs are `POD` in C^4. So when do I use them over classes?

1. When you aren't trying to encapsulize. If you aren't trying to encapsulize, think if you like the code better when it uses struct-style imperative functions or OOP-style with methods.
2. When the class is small-ish.

If using structs, make sure to pair your API!

By that, I mean let's say you provide `create_MYSTRUCT`: SUPPLY A `delete_MYSTRUCT` FOR THE LOVE OF ALL THAT IS GOOD.

### How to deprecate and evolve

Deprecation aint easy. You can't just:
```bash
rm -rf old.qc
nvim new.qc
git add -A
git commit -m "Sucks to suck, losers"
git push --force
```
Well, you can... But you shouldn't.

When deprecating any API, make sure to put a notice in the function, and also say what it will be migrated to or what to change the code to if the new function already exists.

When you are changing a signature, you can do a similar thing, except you can also edit the doc comments like this:

```qc
/// $change
/// @add-param ...
/// @add-return ...
/// @note ...
...
```

After your doc comment to show what you are changing.

Always allow at least one minor/moderate version of headway before changing cold-turkey.
