import { createDieselError } from "./utils";
export { DieselError,  DieselIncorrectFunctionArgumentsError, DieselOutputTooLongError, DieselSyntaxError, DieselUnknownError, DieselUnknownFunctionError, createDieselError } from "./utils";

const Module = require('./diesel.js');

// Create a promise that resolves when the module is initialized
const moduleInitialized = new Promise<void>((resolve) => {
    Module.onRuntimeInitialized = function() {
        resolve();
    };
});

/**
 * DIESEL expression evaluator
 *
 * This is wrapped C `diesel` function, which will throw custom error message.
 *
 * - If you're looking for the original `diesel` function, use `dieselC` function instead.
 *
 * @param expresion DIESEL expression to evaluate
 * @returns result of the evaluation
 *
 * @see {@link https://www.fourmilab.ch/diesel/}
 */
export async function evaluate(expresion: string): Promise<string> {
    await moduleInitialized;
    const outputStr = "";

    const inPtr = Module.allocateUTF8(expresion);
    const outPtr = Module.allocateUTF8(outputStr);

    const ret = Module._diesel(inPtr, outPtr);
	const output = Module.UTF8ToString(outPtr);
    if (ret > 0) { // 0 - means no error
		const err = createDieselError(output, ret);
        throw err
    }

    return output;
}

/**
 * DIESEL expression evaluator
 *
 * This is wrapped C `diesel` function.
 * Never throws error, instead it returns the error code as original `diesel` function does.
 *
 * @param expresion DIESEL expression to evaluate
 * @returns in `output` you can find the result of the evaluation, and in `return` you can find the error code
 *
 * @see {@link https://www.fourmilab.ch/diesel/}
 */
export async function evaluateC(expresion: string): Promise<{ output: string; return: number; }> {
    await moduleInitialized;
    const outputStr = "";

    const inPtr = Module.allocateUTF8(expresion);
    const outPtr = Module.allocateUTF8(outputStr);

    const ret = Module._diesel(inPtr, outPtr);
	const output = Module.UTF8ToString(outPtr);

    return { output, return: ret };
}

