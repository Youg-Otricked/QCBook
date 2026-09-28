# Iterators

Iterators allow you to perform operations on user defined collections.
Foreach uses iterators.

Yes, this means you can iterate over your collection in `foreach`.
No, this does not make your code good.

To define a iterator:

1. Your class to be iterted:
    * Must have a `_begin` method which returns a iterator to the start of the class.
    * Should have a `_end` method which returns a iterator beyond the end of a class.
2. Your iterator:
    * Must define `_next` which returns a reference to the this element & advances;
    * Must define `_atEnd` which returns true if there is nothing left to iterate
    * Should define a `_prev` which returns a reference to the previous element and advances backwards
    * Should define a `_atBegin` which returns true if there is nothing left to reverse-iterate
    * Should define a `_moveTo` method which 
    * Can define a `_map` method which takes a lambda and maps each element through that lambda and returns a new iterator (that mapped collection)
    * If defines a `_map` make sure to define _collect which collects the iterator to a collection
    * Can define a `_filter` method which takes a lambda of element type which returns bool returns a iterator of only the elements that are true for that lambda
    * Can define a `_inval_destroy` method which invalidates the collection this iterator iterates
    * Can define a `_take` method which takes a int and returns a iterator to the first `<the int>` elements
    * Can define a `_drop` method which takes a int and returns a iterator skipping the first `<the int>` elements
