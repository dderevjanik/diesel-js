import assert from "node:assert";
import { describe, test } from "node:test";
import { evaluate } from "./index";

describe("Arithmetic", () => {

	describe("$(+)", () => {

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

	describe("$(-)", () => {

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

	describe("$(*)", () => {

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

	describe("$(/)", () => {

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

	describe("$(=)", () => {

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

	describe("$(<)", () => {

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

	describe("$(>)", () => {

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

	describe("$(!=)", () => {

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

	describe("$(<=)", () => {

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

	describe("$(>=)", () => {

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

	describe("$(AND)", () => {

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

	describe("$(OR)", () => {

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

	describe("$(XOR)", () => {

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

	describe("$(IF)", () => {

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

	describe("$(STRFILL)", async () => {

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

	describe("$(STRLEN)", async () => {

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

	describe("$(SUBSTR", () => {

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

	describe("$(UPPER)", () => {

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
