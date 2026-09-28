# Enums & Unions

New chapter, who dis

This chapter covers:
- Enums: a way to define a fixed set of named (hopefully) related constants (instead of 50 `const int`s and saying this is fine while your computer and house burns down around you).
- Aliases: giving an existing type an extra name (This is useful later on when generics come around so you don't need to type `X<Y<Y<Y<Y<Y<Y<Y<Y<Y<Y<Z>>>>>>>>>>>` more than once).
- Unions: values that can be more than one type, without using the uno wild card that is `void *`.

> Memory internals of enums and unions (how they're laid out, what `extract` is actually doing under the hood) will be covered in the revisiting chapters.
