# Enums

You may have dealt with this before:
```qc
const int NORTH = 1;
const int SOUTH = 2;
const int EAST = 3;
const int WEST = 4;
```
These are all related and they're all constants. These are also 16 bytes of memory held together by a dream, a doc comment, and 4 gallons of coffee. This is why sometimes `git blame` points to somebody's obituary. This is why some comments look like this:
```qc
// i don't know which variable this line is referencing. it doesn't show up anywhere else in the program. this godless abomination has cost over 12 hours of my life. if you delete it the program won't start. look upon me and weep
```
and
```qc
// Dear programmer:
// When I wrote this code, only god and
// I knew how it worked.
// Now, only god knows it!
//
// Therefore, if you are going to try and optimize
// this routine and it fails (most surely),
// please increase this counter as a
// warning for the next person:
//
// total_hours_wasted_here = 254
//

```
###### Source: The internet

This is what enums exist to fix.

## Defining an Enum
```qc
enum Directions {
    NORTH;
    SOUTH;
    EAST;
    WEST;
}
```

Like structs, enums are a "usertype". 

You access an enum's members with the `.` operator, on the type itself (not an instance of it):
```qc
Directions d = Directions.EAST;
```

Because enums are usertypes, you can use them anywhere you'd use `int` or `string` or any struct:
```qc
void move(Directions d) {
    // ...
}
move(Directions.NORTH);
```
This is better in every way shape and form than the sentinel-value approach from the top of this chapter. The compiler now knows `move` accepts a `Directions`. Naming constants in an enum prevents technical debt, and stops somebody on bluesky ranting and raving because this codebase hates poor people (source: decided).

Enums can also have tags, special values that go with the enum:

```qc
enum Thing {
    Valued(int);
    NoValue;
}
```

So the `Valued` member of the enum `Thing` has a `int` tag.
Then, you can extract the tags in a _match_, which is like a switch, but it MUST be exaustive (cover every case, so all enum members or have a default in a non enum type).

```qc
Thing mything = Thing.Valued(123); // creates a thing with valued tag set to 123
match (mything) {
    Thing.Valued(x) /* x is the i32 value stored in mything */ => ...
    Thing.NoValue => ...
}
```
