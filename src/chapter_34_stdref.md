# STDRef

Currently, the standard library is rather small, with only 14 namespaces.

1. [CoreConcepts](#CoreConcepts).
   This contains concepts for everything else to use, those being `Eq` (`operator==`), and `Allocated` (`_destroy`).
2. [AdvQBool](#AdvQBool).
   Random boolean.
3. [Array](#Array).
   A constant-size array.
4. [Vector](#Vector).
   A dynamic array.
5. [List](#List).
   A linked list.
6. [Utils](#Utils).
   Basic utility functions.
7. [Math](#Math).
   Math intrinsics.
8. [OSInterop](#OSInterop).
   Operating-system interaction.
9. [Pair](#Pair).
   Pair of 2 items.
10. [Optional](#Optional).
    Optional value.
11. [Span](#Span).
    Like an array, but does not own the memory.
12. [Encodings](#Encodings).
    Base64, Hex, and URL encodings.
13. [Unordered](#Unordered).
    Hash-based Map and Set.
14. [Filesystem](#Filesystem).
    Filesystem functionality similar to C++ `std::filesystem`.

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

# AdvQBool

## `AlTypes`

```qc
type AlTypes = qbool | bool | AQB;
```

Booleanish types.

## `AQB`

A probabilistic boolean. 

### Fields

```qc
int TruthLevel;
int FalseLevel;
```

The percentage chances that the value evaluates to `true` or `false`.

### Methods

```qc
AQB(int truth)
```

```qc
void operator=(int other)
bool operator&&(AlTypes other)
bool operator||(AlTypes other)
bool operator^(AlTypes other)
bool operator!()
bool _eval()
string _repr()
```

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
double log(double x)
```

Returns the logarithm of `x`.

# OSInterop

```qc
void system(string command)
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

# Encodings

Encoding and decoding functions for various representations.

## Hex

Hexadecimal encoding and decoding.

```qc
const string chars = "0123456789abcdef";
```

```qc
string encode(string data)
```

Encodes string to hex.

```qc
string decode(string hex)
```

Decodes hex back into text.

## Base64

Base64 encoding and decoding.

```qc
const string chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
```

Characters used by the Base64 encoding.

```qc
string encode(string data)
```

Encodes data using Base64.

```qc
int charValue(char c)
```

Returns the Base64 numeric value represented by a character.

```qc
string decode(string data)
```

Decodes Base64 data.

## URI

URL/URI percent encoding and decoding.

```qc
bool isUnreserved(char c)
```

Returns whether a character is allowed to appear unescaped in a URI.

```qc
string encode(string data)
```

Percent-encodes characters that require escaping in a URI.

```qc
string decode(string data)
```

Decodes percent-encoded URI data.

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

# Filesystem

Filesystem path, file, directory, and stream functionality.

```qc
string realpath(string input_path)
```

Resolves a path into its canonical filesystem path.

```qc
type DateTime = addr_t;
```

Filesystem timestamp representation.

## `FileType`

```qc
enum FileType {
    Unknown = 0;
    File = 1;
    Directory = 2;
    Symlink = 3;
    Other = 4;
}
```

## `FileStatus`

Contains metadata about a filesystem object.

```qc
FileType filetype;
addr_t size;
addr_t created;
addr_t accessed;
addr_t modified;
short int permissions;
bool exists;
```

Stores the object's type, size, timestamps, permissions, and existence state.

## `Path`

Represents and manipulates filesystem paths.

```qc
Path(string path)
Path operator/(string other)
Path operator/(Path other)
Path& operator=(Path other)
Path& operator=(string other)
```

```qc
string toString()
```

Returns the path as a string.

```qc
bool empty()
```

Returns whether the path contains no characters.

```qc
bool isAbsolute()
```

Returns whether the path is absolute.

```qc
bool isRelative()
```

Returns whether the path is relative.

```qc
Path parent()
```

Returns the parent directory of the path.

```qc
string filename()
```

Returns the filename component of the path.

```qc
string extension()
```

Returns the file extension of the path.

```qc
string stem()
```

Returns the filename without its extension.

```qc
bool hasFilename()
```

Returns whether the path contains a filename component.

```qc
bool hasExtension()
```

Returns whether the path contains a file extension.

```qc
bool hasParent()
```

Returns whether the path has a parent component.

```qc
Path normalize()
```

Returns a normalized version of the path with redundant path components resolved.

```qc
Path absolute()
```

Returns an absolute version of the path.

```qc
Path canonical()
```

Returns the canonical filesystem path with symbolic links and redundant components resolved.

```qc
bool exists()
```

Returns whether the path exists.

```qc
addr_t fileSize()
```

Returns the size of the file represented by the path.

```qc
DateTime lastWriteTime()
```

Returns the last modification time of the filesystem object.

```qc
DateTime lastAccess_Time()
```

Returns the last access time of the filesystem object.

```qc
DateTime creationTime()
```

Returns the creation time of the filesystem object.

```qc
FileStatus status()
```

Returns filesystem metadata for the path.

```qc
FileStatus linkStatus()
```

Returns filesystem metadata for the path itself without following a symbolic link.

```qc
addr_t size()
```

Returns the size of the filesystem object.

```qc
bool isHidden()
```

Returns whether the filesystem object is considered hidden.

```qc
bool isFile()
```

Returns whether the path refers to a regular file.

```qc
bool isDirectory()
```

Returns whether the path refers to a directory.

```qc
bool isSymlink()
```

Returns whether the path refers to a symbolic link.

## `getCwd`

```qc
Path getCwd()
```

Returns the process's current working directory.

# InputStream

A stream used for reading data from files or file descriptors.

```qc
InputStream()
```

Creates a closed input stream.

```qc
InputStream(Path path)
```

Creates an input stream and opens the specified path.

```qc
void open(Path path)
```

Opens the specified path for reading.

```qc
void setFd(int fd)
```

Sets the file descriptor used by the stream.

```qc
char get()
```

Reads and returns the next character from the stream.

```qc
void getline(string dest, char till = '\n')
```

Reads characters into `dest` until the specified delimiter is encountered.

```qc
void read(string dest, addr_t count)
```

Reads up to `count` bytes into `dest`.

```qc
addr_t gcount()
```

Returns the number of bytes read by the most recent read operation.

```qc
bool isOpen()
```

Returns whether the stream currently has an open file descriptor.

```qc
void close()
```

Closes the stream's file descriptor.

```qc
void _destroy()
```

# OutputStream

A stream used for writing data to files or file descriptors.

```qc
OutputStream()
```

Creates a closed output stream.

```qc
OutputStream(Path path)
```

Creates an output stream and opens the specified path.

```qc
void open(Path path)
```

Opens the specified path for writing.

```qc
void setFd(int fd)
```

Sets the file descriptor used by the stream.

```qc
void put(char c)
```

Writes a single character to the stream.

```qc
void write(string data)
```

Writes the supplied string to the stream.

```qc
bool isOpen()
```

Returns whether the stream currently has an open file descriptor.

```qc
void close()
```

Closes the stream's file descriptor.

```qc
void _destroy()
```

# RWStream

A stream that supports both reading and writing.

```qc
RWStream()
```

Creates a closed read/write stream.

```qc
RWStream(Path path)
```

Creates a read/write stream and opens the specified path.

```qc
void open(Path path)
```

Opens the specified path for reading and writing.

```qc
void setFd(int fd)
```

Sets the file descriptor used by the stream.

```qc
void put(char c)
```

Writes a single character to the stream.

```qc
void write(string data)
```

Writes the supplied string to the stream.

```qc
char get()
```

Reads and returns the next character from the stream.

```qc
void getline(string dest, char till = '\n')
```

Reads characters into `dest` until the specified delimiter is encountered.

```qc
void read(string dest, addr_t count)
```

Reads up to `count` bytes into `dest`.

```qc
addr_t gcount()
```

Returns the number of bytes read by the most recent read operation.

```qc
bool isOpen()
```

Returns whether the stream currently has an open file descriptor.

```qc
void close()
```

Closes the stream's file descriptor.

```qc
void _destroy()
```

# DirectoryIterator

Iterates over the entries within a directory.

```qc
DirectoryIterator()
```

Creates a closed directory iterator.

```qc
DirectoryIterator(Path path)
```

Creates an iterator for the specified directory.

```qc
bool hasNext()
```

Returns whether another directory entry is available.

```qc
Path next()
```

Returns the next entry in the directory.

```qc
void close()
```

Closes the directory iterator.

```qc
bool isOpen()
```

Returns whether the directory iterator is currently open.

```qc
void _destroy()
```

# Filesystem Operations

```qc
bool createDirectory(Path path, int mode = 755)
```

Creates a single directory at the specified path.

```qc
bool createDirectories(Path path)
```

Creates the specified directory and any missing parent directories.

```qc
bool remove(Path path)
```

Removes the specified filesystem object.

```qc
bool removeAll(Path path)
```

Recursively removes the specified filesystem object and its contents.

```qc
bool rename(Path from, Path to)
```

Renames or moves a filesystem object.

```qc
void copy(Path source, Path destination)
```

Copies a filesystem object from `source` to `destination`.

# Owned

## `class Owned<T>` 

```qc
Owned(T *data);
```
Constructor. Owns data. `inval data` for original owner.

```qc
T *own()
```
Take ownership of data. Owned no longer owns.

```qc
void ignore()
```
Ignore data. Frees data. `inval data`
        
```qc
void _destroy()
```
Frees data. `inval data`

Use `Owned::Owned` for when you want to specify you no longer have anything to do with a value.
