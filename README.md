# DIESEL JS

## What is DIESEL ?

**Diesel is widely used in AutoCAD**

This **D**umb **I**nterpretively **E**xecuted **S**tring **E**xpression **L**anguage is the kernel of a macro language you can customize by adding C code and embedding it into your program.

It is short, written in portable C, and is readily integrated into any program. It is useful primarily for programs that need a very rudimentary macro expansion facility without the complexity of a full language such as Lisp or FORTH.

**Try it online:** <https://dderevjanik.github.io/diesel-js/>

Our DIESEL documentation with Examples: [./docs/DIESEL.md](./docs/DIESEL.md)

[Fourmilab DIESEL Documentation](https://www.fourmilab.ch/diesel/)

## What is DIESEL JS ?

Diesel JS is a JavaScript compilation of the DIESEL language using [Emscripten](https://emscripten.org/). It is a simple and easy-to-use library that allows you to evaluate DIESEL expressions in JavaScript.

Diesel JS supports **VARIABLES**, enabling you to use `SETVAR` and `GETVAR` functions to store and retrieve variables.

## Usage

> [!WARNING]
> This library is not published to NPM yet, so you need to clone the repository and build it yourself.

### Browser

### Node

```javascript
import { evaluate } from "@diesel/core";

const result = await evaluate("$(+, 1, 2)");
console.log(result); // 3
```

### CLI

`npx diesel-cli '$(+, 1, 2)'`

or by installing diesel-cli globally `npm i -g diesel-cli` and then using `diesel '$(+, 1, 2)'`

### Try it online

[https://dderevjanik.github.io/diesel-js/](https://dderevjanik.github.io/diesel-js/)

### Examples

Checkout [Diesel Examples](./docs/DIESEL.md#examples)

## Differences with AutoCAD DIESEL

AutoCAD extends DIESEL with additional functions and variables. This library does not support all of them, but it does support the most common ones. Functions like `rtos` and `angtos` are not supported in DIESEL JS.

- [Autocad DIESEL functions reference](https://help.autodesk.com/view/ACDLT/2024/ENU/?guid=GUID-F94A885A-4DA2-432B-AC1A-EB49CC6C1C72)


## Development

### (Optional) Compiling DIESEL into WASM

In order to compile DIESEL into javascript, you need to have [Docker](https://www.docker.com/) installed (emscripten is used to compile the C code into WebAssembly).

`npm run compile-diesel`

### Running the project

- `npm i` install dependencies
- `npm test` to run unit tests (based on Fourmilab DIESEL tests)
- `ts-node ./src/cli.ts -h` to run the CLI

## TODO

- [ ] Add AutoCAD functions (`rtos`, `angtos`, etc.)
- [ ] Publish to NPM

## Related

- [Fourmilab DIESEL Documentation](https://www.fourmilab.ch/diesel/)
- [Autocad DIESEL functions reference](https://help.autodesk.com/view/ACDLT/2024/ENU/?guid=GUID-F94A885A-4DA2-432B-AC1A-EB49CC6C1C72)
