import assert from "node:assert";
import { describe, test } from "node:test";
import { DieselIncorrectFunctionArgumentsError, DieselOutputTooLongError, DieselSyntaxError, DieselUnknownError, DieselUnknownFunctionError, evaluate, evaluateC } from "./index";

describe("Arithmetic", () => {

	describe("$(+,<val1>,<val2>,...<valn>)", () => {

		test("$(+)", async () => {
			const output = await evaluate("$(+)");
			assert.equal(output, "0");
		});

		test("$(+,1)", async () => {
			const output = await evaluate("$(+,1)");
			assert.equal(output, "1");
		});

		test("$(+,1.234e-2)", async () => {
			const output = await evaluate("$(+,1.234e-2)");
			assert.equal(output, "0.01234");
		});

		test("$(+,-18.3,4,56)", async () => {
			const output = await evaluate("$(+,-18.3,4,56)");
			assert.equal(output, "41.7");
		});

	});

	describe("$(-,<val1>,<val2>,...<valn>)", () => {

		test("$(-)", async () => {
			const output = await evaluate("$(-)");
			assert.equal(output, "0");
		});

		test("$(-,4)", async () => {
			const output = await evaluate("$(-,4)");
			assert.equal(output, "4");
		});

		test("$(-,20,40.5)", async () => {
			const output = await evaluate("$(-,20,40.5)");
			assert.equal(output, "-20.5");
		});

		test("$(-,10,2,3)", async () => {
			const output = await evaluate("$(-,10,2,3)");
			assert.equal(output, "5");
		});

	});

	describe("$(*,<val1>,<val2>,...<valn>)", () => {

		test("$(*)", async () => {
			const output = await evaluate("$(*)");
			assert.equal(output, "1");
		});

		test("$(*,-1002)", async () => {
			const output = await evaluate("$(*,-1002)");
			assert.equal(output, "-1002");
		});

		test("$(*,1.41414,1.41414)", async () => {
			const output = await evaluate("$(*,1.41414,1.41414)");
			assert.equal(output, "1.9997919396");
		});

		test("$(*,535,2,0.5)", async () => {
			const output = await evaluate("$(*,535,2,0.5)");
			assert.equal(output, "535");
		});

	});

	describe("$(/,<val1>,<val2>,...<valn>)", () => {

		test("$(/)", async () => {
			const output = await evaluate("$(/)");
			assert.equal(output, "1");
		});

		test("$(/,12)", async () => {
			const output = await evaluate("$(/,12)");
			assert.equal(output, "12");
		});

		test("$(/,12,2)", async () => {
			const output = await evaluate("$(/,12,2)");
			assert.equal(output, "6");
		});

		test("$(/,1007,17)", async () => {
			const output = await evaluate("$(/,1007,17)");
			assert.equal(output, "59.235294117647");
		});

		test("$(/,-126,3,-2)", async () => {
			const output = await evaluate("$(/,-126,3,-2)");
			assert.equal(output, "21");
		});

	});

});

describe("Comparison", () => {

	describe("$(=,<val1>,<val2>)", () => {

		test("$(=,2,2)", async () => {
			const output = await evaluate("$(=,2,2)");
			assert.equal(output, "1");
		});

		test("$(=,2,-2)", async () => {
			const output = await evaluate("$(=,2,-2)");
			assert.equal(output, "0");
		});

		test("$(=,-2,2)", async () => {
			const output = await evaluate("$(=,-2,2)");
			assert.equal(output, "0");
		});

	});

	describe("$(<,<val1>,<val2>)", () => {

		test("$(<,2,2)", async () => {
			const output = await evaluate("$(<,2,2)");
			assert.equal(output, "0");
		});

		test("$(<,2,-2)", async () => {
			const output = await evaluate("$(<,2,-2)");
			assert.equal(output, "0");
		});

		test("$(<,-2,2)", async () => {
			const output = await evaluate("$(<,-2,2)");
			assert.equal(output, "1");
		});

	});

	describe("$(>,<val1>,<val2>)", () => {

		test("$(>,2,2)", async () => {
			const output = await evaluate("$(>,2,2)");
			assert.equal(output, "0");
		});

		test("$(>,2,-2)", async () => {
			const output = await evaluate("$(>,2,-2)");
			assert.equal(output, "1");
		});

		test("$(>,-2,2)", async () => {
			const output = await evaluate("$(>,-2,2)");
			assert.equal(output, "0");
		});

	});

	describe("$(!=,<val1>,<val2>)", () => {

		test("$(!=,2,2)", async () => {
			const output = await evaluate("$(!=,2,2)");
			assert.equal(output, "0");
		});

		test("$(!=,2,-2)", async () => {
			const output = await evaluate("$(!=,2,-2)");
			assert.equal(output, "1");
		});

		test("$(!=,-2,2)", async () => {
			const output = await evaluate("$(!=,-2,2)");
			assert.equal(output, "1");
		});

	});

	describe("$(<=,<val1>,<val2>)", () => {

		test("$(<=,2,2)", async () => {
			const output = await evaluate("$(<=,2,2)");
			assert.equal(output, "1");
		});

		test("$(<=,2,-2)", async () => {
			const output = await evaluate("$(<=,2,-2)");
			assert.equal(output, "0");
		});

		test("$(<=,-2,2)", async () => {
			const output = await evaluate("$(<=,-2,2)");
			assert.equal(output, "1");
		});

	});

	describe("$(>=,<val1>,<val2>)", () => {

		test("$(>=,2,2)", async () => {
			const output = await evaluate("$(>=,2,2)");
			assert.equal(output, "1");
		});

		test("$(>=,2,-2)", async () => {
			const output = await evaluate("$(>=,2,-2)");
			assert.equal(output, "1");
		});

		test("$(>=,-2,2)", async () => {
			const output = await evaluate("$(>=,-2,2)");
			assert.equal(output, "0");
		});

	});

});

describe("Logical", () => {

	describe("$(EQ,<val1>,<val2>)", () => {

		test("$(eq,These strings are equal,These strings are equal)", async () => {
			const output = await evaluate("$(eq,These strings are equal,These strings are equal)");
			assert.equal(output, "1");
		});

		test("$(eq,These strings are equal,These strings are not equal)", async () => {
			const output = await evaluate("$(eq,These strings are equal,These strings are not equal)");
			assert.equal(output, "0");
		});

		test("$(eq,These neither,These Neither)", async () => {
			const output = await evaluate("$(eq,These neither,These Neither)");
			assert.equal(output, "0");
		});

	});

	describe("$(AND,<val1>,<val2>,...<valn>))", () => {

		test("$(and)", async () => {
			const output = await evaluate("$(and)");
			assert.equal(output, "1");
		});

		test("$(and,276)", async () => {
			const output = await evaluate("$(and,276)");
			assert.equal(output, "276");
		});

		test("$(and,0x1234,0xF)", async () => {
			const output = await evaluate("$(and,0x1234,0xF)");
			assert.equal(output, "4");
		});

		test("$(and,0x10FF,0x1FF,63)", async () => {
			const output = await evaluate("$(and,0x10FF,0x1FF,63)");
			assert.equal(output, "63");
		});

	});

	describe("$(OR,<val1>,<val2>,...<valn>))", () => {

		test("$(or)", async () => {
			const output = await evaluate("$(or)");
			assert.equal(output, "0");
		});

		test("$(or,276)", async () => {
			const output = await evaluate("$(or,276)");
			assert.equal(output, "276");
		});

		test("$(or,0x1000,1)", async () => {
			const output = await evaluate("$(or,0x1000,1)");
			assert.equal(output, "4097");
		});

		test("$(or,0x1000,0x200,0x30,0x4)", async () => {
			const output = await evaluate("$(or,0x1000,0x200,0x30,0x4)");
			assert.equal(output, "4660");
		});

	});

	describe("$(XOR,<val1>,<val2>,...<valn>)", () => {

		test("$(xor)", async () => {
			const output = await evaluate ("$(xor)");
			assert.equal(output, "0");
		});

		test("$(xor,276)", async () => {
			const output = await evaluate ("$(xor,276)");
			assert.equal(output, "276");
		});

		test("$(xor,0xF0,0x81)", async () => {
			const output = await evaluate ("$(xor,0xF0,0x81)");
			assert.equal(output, "113");
		});

		test("$(xor,0xF000,0x6200,0x31,0x8005)", async () => {
			const output = await evaluate ("$(xor,0xF000,0x6200,0x31,0x8005)");
			assert.equal(output, "4660");
		});

	});

	describe("$(IF,<expr>,<dotrue>,<dofalse>)", () => {

		test("$(if,0,true,false)", async () => {
			const output = await evaluate("$(if,0,true,false)");
			assert.equal(output, "false")
		});

		test("$(if,1,true,false)", async () => {
			const output = await evaluate("$(if,1,true,false)");
			assert.equal(output, "true")
		});

		test("$(if,-2873,true,false)", async () => {
			const output = await evaluate("$(if,-2873,true,false)");
			assert.equal(output, "true")
		});

		test("$(if,1,evaluated,$(bogus bogus not evaluated))", async () => {
			const output = await evaluate("$(if,1,evaluated,$(bogus bogus not evaluated))");
			assert.equal(output, "evaluated")
		});

		test("$(if,0,$(bogus bogus not evaluated),evaluated)", async () => {
			const output = await evaluate("$(if,0,$(bogus bogus not evaluated),evaluated)");
			assert.equal(output, "evaluated")
		});

		test("$(if,1,true only)", async () => {
			const output = await evaluate("$(if,1,true only)");
			assert.equal(output, "true only")
		});

		test("$(if,0,true only)", async () => {
			const output = await evaluate("$(if,0,true only)");
			assert.equal(output, "");
		});

	});

});

describe("String", () => {

	describe("$(STRFILL,<string>,<ncopies>)", async () => {

		test("$(strfill,,500)", async () => {
			const output = await evaluate("$(strfill,,500)");
			assert.equal(output, "");
		});

		test("$(strfill,.,75)", async () => {
			const output = await evaluate("$(strfill,.,75)");
			assert.equal(output, "...........................................................................");
		});

		test("$(strfill,this never is output,0)", async () => {
			const output = await evaluate("$(strfill,this never is output,0)");
			assert.equal(output, "");
		});

		test("$(strfill,this never is output,-1)", async () => {
			const output = await evaluate("$(strfill,this never is output,-1)");
			assert.equal(output, "");
		});


	});

	describe("(STRLEN,<string>)", async () => {

		test("$(strlen,)", async () => {
			const output = await evaluate("$(strlen,)");
			assert.equal(output, "0");
		});

		test("$(strlen, )", async () => {
			const output = await evaluate("$(strlen, )");
			assert.equal(output, "1");
		});

		test("$(strlen,hello there)", async () => {
			const output = await evaluate("$(strlen,hello there)");
			assert.equal(output, "11");
		});

	});

	describe("$(SUBSTR,<string>,<start>,<length>)", () => {

		test("$(substr,hello there,7)", async () => {
			const output = await evaluate("$(substr,hello there,7)");
			assert.equal(output, "there");
		});

		test("This is $(substr,hello there,7,3) right answer", async () => {
			const output = await evaluate("This is $(substr,hello there,7,3) right answer");
			assert.equal(output, "This is the right answer");
		});

		test("$(substr,hello there,2,0)", async () => {
			const output = await evaluate("$(substr,hello there,2,0)");
			assert.equal(output, "");
		});

		test("$(substr,hello there,23,12)", async () => {
			const output = await evaluate("$(substr,hello there,23,12)");
			assert.equal(output, "");
		});

	});

	describe("$(UPPER,<string>)", () => {

		test("$(upper,lower case)", async () => {
			const output = await evaluate("$(upper,lower case)");
			assert.equal(output, "LOWER CASE");
		});

		test("$(upper,UPPER CASE)", async () => {
			const output = await evaluate("$(upper,UPPER CASE)");
			assert.equal(output, "UPPER CASE");
		});

		test("$(upper,123456789 !@#$%^&* =+\|`~-_ []{} ;: <>./? Mixed Case)", async () => {
			const output = await evaluate("$(upper,123456789 !@#$%^&* =+\|`~-_ []{} ;: <>./? Mixed Case)");
			assert.equal(output, "123456789 !@#$%^&* =+\|`~-_ []{} ;: <>./? MIXED CASE");
		});

	});

});

describe("Other", () => {

	describe("$(FIX,<value>)", () => {

		test("$(fix,3.75)", async () => {
			const output = await evaluate("$(fix,3.75)");
			assert.equal(output, "3");
		});

		test("$(fix,-11.99)", async () => {
			const output = await evaluate("$(fix,-11.99)");
			assert.equal(output, "-11");
		});

	});

	describe("$(INDEX,<which>,<string>)", () => {

		test("$(index,0,\"first,second,third\")", async () => {
			const output = await evaluate("$(index,0,\"first,second,third\")");
			assert.equal(output, "first");
		});

		test("$(index,1,\"first,second,third\")", async () => {
			const output = await evaluate("$(index,1,\"first,second,third\")");
			assert.equal(output, "second");
		});

		test("$(index,2,\"first,second,third\")", async () => {
			const output = await evaluate("$(index,2,\"first,second,third\")");
			assert.equal(output, "third");
		});

		test("$(index,3,\"first,second,third\")", async () => {
			const output = await evaluate("$(index,3,\"first,second,third\")");
			assert.equal(output, "");
		});

	});

	describe("$(NTH,<which>,<arg0>,<arg1>,...<argN>)", () => {

		test("$(nth,0,first,second,third)", async () => {
			const output = await evaluate("$(nth,0,first,second,third)");
			assert.equal(output, "first");
		});

		test("$(nth,1,first,second,third)", async () => {
			const output = await evaluate("$(nth,1,first,second,third)");
			assert.equal(output, "second");
		});

		test("$(nth,2,first,second,third)", async () => {
			const output = await evaluate("$(nth,2,first,second,third)");
			assert.equal(output, "third");
		});

		test("$(nth,1,$(bogus not evaluated),evaluated,$(bogus not evaluated))", async () => {
			const output = await evaluate("$(nth,1,$(bogus not evaluated),evaluated,$(bogus not evaluated))");
			assert.equal(output, "evaluated");
		});

	});

	describe("$(EVAL,<str>)", () => {

		test("$(eval,\"$(+,1,2,3)\")", async () => {
			const output = await evaluate("$(eval,\"$(+,1,2,3)\")");
			assert.equal(output, "6");
		});

	});

});

describe("Variables", () => {

	// TODO: Finish those test

	test("$(setvar,kelvin,Hello there)$(getvar,kelvin)", async () => {
		const output = await evaluate("$(setvar,kelvin,Hello there)$(getvar,kelvin)");
		assert.equal(output, "Hello there");
	});

	test("$(setvar,pierre,Bonjour mesdames et messieurs)$(getvar,pierre)$(getvar,kelvin)", async () => {
		const output = await evaluate("$(setvar,pierre,Bonjour mesdames et messieurs)$(getvar,pierre)$(getvar,kelvin)");
		assert.equal(output, "Bonjour mesdames et messieursHello there");
	});

	test.skip("$(setvar,kelvin,Buenos dias)$(getvar,pierre)$(getvar,kelvin)", async () => {
		const output = await evaluate("$(setvar,kelvin,Buenos dias)");
		assert.equal(output, "Bonjour mesdames et messieursBuenos dias");
	});

	test.skip("$(setvar,pierre,$(getvar,kelvin))$(getvar,pierre)$(getvar,kelvin)", async () => {
		const output = await evaluate("$(setvar,pierre,$(getvar,kelvin))$(getvar,pierre)$(getvar,kelvin)");
		assert.equal(output, "Buenos diasBuenos dias");
	});

	test.skip("$(setvar,filler,$(strfill,-,75))$(getvar,pierre)$(getvar,kelvin)$(getvar,filler)", async () => {
		const output = await evaluate("$(setvar,filler,$(strfill,-,75))$(getvar,pierre)$(getvar,kelvin)$(getvar,filler)");
		assert.equal(output, "Buenos diasBuenos dias");
	});

});

describe("Unix", () => {

	// TODO: Add test for UNIX functions

});

describe("Errors", () => {

	describe("evaluate", () => {

		describe("Missing right paren", () => {

			test("$(bogus", async () => {
				await assert.rejects(async () => await evaluate("$(bogus"), DieselSyntaxError);
			});

			test("$(bogus$(bogus", async () => {
				await assert.rejects(async () => await evaluate("$(bogus$(bogus"), DieselSyntaxError);
			});

		});

		describe("Runaway string", async () => {

			test("$(\"Where's the closing quote?)", async () => {
				await assert.rejects(async () => await evaluate("$(\"\"\"Here's trouble\"\")"), DieselSyntaxError);
			});

			test("$(\"\"\"Here's trouble\"\")", async () => {
				await assert.rejects(async () => await evaluate("$(\"\"\"Here's trouble\"\")"), DieselSyntaxError);
			});

		});

		describe("Unknown function", async () => {

			test("$(binky)", async () => {
				await assert.rejects(async () => await evaluate("$(binky)"), DieselUnknownFunctionError);
			});

			test("$()", async () => {
				// TODO: Is this correct type of error?
				await assert.rejects(async () => await evaluate("$()"), DieselUnknownError);
			});

		});

		describe("Incorrect arguments", async () => {

			// TODO: Fix those tests

			test("$(+,1,2,three)", async () => {
				await assert.rejects(async () => await evaluate("$(+,1,2,three)"), DieselIncorrectFunctionArgumentsError);
			});

			test("$(upper,only takes,one argument)", async () => {
				await assert.rejects(async () => await evaluate("$(upper,only takes,one argument)"), DieselIncorrectFunctionArgumentsError);
			});

			test("$(=,1)", async () => {
				await assert.rejects(async () => await evaluate("$(=,1)"), DieselIncorrectFunctionArgumentsError);
			});

		});

		describe("String too long", async () => {

			test.skip("$(strfill,.,80)$(strfill,-,80)$(strfill,*,80)", async () => {
				// TODO: Fix this test
				await assert.rejects(async () => await evaluate("$(strfill,.,80)$(strfill,-,80)$(strfill,*,80)"), DieselOutputTooLongError);
			});

			test.skip("$(strfill,*hello*,100)", async () => {
				await assert.rejects(async () => await evaluate("$(strfill,*hello*,100)"), DieselOutputTooLongError);
			});

		});

	});

	describe("evaluateC", () => {

		describe("Missing right paren", () => {

			test("$(bogus", async () => {
				const output = await evaluateC("$(bogus");
				assert.equal(output.output, "$?");
				assert.equal(output.return, 7);
			});

			test("$(bogus$(bogus", async () => {
				const output = await evaluateC("$(bogus");
				assert.equal(output.output, "$?");
				assert.equal(output.return, 7);
			});

		});

		describe("Runaway string", async () => {

			test("$(\"Where's the closing quote?)", async () => {
				const output = await evaluateC("$(\"Where's the closing quote?)");
				assert.equal(output.output, "$?");
				assert.equal(output.return, 30);
			});

			test("$(\"\"\"Here's trouble\"\")", async () => {
				const output = await evaluateC("$(\"\"\"Here's trouble\"\")");
				assert.equal(output.output, "$?");
				assert.equal(output.return, 22);
			});

		});

		describe("Unknown function", async () => {

			test("$(binky)", async () => {
				const output = await evaluateC("$(binky)");
				assert.equal(output.output, " $(BINKY)?? ");
				assert.equal(output.return, 8);
			});

			test("$()", async () => {
				const output = await evaluateC("$()");
				assert.equal(output.output, " $()?? ");
				assert.equal(output.return, 3);
			});

		});

		describe("Incorrect arguments", async () => {

			test("$(+,1,2,three)", async () => {
				const output = await evaluateC("$(+,1,2,three)");
				assert.equal(output.output, " $(+,??) ");
				assert.equal(output.return, 14);
			});

			test("$(upper,only takes,one argument)", async () => {
				const output = await evaluateC("$(upper,only takes,one argument)");
				assert.equal(output.output, " $(UPPER,??) ");
				assert.equal(output.return, 32);
			});

			test("$(=,1)", async () => {
				const output = await evaluateC("$(=,1)");
				assert.equal(output.output, " $(=,??) ");
				assert.equal(output.return, 6);
			});

		});

		describe("String too long", async () => {

			test.skip("$(strfill,.,80)$(strfill,-,80)$(strfill,*,80)", async () => {
				// TODO: Fix this test
				const output = await evaluateC("$(strfill,.,80)$(strfill,-,80)$(strfill,*,80)");
				assert.equal(output.output, " $(++)");
				assert.equal(output.return, 7);
			});

			test("$(strfill,*hello*,100)", async () => {
				const output = await evaluateC("$(strfill,*hello*,100)");
				assert.equal(output.output, " $(++)");
				assert.equal(output.return, 22);
			});

		});

	});

});
