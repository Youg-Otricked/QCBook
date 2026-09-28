# Optimization

LLVM optimizes your code for you too. It will trim unused LLVM, make your bad slow code faster, and make every faster when possible. You can edit how much LLVM optimizes your code with `O` flags. Theirs `-O0` which means don't optimize at all, `-O1` which is optimize a bit, `-O2` which is the default and means a medium amount of optimization, `-O3` which means optimize as much as possible, and `-Oz` which means try and make the binary as small as possible.
