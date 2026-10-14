# Labels and Jumping

Labels and jumping are "fancy" features. They allow you to label segments of your code and jump to them.

```qc
int main() {
    int i = 0;
start:
    i++;
    if (i < 10) jmp start;
end:
    return 0;
```

You declare a label with the label name followed by `:`, and you jump to a label with `jmp` or `goto` followed by the label name.

The above example is a bad example, and using goto as a glorified loop is a bad use of goto. It instead is used to allow you to not duplicate cleanup code just like defer.

```qc
void setup() {
    int *thing = ...
    if (bad_thing_happened) {
    exit:
        return;
    }
    ...
    int *thing2 = ...
    if (other_bad_thing) {
    cleanup_1:
        `free(thing);
        jmp exit;
    }
    ...
    int *thing3 = ...
    if (last_bad_thing) {
    cleanup_2:
        `free(thing2);
        jmp cleanup_1;
    }
    ...
}
```
