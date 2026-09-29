# Concepts

Concepts are compile-time-only validation. They are validated at compile time and compile your additional functions.

You may think "But then how do the expressions in concepts work"?

I just compile them and then delete them. If a error happens, then it errored.

## Design Commentary: Why this syntax?

I designed concepts like this because I liked the idea of a concept being fully graphable, and whenever I think of the word `proof`, as you don't "require" a concept, you `prove` it. Concepts are always abstract, which is why I designed the syntax with these little chunks that depend on each other.
