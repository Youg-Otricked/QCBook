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

This is what enums exist to fix.

## Defining an Enum
```qc
enum Directions {
    NORTH = 1;
    SOUTH = 2;
    EAST = 3;
    WEST = 4;
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
This is better in every way shape and form than the sentinel-value approach from the top of this chapter. The compiler now knows `move` only accepts a `Directions`, not "any int I feel the urge for." Passing a raw `4` where a `Directions` is expected is a compile error, not a bluesky rant because the owner of the codebase hates poor people you decided.

