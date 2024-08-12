# DIESEL Core

DIESEL Core is package that compiles C code to WebAssembly, which is later consumed by packages
like DIESEL Browser, DIESEL Node and DIESEL CLI.

## Usage

## Compile C code to WebAssembly

`sh ./compile.sh` will use Docker with emscripten to compile the C code to WebAssembly. Output will
be generated into `./dist` directory.
