# STDRef

Currently, the standard library is rather small, with only 15 namespaces.

1. [CoreConcepts](#CoreConcepts).
   This contains concepts for everything else to use, those being `Eq` (`operator==`), and `Allocated` (`_destroy`).
2. [Array](#Array).
   A constant-size array.
3. [Vector](#Vector).
   A dynamic array.
4. [List](#List).
   A linked list.
5. [Utils](#Utils).
   Basic utility functions.
6. [Math](#Math).
   Math intrinsics.
7. [OSInterop](#OSInterop).
   Operating-system interaction.
8. [Pair](#Pair).
   Pair of 2 items.
9. [Optional](#Optional).
   Optional value.
10. [Span](#Span).
    Like an array, but does not own the memory.
11. [Unordered](#Unordered).
    Hash-based Map and Set.
12. [String](#String)
    String.
13. [Owned](#Owned)
    A owned value marker
14. [Errors](#Errors)
    Error values.
15. [IO](#IO)
    Input and Output functions.

# CoreConcepts

## `Eq`

```qc
concept Eq {
    1_of {
        bool operator==(Self other);
        bool operator==(Self self, Self other);
    }
}
```

Concept requiring `operator==`.

## `Allocated`

```qc
concept Allocated {
    at_least 1_of {
        void _destroy();
        void _destroy(Self self);
    }
}
```

Concept requiring `_destory`.

# Array

## `Iterator`

### `It<T>`

```qc
It(T* data, int size, bool is_end)
bool _atEnd()
T _next()
bool _atStart()
T _prev()
void _moveTo(int index)
```

## `Arr<T, int S = 0>`

A fixed-size array containing `S` elements of type `T`.

```qc
Arr()
```

Creates an empty array.

```qc
void operator[]=(T* data, int length)
T& operator[](int index)
Iterator::It<T> _begin()
Iterator::It<T> _end()
void _destroy()
Arr<T, S>& operator=(Arr<T, S> other)
```

# Vector

## `Iterator`

### `It<T>`

```qc
It(T* data, int size, bool is_end)
bool _atEnd()
T _next()
bool _atStart()
T _prev()
void _moveTo(int index)
```

## `Vec<T>`

A dynamically sized array.

```qc
Vec()
```

```qc
void reserve(int cap)
```

Allocates enough storage for at least `cap` elements without changing the vector's length.

```qc
void push(T value)
```

Adds an element to the end of the vector, increasing its capacity if necessary.

```qc
int length()
```

Returns the current number of elements in the vector.

```qc
void pop()
```

Removes the last element from the vector.

```qc
void shrinkToFit()
```

Reduces the vector's allocated capacity to match its current length.

```qc
void operator[]=(T* data, int length)
T& operator[](int index)
Iterator::It<T> _begin()
Iterator::It<T> _end()
void _destroy()
Vec<T>& operator=(Vec<T> other)
```

```qc
bool isEmpty()
```

Returns `true` if the vector contains no elements.

# List

## `Node<T>`

The internal node used by a linked list.

```qc
T value;
Node<T>* next;
```

Stores an element and a pointer to the next node.

## `Iterator`

### `It<T>`

```qc
It(Node<T>* node)
bool _atEnd()
T _next()
bool _atStart()
T _prev()
```

## `List<T>`

A doubly-ended linked list.

```qc
List()
```

Creates an empty list.

```qc
bool isEmpty()
```

Returns `true` if the list contains no elements.

```qc
T front()
```

Returns the first element in the list.

```qc
T back()
```

Returns the last element in the list.

```qc
void pushFront(T value)
```

Adds an element to the beginning of the list.

```qc
void pushBack(T value)
```

Adds an element to the end of the list.

```qc
void popFront()
```

Removes the first element from the list.

```qc
void popBack()
```

Removes the last element from the list.

```qc
void clear()
```

Removes every element from the list.

```qc
bool contains(T value)
```

Returns whether the list contains the specified value.

```qc
Iterator::It<T> _begin()
Iterator::It<T> _end()
void _destroy()
T& operator[](int index)
void operator[]=(T* data, int length)
List<T>& operator=(List<T> other)
```

# Utils

General-purpose utility functions.

```qc
Vector::Vec<int> range(int start, int stop, int step = 1)
```

Creates a vector containing a range of integers from `start` toward `stop`, incrementing by `step`.

```qc
volatile void sleep(long int milliseconds)
```

Sleeps for milliseconds milliseconds.

# Math

Mathematical constants and functions.

```qc
double e()
```

Returns Euler's number, approximately `2.71828`.

```qc
double pi()
```

Returns π, approximately `3.14159`.

```qc
type Number = ...;
```

Number types.

```qc
Number max(Number a, Number b)
```

Returns the larger of two numbers.

```qc
Number min(Number a, Number b)
```

Returns the smaller of two numbers.

```qc
Number sqrt(Number val)
```

Returns the square root of a number.

```qc
Number root(Number val, Number power)
```

Returns the specified root of a number.

```qc
type Floating = float | double;
```

Decimal numbers.

```qc
int ceil(Floating a)
```

Rounds a floating-point value upward to the nearest integer.

```qc
int floor(Floating a)
```

Rounds a floating-point value downward to the nearest integer.

```qc
Number abs(Number a)
```

Returns the absolute value of a number.

```qc
double sin(double x)
```

Returns the sine of `x`.

```qc
double cos(double x)
```

Returns the cosine of `x`.

```qc
double tan(double x)
```

Returns the tangent of `x`.

```qc
Errors::Error<double> log(double x)
```

Returns the logarithm of `x`, or Errors::Codes.InvalidArgument if x is < 0.

# OSInterop

```qc
void system(char* command)
```

Executes the supplied command using the operating system's command interpreter.

# Pair

## `Pair<A, B>`

A structure containing two values.

```qc
A first;
B second;
```

The first and second values stored in the pair.

## `makePair`

```qc
Pair<A, B> makePair<A, B>(A first, B second)
```

Creates and returns a `Pair` containing the two supplied values.

# Optional

## `Option<T>`

Represents a value that may or may not exist.

```qc
bool has_value;
```

Indicates whether the option currently contains a value.

```qc
Option()
```

Creates an empty option with no value.

```qc
Option(T value)
```

Creates an option containing the supplied value.

```qc
T& value()
```

Returns a reference to the contained value and throws if no value exists.

```qc
bool safeGet(T& output)
```

Copies the contained value into `output` if one exists and returns whether the operation succeeded.

```qc
void setValue(T& val)
```

Sets the option's value and marks it as containing a value.

```qc
void removeValue()
```

Removes the contained value and marks the option as empty.

# Span

A non-owning "view" over a contiguous section of memory.

## `Iterator`

### `It<T>`

```qc
It(T* data, int size, bool is_end)
bool _atEnd()
T _next()
bool _atStart()
T _prev()
void _moveTo(int index)
```

## `Span<T>`

A non-owning view of an array of `T`.

```qc
T& operator[](int index)
```

```qc
Span()
```

Creates an empty span.

```qc
void operator[]=(T *data, int length)
Iterator::It<T> _begin()
Iterator::It<T> _end()
```

# Unordered

Hash-based containers.

## `Hash`

```qc
concept Hash {
    1_of {
        addr_t hash();
        addr_t hash(Self self);
    }
}
```

A concept requiring a type to provide a hash function. You must provide a hash for types you use. Even primitives.

## `SetNode<T>`

Internal node used by `Set`.

```qc
T value;
SetNode<T>* next;
```

Stores a set value and the next node in its bucket.

## `MapNode<K, V>`

Internal node used by `Map`.

```qc
Pair::Pair<K, V> data;
MapNode<K, V>* next;
```

Stores a key-value pair and the next node in its bucket.

## `Iterators`

Iterators for unordered containers.

### `MapIt<K, V>`

```qc
MapIt(MapNode<K, V>** buckets, int num_buckets, bool is_end)
bool _atEnd()
Pair::Pair<K, V>& _next()
```

### `SetIt<T>`

```qc
SetIt(SetNode<T>** buckets, int num_buckets, bool is_end)
bool _atEnd()
T _next()
```

## `Set<T(proves Hash:)>`

A hash-based collection containing unique values.

```qc
Set()
void operator[]=(T *data, int length)
```

```qc
bool contains(T item)
```

Returns whether the specified item exists in the set.

```qc
void add(T item)
```

Adds an item to the set.

```qc
void _destroy()
Iterators::SetIt<T> _begin()
Iterators::SetIt<T> _end()
```

## `Map<K(proves Hash:), V>`

A hash-based key-value container.

```qc
Map()
```

Creates an empty map.

```qc
bool containsKey(K key)
```

Returns whether the map contains the specified key.

```qc
bool safeGet(K key, V& output)
```

Copies the value associated with `key` into `output` if the key exists and returns whether the operation succeeded.

```qc
void set(K key, V value)
```

Adds or updates the value associated with a key.

```qc
void _destroy()
void operator[]=(Pair::Pair<K, V> *data, int length)
```

```qc
V& operator[](K key)
```

Returns a reference to the value associated with `key`. Throws if not found.

```qc
Iterators::MapIt<K, V> _begin()
Iterators::MapIt<K, V> _end()
```

# String

## `struct View {`

```qc
        char *data;
        addr_t length;
```

Data and length of the view. Views do not own data ever.

## `class Str {`

```qc
static addr_t NOT_FOUND = ~(0a);
```

Sentinal used for a value not being found.

```qc
Str(char *data) {
```

Creates a string from a char*.

```qc
Str(addr_t copies, char letter) {
```

Creates a string with copies copies of letter.

```qc
Str(char *data, addr_t length) {
```

Takes ownership of and creates a string from a char * and a length.

```qc
Str operator=(char* data) {
```

Reassign. Invali strings old data. Str now owns data.

```qc
Str substr(addr_t start, addr_t length) {
```

Returns a new string of the data from start to length. Caller owns.

```qc
View subView(addr_t start, addr_t length) {
```

Returns a View of the data from start to length. View does not own.

```qc
addr_t find(Str other, addr_t offset = 0) {
```

Find the substring other starting from offset. Returns NOT_FOUND if it is not in the string. Otherwise returns the start index of the substring.

```qc
bool contains(Str other) {
```

Returns true if the string contains other.

```qc
bool startsWith(Str other) {
```

Returns true if the string starts with other.

```qc
bool endsWith(Str other) {
```

Returns true if the string ends with other.

```qc
bool isEmpty() {
```

Returns true if the string is empty.

```qc
bool operator==(Str other) {
```

Returns true if the string equals another string.

```qc
bool operator!=(Str other) {
```

Returns true if the string doesn't equal another string.

```qc
bool _eval() {
```

Returns true if the string is not empty.

```qc
Str operator+(Str other) {
```

Returns a new string resulting in the concatenation of this and other. Caller owns the new string. No string is invalidated.

```qc
Str operator+=(Str other) {
```

Reallocates and concatenates this with other. Inval data of this, returns this.

```qc
char& operator[](addr_t index) {
```

Index strings data.

```qc
void _destroy() {
```

Deallocate.

```qc
void insert(addr_t index, Str str) {
```

Inserts str at index.

```qc
void erase(addr_t start, addr_t length) {
```

Removes length chars from start.

```qc
T toInteger<T(numeric:)>() {
```

Returns the string as whatever integer type T is.

```qc
T toFloating<T(numeric:)>() {
```

Returns the string as whatever decimal type T is.

```qc
bool operator==(char *data) {
```

operator== for char*

```qc
bool operator!=(char *data) {
```

operator!= for char*

```qc
bool toBool() {
```

Returns the string converted to bool.

```qc
qbool toQBool() {
```

Returns the string converted to qbool.

```qc
char *c_str() {
```

Returns the strings data.

## `Str toStr<T(numeric:)>(T value)`

Returns a string of whatever number value is. Caller owns.

```qc
String proves CoreConcepts::Allocated;
```

# Errors

```qc
enum Codes { OK; Unknown; NotFound; InvalidArgument; OutOfBounds; Unsupported; }
```

Default error codes.

```qc
type Error<T> = T|Codes;
```

Union of a type or a error code.

# Owned

Owned value used for function returns. Ment to never be captured, only to be used as a result.

## `class Owned<T>`

Owned value.

```qc
Owned(T *data) {
```

Constructor. Owned owns.

```qc
T *own() {
```
Take ownership of Owneds data. Inval owned.
```qc
void ignore() {
```
Ignore owneds data. Inval owned. Inval data.
```qc        
void _destroy() {
```
Destroy. Inval owned. Inval data.
```qc
Owned proves CoreConcepts::Allocated;
```

# IO

## `void qout(char *fmt_string, ...args)`

Prints fmt_string to console, replacing formatters such as %s, with values from args.

## `char *getWord()`

Returns a heap allocated string that you take ownership of containing up to the next ' ' in input.

## `char *getLine()`

Returns a heap allocated string that you take ownership of containing up to the next '\n' in input.
