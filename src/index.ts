const Module = require('./diesel.js');

// Create a promise that resolves when the module is initialized
const moduleInitialized = new Promise<void>((resolve) => {
    Module.onRuntimeInitialized = function() {
        resolve();
    };
});

export function parseErrOutput(output: string, position: string) {
	let match: RegExpExecArray | null = null;
	if (output.trim() === "$?") {
		return {
			dieselName: "$?",
			name: "Syntax error",
			message: `Syntax error at position ${position}`
		}
	} else if (output.trim() === "$++") {
		return {
			dieselName: "$++",
			name: "Output string too long",
			message: `Output string too long at position ${position}`
		}
 	}

	// $(func,??)
	match = /\$\(\s*([a-zA-Z_]\w*)\s*,\?\?\)/g.exec(output);
	if (match && match[1]) {
		return {
			dieselName: "$(func,??)",
			name: "Incorrect function arguments",
			message: `Incorrect function '${match[1]}' arguments at position ${position}`
		}
	}

	// $(func)??
	match = /\$\(\s*([a-zA-Z_]\w*)\s*\)\?\?/g.exec(output)
	if (match && match[1]) {
		return {
			dieselName: "$(func)??",
			name: "Unknown function",
			message: `Unknown function ${match[1]} at position ${position}`
		}
	}

	return {
		diselName: "Unknown",
		name: "Unknown error",
		message: `Unknown error at position ${position}`
	};
}

/**
 * DIESEL expression evaluator
 *
 * @param expresion DIESEL expression to evaluate
 * @returns result of the evaluation
 *
 * @see {@link https://www.fourmilab.ch/diesel/}
 */
export async function evaluate(expresion: string) {
    await moduleInitialized;
    const outputStr = "";

    const inPtr = Module.allocateUTF8(expresion);
    const outPtr = Module.allocateUTF8(outputStr);

    const position = Module._diesel(inPtr, outPtr);
	const output = Module.UTF8ToString(outPtr);
    if (position > 0) { // 0 - means no error
		const err = parseErrOutput(output, position);
        throw new Error(err.message);
    }

    return output;
}
