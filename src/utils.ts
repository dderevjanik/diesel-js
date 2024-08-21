
export class DieselError extends Error {
	name: string;
	dieselName: string;
    constructor(message: any) {
        super(message);
        this.name = "DieselError";
		this.dieselName = "";
    }
}

export class DieselSyntaxError extends DieselError {
	dieselName: string;
    constructor(message = "Syntax error") {
        super(message);
        this.name = "DieselSyntaxError";
		this.dieselName = "$?";
    }
}

export class DieselOutputTooLongError extends DieselError {
	dieselName: string;
    constructor(message = "Output string too long") {
        super(message);
        this.name = "DieselOutputTooLongError";
		this.dieselName = "$++";
    }
}

export class DieselIncorrectFunctionArgumentsError extends DieselError {
	dieselName: string;
    constructor(message = "Incorrect function arguments") {
        super(message);
        this.name = "DieselIncorrectFunctionArgumentsError";
		this.dieselName = "$(func,??)";
    }
}

export class DieselUnknownFunctionError extends DieselError {
	dieselName: string;
    constructor(message = "Unknown function") {
        super(message);
        this.name = "DieselUnknownFunctionError";
		this.dieselName = "$(func)??";
    }
}

export class DieselUnknownError extends DieselError {
	dieselName: string;
    constructor(message = "Unknown error") {
        super(message);
        this.name = "DieselUnknownError";
		this.dieselName = "";
    }
}

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
	"IF": "$(IF,<condition>,<true>,<false>)",
	"STRFILL": "$(STRFILL,<string>,<ncopies>)",
	"STRLEN": "$(STRLEN,<string>)",
	"SUBSTR": "$(SUBSTR,<string>,<start>,<length>)",
	"UPPER": "$(UPPER,<string>)",
	// Other Functions
	"FIX": "$(FIX,<value>)",
	"INDEX": "$(INDEX,<string>,<index>)",
	"NTH": "$(NTH,<which>,<arg0>,<arg1>,...<argn>)",
	"EVAL": "$(EVAL,<string>)",
	// Variables
	"GETVAR": "$(GETVAR,<name>)",
	"SETVAR": "$(SETVAR,<name>,<value>)",
	// Unix Extensions
	"GETENV": "$(GETENV,<name>)",
	"TIME": "$(TIME)",
	"EDTIME": "$(EDTIME,<time>,<picture>)",
} as { [key: string]: string };

export function createDieselError(output: string, position: string): DieselError {
	let match: RegExpExecArray | null = null;
	if (output.trim() === "$?") {
		return new DieselSyntaxError(`Syntax error, missing right parenthesis at position ${position}`);
	} else if (output.trim() === "$++") {
		return new DieselOutputTooLongError("Output string too long");
 	}

	// $(func,??)
	match = /\$\(\s*([^,]+)\s*,\?\?\)/g.exec(output);
	if (match && match[1]) {
		const functionName = match[1];
		const correctUsage = FUNC_TO_DESC[functionName];
		return new DieselIncorrectFunctionArgumentsError(`Incorrect function '${functionName}'. ${correctUsage ? 'Correct usage: ' + correctUsage : ''}`);
	}

	// $(func)??
	match = /\$\(\s*([^,]+)\s*\)\?\?/g.exec(output)
	if (match && match[1]) {
		const functionName = match[1];
		const errMessage = AUTOCAD_FUNCTIONS.includes(functionName) ? `Autocad function ${match[1]} is not supported` : `Unknown function ${match[1]}`;
		return new DieselUnknownFunctionError(errMessage);
	}
	return new DieselUnknownError(`Unknown error at position ${position}`);
}
