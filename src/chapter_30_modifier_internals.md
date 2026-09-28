# Modifier Internals

Modifiers also are simple. When you call a modfiered function, you actually call the modifiers monomorphised on call. Then the on_call gets a define proceed that calls on_return(thefunction(args)). That's it.

## Design Commentary: Why do these exist?

Modifiers exist because my own laziness. I don't want to bloat my language with 500 different keywords. `async`, `await`, `yield`, `nothrow`, `noreturn`, `optional`, `logging`, and that nonsense. Modifiers allowed me to code one feature then my standard library and other peoples code can do it for me.
