const Module = require('./diesel.js');

// Create a promise that resolves when the module is initialized
const moduleInitialized = new Promise<void>((resolve) => {
    Module.onRuntimeInitialized = function() {
        resolve();
    };
});

const AUTOCAD_FUNCTIONS = ["ANGTOS", "RTOS"];

const FUNC_TO_DESC = {
	// Arithemtic
	"+": "$(+,<val1>,<val2>,...<valn>)",
	"-": "$(-,<val1>,<val2>,...<valn>)",
	"*": "$(*,<val1>,<val2>,...<valn>)",
	"/": "$(/,<val1>,<val2>,...<valn>)",
	"=": "$(=,<val1>,<val2>,...<valn>)",
	// Comparison
	"<": "$(<,<val1>,<val2>)",
	">": "$(>,<val1>,<val2>)",
	"!=": "$(!=,<val1>,<val2>)",
	"<=": "$(<=,<val1>,<val2>)",
	">=": "$(>=,<val1>,<val2>)",
	// Logical
	"AND": "$(AND,<val1>,<val2>,...<valn>)",
	"OR": "$(OR,<val1>,<val2>,...<valn>)",
	"XOR": "$(XOR,<val1>,<val2>,...<valn>)",
	// String
	"EQ": "$(EQ,<val1>,<val2>)",
	"EVAL": "$(EVAL,<string>)",
	"FIX": "$(FIX,<value>)",
	"IF": "$(IF,<condition>,<true>,<false>)",
	"INDEX": "$(INDEX,<string>,<index>)",
	"NTH": "$(NTH,<which>,<arg0>,<arg1>,...<argn>)",
	"STRFILL": "$(STRFILL,<string>,<ncopies>)",
	"STRLEN": "$(STRLEN,<string>)",
	"SUBSTR": "$(SUBSTR,<string>,<start>,<length>)",
	"UPPER": "$(UPPER,<string>)",
	// Variables
	"GETVAR": "$(GETVAR,<name>)",
	"SETVAR": "$(SETVAR,<name>,<value>)",
	// Unix Extensions
	"GETENV": "$(GETENV,<name>)",
	"TIME": "$(TIME)",
	"EDTIME": "$(EDTIME,<time>,<picture>)",
} as { [key: string]: string };

export function parseErrOutput(output: string, position: string) {
	let match: RegExpExecArray | null = null;
	if (output.trim() === "$?") {
		return {
			dieselName: "$?",
			name: "Syntax error",
			message: `Syntax error, missing right parenthesis at position ${position}`
		}
	} else if (output.trim() === "$++") {
		return {
			dieselName: "$++",
			name: "Output string too long",
			message: `Output string too long`
		}
 	}

	// $(func,??)
	match = /\$\(\s*([a-zA-Z_]\w*)\s*,\?\?\)/g.exec(output);
	if (match && match[1]) {
		const functionName = match[1];
		const correctUsage = FUNC_TO_DESC[functionName];
		return {
			dieselName: "$(func,??)",
			name: "Incorrect function arguments",
			message: `Incorrect function '${functionName}'. ${correctUsage ? 'Correct usage: ' + correctUsage : ''}`
		}
	}

	// $(func)??
	match = /\$\(\s*([a-zA-Z_]\w*)\s*\)\?\?/g.exec(output)
	if (match && match[1]) {
		const functionName = match[1];
		return {
			dieselName: "$(func)??",
			name: "Unknown function",
			message: AUTOCAD_FUNCTIONS.includes(functionName)
				? `Autocad function ${match[1]} is not supported`
				: `Unknown function ${match[1]}`
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
 * This is wrapped C `diesel` function, which will throw custom error message.
 *
 * - If you're looking for the original `diesel` function, use `dieselC` function instead.
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

    const ret = Module._diesel(inPtr, outPtr);
	const output = Module.UTF8ToString(outPtr);
    if (ret > 0) { // 0 - means no error
		const err = parseErrOutput(output, ret);
        throw new Error(err.message);
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

