# Iterators

While iterators are mostly user code with defined standards, `foreach` loops still use iterators. They call the `._begin` method then use `.atEnd` and `.next` to get elements.

## Design Commentary: Why this API?

Why this structure? Why these method names?

I don't really have a elegent explanation. The `_` prefix indicates methods can be used by the compiler, and the methods names just describe what they do.
