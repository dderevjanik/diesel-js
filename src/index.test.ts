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

	// TODO: FINISH

});
