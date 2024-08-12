const Module = require('./diesel.js');

// Create a promise that resolves when the module is initialized
const moduleInitialized = new Promise<void>((resolve) => {
    Module.onRuntimeInitialized = function() {
        resolve();
    };
});

/**
 * DIESEL expression evaluator
 * @param expresion DIESEL expression to evaluate
 * @returns result of the evaluation
 */
export async function evaluate(expresion: string) {
    await moduleInitialized;
    const outputStr = "";

    const inPtr = Module.allocateUTF8(expresion);
    const outPtr = Module.allocateUTF8(outputStr);
  
    const result = Module._diesel(inPtr, outPtr);
    if (result > 0) {
        throw new Error(`Error: ${result}`);
    }
    const output = Module.UTF8ToString(outPtr);
    return output;
}
