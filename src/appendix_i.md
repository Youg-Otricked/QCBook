# Appendix I: EBNF

This file contains a full formal EBNF grammer for C^4.

```EBNF
binary-digit = '0' | '1' | '_' ;
octal-digit = binary-digit | '2' | '3' | '4' | '5' | '6' | '7' ;
digit = octal-digit | '8' | '9' ;
hex-digit = digit
          | 'a' | 'b' | 'c' | 'd' | 'e' | 'f'
          | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' ;
number = digit, { digit }
       | '0x', hex-digit, { hex-digit }
       | '0X', hex-digit, { hex-digit }
       | '0o', octal-digit, { octal-digit }
       | '0O', octal-digit, { octal-digit }
       | '0b', binary-digit, { binary-digit }
       | '0B', binary-digit, { binary-digit } ;
decimal = digit, { digit }, '.', digit, { digit } ;
number-literal = number, [ 'l' | 'i' | 's' | 'y' | 'n' | 'a' ]
               | decimal, [ 'f' ] ;
lowercase-letter = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j'
                 | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't'
                 | 'u' | 'v' | 'w' | 'x' | 'y' | 'z' ;

uppercase-letter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J'
                 | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T'
                 | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z' ;

letter = lowercase-letter | uppercase-letter ;

symbol-no-paren =
      '!' | '#' | '$' | '%' | '&' 
    | '*' | '+' | ',' | '-' | '.' | '/'
    | ':' | ';' | '<' | '=' | '>' | '?' | '@'
    | '[' | '\' | ']' | '^' | '_' | '`'
    | '{' | '|' | '}' | '~' ;
symbol =
      '!' | '#' | '$' | '%' | '&' | '(' | ')' 
    | '*' | '+' | ',' | '-' | '.' | '/'
    | ':' | ';' | '<' | '=' | '>' | '?' | '@'
    | '[' | '\' | ']' | '^' | '_' | '`'
    | '{' | '|' | '}' | '~' ;
any-char = ? any ASCII character, U+0000 through U+007F ? ;
no-newline-char = ? above, except no newlines allowed ? ;
ascii-chars =
      ' '
    | symbol
    | digit
    | letter
    | '\0'
    | '\a'
    | '\b'
    | '\t'
    | '\n'
    | '\v'
    | '\f'
    | '\r'
    | '\\'
    | hex-escape
    | octal-escape ;

hex-escape =
      '\x', hex-digit, hex-digit ;

octal-escape =
      '\', octal-digit, octal-digit, octal-digit ;
identifier = (letter | '_'), { letter | '_' | digit } ;

keyword =
      'int' | 'float' | 'double' | 'bool' | 'string' | 'qbool' | 'char'
    | 'long' | 'short' | 'const' | 'atomic'
    | 'case' | 'switch' | 'default'
    | 'if' | 'else'
    | 'break' | 'while' | 'loop' | 'do' | 'for' | 'continue' | 'foreach'
    | 'in' | 'unreachable'
    | 'void' | 'auto'
    | 'return' | 'function' | 'fn'
    | 'qif' | 'qelse' | 'qelif' | 'qswitch'
    | 'class' | 'struct' | 'enum' | 'type'
    | 'foreign' | 'extern'
    | 'namespace'
    | 'roperator' | 'operator'
    | 'try' | 'catch'
    | 'nullptr'
    | 'out' | 'inout' | 'volatile' | 'restrict'
    | 'byte' | 'nibble' | 'addr_t'
    | 'friend' | 'friendly' | 'static' | 'abstract' | 'final'
    | 'public' | 'protected' | 'private'
    | 'defer'
    | 'concept' | 'proves' | 'with_proof' | '_of' | 'at_least' | 'all_of'
    | 'proved_by'
    | 'modifier' | 'on_call' | 'on_return' | 'on_use' | 'comptime' ;
bool = 'true' | 'false' ;
qbool = 'qtrue' | 'qfalse' | 'both' | 'none' ;
sizeof = 'sizeof' ;
throw = 'throw' ;
string = '"', { ascii-char | '\"' | "'" }, '"' ;
char = "'", ( ascii-char | "\'" | '"' ), "'" ;
fstring = 'f"', { ascii-char | '{', ternary, '}' | '\"' | "'" }, '"' ;
rawstring = 'R"', ? a delimiter ?, '(', { any-char }, ')', ? the mirror of the previous delimiter ?, '"' ;
plus = '+' ;
increment = '++' ;
plus-eq = '+=' ;
minus = '-' ;
decrement = '--' ;
minus-eq = '-=' ;
arrow = '->' ;
mul = '*' ;
mul-eq = '*=' ;
comment = '//', { no-newline-char } ;
multiline-comment = '/*', { any-char }, '*/' ;
div-eq = '/=' ;
div = '/' ;
qeqeq = '===' ;
eq-to = '==' ;
eq = '=' ;
qneq = '!==' ;
not-eq = '!=' ;
qnot = '!!' ;
not = '!' ;
more-eq = '>=' ;
more = '>' ;
lrot-eq = '<<<=' ;
l-rot = '<<<' ;
lsh-eq = '<<=' ;
lshift = '<<' ;
less-eq = '<=' ;
less = '<' ;
lparen = '(' ;
rparen = ')' ;
lbrace = '{' ;
rbrace = '}' ;
lbracket = '[' ;
rbracket = ']' ;
mod-eq = '%=' ;
mod = '%' ;
qand = '&&&' ;
and = '&&' ;
collapse-and = '&|&' ;
bit-a-eq = '&=' ;
ampersand = '&' ;
qor = '|||' ;
or = '||' ;
collapse-or = '|&|' ;
rrot-eq = '|>>=' ;
r-rot = '|>>' ;
rsh-eq = '|>=' ;
rshift = '|>' ;
bit-o-eq = '|=' ;
pipe = '|' ;
at = '@' ;
qxor = '^^' ;
xor = '^' ;
power = '#^' ;
comma = ',' ;
scope = '::' ;
lrsh-eq = ':>=' ;
logical-rshift = ':>' ;
colon = ':' ;
semicolon = ';' ;
variadic = '...' ;
dot = '.' ;
bit-x-eq = '$=' ;
bitwise-xor = '$' ;
bitwise-not = '~' ;
question = '?' ;

(* parser *)
block = '{', { statement }, '}'
    | statement ;
qelse = 'qelse ', block ;
qelif = 'qelif (', (ternary, semicolon), expr, ') ', block ;
qif-stmt = 'qif (', (ternary, semicolon), expr, ') ', block, { qelif }, [qelse];
defer-stmt = 'defer ', block ;
else = 'else ', block ;
if-stmt = 'if (', (ternary, semicolon), expr, ') ', block, [else];
qualified-identifier = { identifier, generics, scope }, identifier, generics ;
type = qualified-identifier | keyword ;
literal = char | string | bool | qbool | number-literal | 'nullptr' | decimal | fstring | rawstring ;
generics = less, { type | literal, comma }, type | literal, more ;
catch = 'catch (', type, identifier, rparen, block ;
try-catch-stmt = 'try', block, catch ;
case = 'case ', ternary, colon, { statement } ;
default = 'default ', colon, { statement } ;
switch-stmt = 'switch', lparen, ternary, rparen, lbrace, { case }, [default], rbrace ;
qswitch-stmt = 'qswitch', lparen, ternary, rparen, lbrace, {'case ', ( 't' | 'f' | 'b' | 'n' ), colon, { statement }}, rbrace ;
loop-stmt = 'loop', block ;
dowhile-stmt = 'do ', block, 'while', lparen, ternary, rparen, semicolon ;
while-stmt = 'while', lparen, ternary, rparen, block ;
for-stmt = 'for', lparen, [ternary], semicolon, [expr], semicolon, [expr], rparen, block ; 
call = atom, [ generics ], lparen, { ternary, comma }, rparen ;
qout-expr = ternary ;
array-literal = lbracket, { ternary, comma }, rbracket 
    | lbracket, type, number-literal, rbracket ;
struct-literal = [type], lbrace, { ternary, comma }, rbrace 
    | [type], lbrace, { identifier, colon, identifier }, rbrace ;
spread = at, atom ;
indice = ternary, lbracket, number-literal, rbracket ;
propacc = ternary, (dot | arrow), ( qualified-identifier | atom ) ;
lambda = "fn", lparen, { type, identifier }, rparen, arrow, type, { type }, block ;
atom = { identifier }, [ struct-literal | array-literal | qin-expr | number-literal | literal | spread | call | indice | propacc | type | lambda | ( lparen, ternary, rparen ) ] ;
power-expr = atom { power , factor } ;
factor = (plus | minus | bitwise-not | not | qnot | ampersand | mul), ternary 
    | ( increment | decrement | sizeof | throw ), factor
    | power ;
term = factor, { ( div | mul | mod ), factor} ;
bitwise = term, { ( rshift | lshift | r-rot | l-rot | logical-rshift ), term } ;
qin-expr = "qin", rshift, bitwise, { rshift, bitwise } ;
expr = bitwise, { ( plus | minus | semicolon ), bitwise } ;

comparison = expr, "proved-by", expr 
    | expr, { ( eq-to | not-eq | less | less-eq | more | more-eq | qeqeq | qneq | qand | qor | qxor | collapse-and | collapse-or ), expr } ; 
logical-and = comparison, { ( and | ampersand ) comparison } ;
logical-or = logical-and, { ( or | xor | pipe | bitwise-xor ) logical-and } ;
ternary = logical-or, [ question, ternary, colon, ternary ] ;
assignment-expr = ternary { ( eq | plus-eq | minus-eq | mul-eq | div-eq | mod-eq | rsh-eq | lsh-eq | lrsh-eq | rrot-eq | lrot-eq | bit-x-eq | bit-o-eq | bit-a-eq), ternary } ;
return-stmt = "return", semicolon 
    | "return", ternary, { comma, ternary }, semicolon ;
decl-identifier = identifier, [ generic-decl ] ;
generic-decl = less, { identifier, [ lparen, [ "proves", ( type | { (and | or | not) type } ) | type ], colon, [ not ], type, { pipe, type } }, more ;
func-def = type, { type }, decl-identifier, lparen, { type, identifier }, rparen, block ;
extern = "extern", colon, { statement }, colon, "extern" ;
foreign = "foreign", colon, { statement }, colon, "foreign" ;
operator-decl-identifier = decl-identifier | ( "operator" | "roperator" ), symbol-no-paren, { symbol-no-paren } ; 
method-def = type, { type }, operator-decl-identifier, lparen, { type, identifier }, rparen, block ;
foreach-stmt = "foreach", lparen, type, identifier, "in", qualified-identifier, rparen, block ;
class-def = ["abstract"], ["final"], "class", decl-identifier, [ colon, qualified-identifier ], lbrace, { 
    method-def
        | type, identifier 
        | decl-identifier, [ colon, call ], lparen, { type, identifier }, rparen, block 
        | "friend", qualified-identifier
        | "friendly", qualified-identifier
}, rbrace, [ semicolon ] ;
namespace-def = "namespace", identifier, lbrace, { statement }, rbrace ;
struct-def = "struct", decl-identifier, lbrace, { type, identifier }, rbrace ;
union-def = "type", decl-identifier, eq, type, { pipe, type } ;
enum-def = "enum", identifier, [ colon, type ], lbrace, { identifier, [ eq, number-literal ] }, rbrace ;
concept-block = ( "all_of" | ["at_least"], digit, { digit }, "_of" ), [ lparen, { type, identifier }, rparen ], { method-def | expr | block }
concept-def = "concept", decl-identifier, lbrace, { concept-block }, rbrace ;
modifier-def = "modifier", identifier, lbrace, { ( 'on_call' | 'on_return' | 'on_use' ), block }, rbrace ;
var-decl = type, identifier, [ eq, ternary ] ;
multi-var-decl = type, identifier, { type, identifier }, eq, ternary ;
statement = [ block | extern | foreign | lambda | [ "comptime" ] if-stmt | defer-stmt | try-catch-stmt | qif-stmt | switch-stmt | qswitch-stmt | while-stmt | for-stmt |
    dowhile-stmt | loop-stmt | foreach-stmt | "continue" | return-stmt | "break" | "unreachable" | func-def | var-decl | multi-var-decl | assignment-expr | ternary ], semicolon
    | struct-def
    | union-def
    | class-def
    | enum-def
    | namespace-def
    | modifier-def
    | concept-def;
}
entry = { statement } ;
```

Note: This grammar describes the current implementation and may become outdated as C^4 evolves. It may also contain inaccuracies or omissions.
