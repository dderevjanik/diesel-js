const Module = require("@diesel/core/dist/diesel.js");


// NOTE: WORKING
Module.onRuntimeInitialized = function() {
  console.log('WASM module initialized');

  const expr = '$(+,1,2,3,4)';
  // const inputStr = "$(+,1,2,3,4)";
  const outputStr = ""; // Usually, you'll just allocate space for output

  // Allocate memory for strings in the WebAssembly memory space
  const inPtr = Module.allocateUTF8(expr);
  const outPtr = Module.allocateUTF8(outputStr);

  const result = Module._diesel(inPtr, outPtr);
  const output = Module.UTF8ToString(outPtr);

  console.log(`Input: ${expr}\nOutput: ${output}`);
};
