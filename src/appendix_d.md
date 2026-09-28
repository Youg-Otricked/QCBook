# Appendix D: Operators/Symbols

This appendix contains a glossary of C^4’s operators and other symbols
## Operators

Table B1 contains the operators in C^4, an example of how the operator would appear in context, a short explanation, and whether that operator is overloadable. If an operator is overloadable, the method name and parameters it would be called with are shown.

Table B1

| Operator | Example                  | Explanation                   | Overloadable?          | RHS Overloadable?    |
| -------- | ------------------------ | ----------------------------- | ---------------------- | -------------------- |
| `!`      | `!expr`                  | Logical NOT                   | `operator!()`          |                      |
| `!=`     | `expr != expr`           | Inequality operator           | `operator!=(other)`    |                      |
| `~`      | `~expr`                  | Bitwise NOT                   | `operator~()`          |                      |
| `%`      | `expr % expr`            | Modulo                        | `operator%(rhs)`       | `roperator%(lhs)`    |
| `%=`     | `lval %= expr`           | Modulus + Assignment          | `operator%=(other)`    |                      |
| `&`      | `&lval`                  | Get address of a lval         |                        |                      |
| `&`      | `expr & expr`            | Bitwise AND                   | `operator&(rhs)`       |                      |
| `&=`     | `lval &= expr`           | Bitwise AND + Assignment      | `operator&=(other)`    |                      |
| `&&`     | `expr && expr`           | Logical AND                   | `operator&&(rhs)`      |                      |
| `*`      | `expr * expr`            | Multiplication                | `operator*(rhs)`       |                      |
| `*=`     | `lval *= expr`           | Multiplication + Assignment   | `operator*=(other)`    |                      |
| `*`      | `*expr`                  | Dereference                   |                        |                      |
| `*`      | `type*`                  | Pointer                       |                        |                      |
| `+`      | `expr + expr`            | Addition                      | `operator+(rhs)`       |                      |
| `+=`     | `lval += expr`           | Addition + Assignment         | `operator+=(other)`    |                      |
| `++`     | `++expr`, `expr++`       | Increment                     | `operator++()`         |                      |
| `,`      | `expr, expr`             | Argument separator            |                        |                      |
| `-`      | `-expr`                  | Negation                      | `operator-()`          |                      |
| `-`      | `expr - expr`            | Subtraction                   | `operator-(rhs)`       | `roperator-(lhs)`    |
| `-=`     | `lval -= expr`           | Subtraction + Assignment      | `operator-=(other)`    |                      |
| `--`     | `--expr`, `expr--`       | Decrement                     | `operator--()`         |                      |
| `->`     | `fn(...) -> type`        | Lambda return type            |                        |                      |
| `->`     | `expr->ident`            | Dereference + Property access |                        |                      |
| `.`      | `expr.ident`             | Property access               |                        |                      |
| `.`      | `expr.ident(expr, ...)`  | Method call                   |                        |                      |
| `->`     | `expr->ident(expr, ...)` | Dereference + Method call     |                        |                      |
| `/`      | `expr / expr`            | Division                      | `operator/(rhs)`       | `roperator/(lhs)`    |
| `/=`     | `lval / expr`            | Division + Assignment         | `operator/=(other)`    |                      |
| `:`      | `ident: expr`            | Struct field initializer      |                        |                      |
| `::`     | `ident::ident`           | Namespace Path Seperator      |                        |                      |
| `;`      | `expr;`                  | Statement and item terminator |                        |                      |
| `<<`     | `expr << expr`           | Left-shift                    | `operator<<(rhs)`      | `roperator<<(lhs)`   |
| `<<=`    | `lval <<= expr`          | Left-shift + Assignment       | `operator<<=(other)`   |                      |
| `<<<`    | `expr <<< expr`          | Left-Rotation                 | `operator<<<(rhs)`     | `roperator<<<(lhs)`  |
| `<<<=`   | `lval <<<= expr`         | Left-Rotation + Assignment    | `operator<<<=(other)`  |                      |
| `<`      | `expr < expr`            | Less than                     | `operator<(other)`     |                      |
| `<=`     | `expr <= expr`           | Less than or equal to         | `operator<=(other)`    |                      |
| `=`      | `lval = expr`            | Assignment                    | `operator=(other)`     |                      |
| `==`     | `expr == expr`           | Equality                      | `operator==(other)`    |                      |
| `>`      | `expr > expr`            | Greater than                  | `operator>(other)`     |                      |
| `>=`     | `expr >= expr`           | Greater than or equal to      | `operator>=(other)`    |                      |
| `\|>`    | `expr \|> expr`          | Right-shift                   | `operator\|>(rhs)`     | `roperator\|>(lhs)`  |
| `:>`     | `expr :> expr`           | Logical rshift                | `operator:>(rhs)`      | `roperator:>(lhs)`   |
| `:>=`    | `lval :>= expr`          | Logical rshift + Assignment   | `operator:>=(other)`   |                      |
| `\|>=`   | `lval \|>= expr`         | Right-shift + Assignment      | `operator\|>=(other)`  |                      |
| `\|>>`   | `expr \|>> expr`         | Right-rotation                | `operator\|>>(rhs)`    | `roperator\|>>(lhs)` |
| `\|>>=`  | `lval \|>>= expr`        | Right-rotation + Assignment   | `operator\|>>=(other)` |                      |
| `@`      | `[@collection]`          | Spread in an array            |                        |                      |
| `$`      | `expr $ expr`            | Bitwise XOR                   | `operator$(rhs)`       |                      |
| `$=`     | `lval $= expr`           | Bitwise XOR + Assignment      | `operator$=(other)`    |                      |
| `\|`     | `expr \| expr`           | Bitwise OR                    | `operator\|(rhs)`      |                      |
| `\|=`    | `lval \|= expr`          | Bitwise OR + Assignment       | `operator\|=(other)`   |                      |
| `\|\|`   | `expr \|\| expr`         | Logical OR                    | `operator\|\|(rhs)`    |                      |
| `^`      | `expr ^ expr`            | Logical XOR                   | `operator^(rhs)`       |                      |
| `#^`     | `expr #^ expr`           | Power                         | `operator#^(rhs)`      | `roperator#^(lhs)`   |
| `()`     | `expr(args...)`          | Function/Method Call          | `operator()(...)`      |                      |
| `?:`     | `condition ? a : b`      | Ternary                       |                        |                      |
| `...`    | `...args`                | Variadic args                 |                        |                      |
| `!!`     | `!!expr`                 | QBOOL NOT                     | `operator!!()`         |                      |
| `&&&`    | `expr &&& expr`          | QBOOL AND                     | `operator&&&(rhs)`     |                      |
| `\|\|\|` | `expr \|\|\| expr`       | QBOOL OR                      | `operator\|\|\|(rhs)`  |                      |
| `^^`     | `expr ^^ expr`           | QBOOL XOR                     | `operator^^(rhs)`      |                      |
| `\|&\|`  | `expr \|&\| expr`        | QBOOL collapse OR             | `operator\|&\|(rhs)`   |                      |
| `&\|&`   | `expr &\|& expr`         | QBOOL collapse AND            | `operator&\|&(rhs)`    |                      |

### Non-operator Symbols

The following tables contain all symbols that don’t function as operators.
Table B-2 shows symbols that appear on their own and are valid in a variety of locations.

Table B-2: Stand-alone Syntax

| Symbol                                                           | Explanation                                                  |
| ---------------------------------------------------------------- | ------------------------------------------------------------ |
| Digits                                                           | Numeric literal                                              |
| Digits                                                           | immediately followed by y, i, f, a and so on Numeric literal |
| Digits                                                           | prefixed with 0x/0b/0o/0X/0B/0O Hex/Binary/Octal literal     |
| `"..."`                                                          | String literal                                               |
| `R"(...)"`, `R"(...)"`, `R"(<...>)"`, `R"({<[...]>})"` and so on | Raw string literal; escape characters not processed          |
| `'.'`                                                            | Character literal                                            |
| `fn(argtype argname, ...) -> rettype { code }`                   | Lambda                                                       |
| `_`                                                              | "Ignored" variable, integer seperator literals readable      |

Table B-3 shows symbols that appear in the context of generics.

Table B-3: Generics
| Symbol                                  | Explanation                                                                     |
| --------------------------------------- | ------------------------------------------------------------------------------- |
| `path<...>`                             | Specifies parameters to a generic type/method/function, e.g. `Vector::Vec<int>` |
| `RETURN_TYPE ident<...>(args...) {...}` | Define generic function/method                                                  |
| `struct ident<...> ...`                 | Define generic struct                                                           |
| `enum ident<...> ...`                   | Define generic enum                                                             |
| `class ident<...> ...`                  | Define generic class                                                            |
| `type ident<...> = ...`                 | Define generic alias/union                                                      |
| `concept ident<...> ...`                | Define generic concept                                                          |

Table B-5 shows symbols that appear in the context of constraining generic type parameters.

Table B-5: Type Constraints
| Symbol | Explanation |
| ------ | ----------- |
| `T(proves U:)` | Generic parameter T constrained to types that prove U |
| `T(:int|string)` | Generic parameter T must be a int or a string |
| `T(:!int|string)` | Generic parameter T may not be int or string |
| `T(proves X && Y)` | Combining concepts |
| `T(proves U:!int)` | Generic parameter T must both not be a int and prove U |

Table B-6 shows symbols that create comments.

Table B-6: Comments
| Symbol	| Explanation   |
| ------ | ----------- |
| `//`      | Line comment  |
| `/*...*/` | Block comment |

Table B-8 shows the contexts in which parentheses are used.

Table B-8: Parentheses
| Symbol | Explanation |
| ------ | ----------- |
| `(expr)` | Parenthesized expression |
| `expr(expr, ...)`	| Function/method call expression | 

Table B-9 shows the contexts in which curly brackets are used.

Table B-9: Curly Brackets
| Context | Explanation |
| ------- | ----------- |
| `{...}`	  | Block expression |
| `Type{...}` | Struct literal |

Table B-10 shows the contexts in which square brackets are used.

Table B-10: Square Brackets
| Context | Explanation |
| ------- | ----------- |
| `[...]` | Array literal |
| `[type, len]` | Empty array literal containing len 0-initialized `type`s |
| `expr[expr]`	| Collection indexing; overloadable (`operator[](index)`) |
| Array Assign | Assigning with a array. Overloadable (`operator[]=(coll, len)`) |
