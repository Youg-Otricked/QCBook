# Files

Files are obviously important. So obviously, you can edit files with code.

_"If you can't edit it with code, it's probably not important."_

> Socrates, probably

You only need 4 intrinsics to edit files.

## Open

To open a file, you use the `` `open `` intrinsic. It opens a filepath with a specific access mode, and returns a file descriptor (`int`).

### Access Modes

- `r`: Opens an existing file for reading. The file pointer starts at the beginning of the file. If the file does not exist, it fails.
- `w`: Opens a file for writing. If the file already exists, its contents are erased. If the file does not exist, it creates a new file.
- `a`: Opens a file for writing at the end. Existing data is kept safe. New data is always added to the end of the file. If the file does not exist, it creates a new file.
- `r+`: Opens a file for both reading and writing. The file must exist. The file pointer starts at the beginning.
- `w+`: Opens a file for reading and writing. If the file exists, it erases the contents. If it does not exist, it creates a new file.
- `a+`: Opens a file for reading and appending. Reading can happen anywhere, but writing always moves data to the end. If it does not exist, it creates a new file.

```qc
int fd = `open("my-file.qc", "r");
```

## File Descriptors

File descriptors are what the operating system uses to keep track of open files. After you are done with a file descriptor, you need to

## Close

it.

To close a file, you use the `` `close `` intrinsic. It takes a file descriptor and tells the OS to close it.

## Read

The `` `read `` intrinsic takes a file descriptor, a string-like buffer to output to, and an integer specifying the number of bytes to read. It returns the number of bytes read, so you can check whether the operation succeeded.

## Write

The `` `write `` intrinsic takes a file descriptor and a string-like text to write to it. It returns the number of bytes written, so you can check whether the operation succeeded.

There are also a few special functions:

## Directories

Directories need special intrinsics.

### Opening and Closing Directories

You use `` `opendir `` to open a directory. It takes a path and returns a `void*` representing the directory.

You still must close it using `` `closedir ``, which takes the directory (`void*`) and closes it.

### Reading Directories

You use `` `readdir `` to read the contents of a directory. It takes a directory, a string-like buffer to read the filename into, and an `addr_t` specifying the length of the buffer.

It returns `true` if there is another file to read (the buffer is populated), and `false` when there are no more files (the buffer is empty).

## LSeek

The `` `lseek `` intrinsic takes an `int` (the file descriptor), an `long int` offset, and a `whence` value.

The offset specifies how far to move the file pointer, while `whence` specifies where the offset is measured from.
Whence values are:

- `0`: **Beginning**. The offset is measured from the beginning of the file. For example, `lseek(fd, 10, 0)` attempts to move the file pointer to position 10 and returns the new position.
- `1`: **Current**. The offset is measured from the current file position. For example, `lseek(fd, 10, 1)` attempts to move the file pointer to `CURRENT_POS + 10` and returns the new position.
- `2`: **End**. The offset is measured from the end of the file. For example, `lseek(fd, -10, 2)` moves the file pointer to 10 bytes before the end and returns the new position.

If the requested position is outside the max/min size for the file, most of the time seeking past the end of a file is generally allowed, while seeking to a negative position is not.

