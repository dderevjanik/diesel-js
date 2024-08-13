# DIESEL JS

## What is DIESEL ?

**Diesel is widely used in AutoCAD**

This **D**umb **I**nterpretively **E**xecuted **S**tring **E**xpression **L**anguage is the kernel of a macro language you can customise by adding C code and embedding it into your program.

It is short, written in portable C, and is readily integrated into any program. It is useful primarily to programs which need a very rudimentary macro expansion facility without the complexity of a full language such as Lisp or FORTH.

**Playground:** <https://dderevjanik.github.io/diesel-js/>

Our DIESEL documentation with Examples: [./docs/DIESEL.md](./docs/DIESEL.md)

Original DIESEL Documentation: <https://www.fourmilab.ch/diesel/>

## What is DIESEL JS ?

Diesel JS is a JavaScript implementation of the DIESEL language. It is a simple and easy to use library that allows you to evaluate DIESEL expressions in JavaScript.

## Usage

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

### Examples

[Diesel Examples](./docs/DIESEL.md#examples)

## Development

### Compiling DIESEL into WASM

In order to compile DIESEL into javascript, you need to have Docker installed (emscripten is used to compile the C code into WebAssembly).

`npm run compile-diesel`

## Related

- DIESEL Homepage <https://www.fourmilab.ch/diesel/>
- Updated DIESEL docs [./docs/DIESEL.md](./docs/DIESEL.md)
- Autocad DIESEL functions reference <https://help.autodesk.com/view/ACDLT/2024/ENU/?guid=GUID-27BF17D6-797C-45A0-AE7D-B0344C81AB48>
