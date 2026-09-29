# Appendix K: Compatibility and Version History

## Versioning Scheme

QuarticC uses the following versioning scheme:
`cMa.Mo.MiP`
, where `c` is critical, for massive additions, such as the compiler being added, `Ma` being major versions, tracking large collections of features, `Mo` being moderate versions, tracking collections of similar features, `Mi` being minor versions, which track individual feature milestones within the current moderate version's theme, and `P` being the patch version. 
For the version
`x1.2.34`
`c` = `x`
`Ma` = `1`
`Mo` = `2`
`Mi` = `3`
`P` = `4`

P is omitted if it is 0.
Critical versions represent the largest generational milestones in QuarticC's development.

v = Interpreter
x = Compiler (Current)
f = Feature-complete compiler
s = Self-hosted compiler

Critical versions are intentionally rare and denote architectural milestones,
not language features.

Development toward future critical versions may begin before the current
critical version is complete. Multiple critical generations may therefore
be in development simultaneously.

Minor (Mi) is always a single decimal digit (0-9). Once a minor version reaches 9, the next release increments the moderate version instead.

Unlike semantic versioning, QuarticC versions describe the scale and category of language evolution rather than API compatibility.

## Deprecation

Now that C^4 is in version x1.0+, deprecations will be documented and have warnings. Specifically:

1. All code within the same _Moderate_ version will work with each other (assuming the code compiles)
2. Intended deprecations will have at LEAST 1 _Moderate_ version of notice before becoming fully deprecated
3. Major versions are no-mans-land, and no feature is protected between major versions.

There's a predefined macro for the current version: `__quarticc`
## ABI

A C-ish ABI is used. The C ABI is followed except for pass-by-value structs becoming pointers if large enough. Names are C-compatible, using absolutely zero name mangling.

```qc
namespace X {
    T Y<T>() {
        ...
    }
}
X::Y<int>();
```

The int specialization of X::Y is defined as:
```llvm 
define i32 @"X::Y<int>"() {
    ...
}
```

## Changelog and Migration Notes (over time)

###### This changelog may not be up-to-date
###### These are only to my recolection



1. 1/28/26: Changed power operator from `**` to `^*`
2. IO overhauled. Changed input and output syntax.
3. Power operator changed from `^*` to `#^`.
4. Intriniscs changed to start with a backtick.
5. This changed to a pointer. 
6. Major enum syntax full overhaul.
