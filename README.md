# DIESEL JS

## What is DIESEL ?

**Diesel is widely used in AutoCAD**

This **“Dumb Interpretively Executed String Expression Language”** is the kernel of a macro language you can customise by adding C code and embedding it into your program.

It is short, written in portable C, and is readily integrated into any program. It is useful primarily to programs which need a very rudimentary macro expansion facility without the complexity of a full language such as Lisp or FORTH.

Read more <https://www.fourmilab.ch/diesel/>

## What is DIESEL JS ?

Diesel JS is a JavaScript implementation of the DIESEL language. It is a simple and easy to use library that allows you to evaluate DIESEL expressions in JavaScript.

## Usage

```javascript
import { evaluate } from "@diesel/core";

const result = await evaluate("$(+, 1, 2)");
console.log(result); // 3
```

### CLI

