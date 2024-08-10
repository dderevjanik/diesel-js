const fs = require('fs');
const path = require('path');

// Load the WebAssembly binary
const wasmBuffer = fs.readFileSync(path.join(__dirname, 'diesel.wasm'));

// Define the import object, particularly the `env` object
const importObject = {
    env: {
        memory: new WebAssembly.Memory({ initial: 256, maximum: 256 }), // Example memory object
        table: new WebAssembly.Table({ initial: 0, element: 'anyfunc' }), // Example table object
        __memory_base: 0, // Memory base (if required)
        __table_base: 0,  // Table base (if required)
        abort: () => console.log('abort called'), // Stub for abort function
        _emscripten_memcpy_js: (dest, src, num) => {
            const destView = new Uint8Array(importObject.env.memory.buffer, dest, num);
            const srcView = new Uint8Array(importObject.env.memory.buffer, src, num);
            destView.set(srcView);
        },
        emscripten_resize_heap: (requestedSize) => {
            console.log(`Requested heap resize to ${requestedSize}`);
            // You can return false or true depending on your needs. Returning false indicates a failure.
            return false;
        }
    }
};

// Create a WebAssembly instance with the import object
WebAssembly.instantiate(wasmBuffer, importObject).then((Module) => {
    // The `main` function is in the module's exports
    function allocateUTF8(str) {
        const encoder = new TextEncoder();
        const encodedStr = encoder.encode(str);
        const len = encodedStr.length;
        const ptr = Module.instance.exports.malloc(len + 1); // Allocate memory (including null terminator)
        const memory = new Uint8Array(importObject.env.memory.buffer, ptr, len + 1);
        memory.set(encodedStr);
        memory[len] = 0; // Null terminator
        return ptr;
    }

    function UTF8ToString(ptr) {
        const memory = new Uint8Array(importObject.env.memory.buffer);
        const strEnd = memory.indexOf(0, ptr); // Find null terminator
        const encodedStr = memory.subarray(ptr, strEnd);
        const decoder = new TextDecoder();
        return decoder.decode(encodedStr);
    }


    console.log(Module.instance.exports)
    const inPtr = allocateUTF8("$(+,1,1)");
    const outPtr = Module.instance.exports.malloc(1024);

    const res = Module.instance.exports.diesel(inPtr, outPtr);
    console.log(res);
    console.log(UTF8ToString(outPtr));

    // const memoryView = new Uint8Array(importObject.env.memory.buffer, inPtr, 1024);
    // console.log('Memory content:', memoryView);
}).catch((err) => {
    console.error('Error instantiating WebAssembly:', err);
});
