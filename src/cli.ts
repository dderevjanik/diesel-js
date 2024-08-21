#!/usr/bin/env node

import process from "node:process";
import { parseArgs } from "node:util";
import { DieselError, evaluate } from "./index";

const args = parseArgs({
	allowPositionals: true,
	options: {
		help: {
			type: "boolean",
			short: "h",
		},
	},
});

(async function () {
	if (process.stdin.isTTY) {
		if (args.positionals.length > 0) {
			try {
				const evaluated = await evaluate(args.positionals[0]);
				console.log(evaluated);
				process.exit(0);
			} catch (err: unknown) {
				if (err instanceof DieselError) {
					console.error(err.message);
				} else {
					console.error(err);
				}
				process.exit(1);
			}
		}
		if (
			args.values.help
			|| Object.keys(args.values).length === 0
		) {
			console.log([
				"NAME",
				"	diesel - Dumb Interpretively Executed String Expression Language",
				"",
				"SYNOPSIS",
				"	diesel [EXPRESSION]",
				"",
				"DESCRIPTION",
				"   diesel is the kernel of a macro language you can customise",
				"   by adding C code and embedding it into your program.",
				"",
				"OPTIONS",
				"	-h, --help",
				"		Display the help message and exit.",
				"",
				"USAGE",
				"	Evaluate an expression",
				"",
				"	diesel '$(+,1,2,3,4,5)'",
				"	output: 15",
				"",
			].join("\n"));
		}
	}
})();
