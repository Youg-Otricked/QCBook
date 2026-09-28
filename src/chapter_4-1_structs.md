# Structs

Put down the pitchforks. Structs need to be first.

Structs are basically a collection of named fields.

```qc
struct X {
    int x;
    int y;
}
```

Structs are part of something called "usertypes". They are what they sound like. User defined types.

Once you define a struct you can use it as a type.

```qc
X my_struct = {1, 2};
```

Structs can be initialized with two types of initializers:

1. Ordered (Array) Initializers:
    ```qc
    X my_struct = {1, 2}; // x is now 1, y is 2
    ```
2. Named (Map) Initializers:
    ```qc
    X my_struct = {y: 3, x: 2}; // x is now 2, y is now 3.
    ```

Ordered initializers are in order of definition on the type, named initializers assign values by field name, so their order does not matter.

You can access fields on a struct with the . operator.

```qc
X my_struct = {1, 4};
`qout("%i", my_struct.x);

my_struct.x = 2;
```

We have structs for 2 reasons I can explain right now:

1. Structs group related data together
This:
```qc
struct Position {
    int x;
    int y;
}
struct Player {
    Position pos;
    string name;
    int health;
}
Player player1;
Player player2;
```
is obviously better than
```qc
int player1_position_x;
int player1_position_y;
int player1_health;
string player1_name;
int player2_position_x;
int player2_position_y;
int player2_health;
string player2_name;
```
2. Structs keep functions from having 55 parameters

Imagine a function that needs a player's position, name, health, inventory, velocity, score, and a few dozen other pieces of information.
Without structs, you could end up with a function that looks like this:
```qc
myFunction(x, y, name, health, inventory_size, inventory_max_size, inventory_weight, velocity, score, ...);
```
With structs, all of that related information can be represented by one value:
```qc
myFunction(player);
```

Much better.
