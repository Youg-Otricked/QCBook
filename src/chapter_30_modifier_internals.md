# Misc 2 Internals 

## Function Pointers

Functions == Addresses. Pointers == Addresses. That's it. Functions are labels + conventions in asm, labels are code addresses, addresses are pointers.

## Statement Expressions

LLVM PHIs. They just add edges to the phi every break.

## Modifier Internals

Modifiers also are simple. When you call a modfiered function, you actually call the modifiers monomorphised on call. Then the on_call gets a define proceed that calls on_return(thefunction(args)). That's it.

### Design Commentary: Why do these exist?

Modifiers exist because my own laziness. I don't want to bloat my language with 500 different keywords. `async`, `await`, `yield`, `nothrow`, `noreturn`, `optional`, `logging`, and that nonsense. Modifiers allowed me to code one feature then my standard library and other peoples code can do it for me.

## Patterns

Patterns are just compile time verification. Fits statements literally just become functions. Like this:
```qc
define weak_odr %P @__user_qc_fits_C_P(ptr %self) !qc.return_types !39 {
entry:
  store ptr %self, ptr @self.35, align 8
  br label %fits.case.N

fits.nomatch:                                     ; No predecessors!
  ret %P { i32 -1, [4 x i8] zeroinitializer, [4 x i8] zeroinitializer }

fits.case.N:                                      ; preds = %entry
  store %P zeroinitializer, ptr @fits.res.36, align 4
  store i32 0, ptr @fits.res.36, align 4
  %0 = load %P, ptr @fits.res.36, align 4
  ret %P %0
}
```

### Design Commentary: What about these?

Patterns exist because they push even closer to letting user types feel native. They allow user defined integers, for example, to behave like real types. They also allow you to not need to access or even add a enum field to a class, or expose it to public code.
The syntax looks like this as it's inspired by a mathmatical cases block. All of my compile-time-only verification types are intended to look like mathmatical statements, which is also why concepts look like that.
