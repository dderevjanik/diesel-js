#! /bin/bash
cd "$(dirname "${0}")" || exit 1
# Remove previous diesel build
rm -rf ./dist/diesel.wasm
rm -rf ./dist/diesel.js
# Upack diesel.tar.gz
cd ./diesel && tar -xzf ./diesel.tar.gz
cd ../
# Compile diesel.c to diesel.wasm
# NOTE: In order to use GETVAR and SETVAR methods, we need to use VARIABLES flag
# which needs to include stdlib.h
docker run --rm -v ./diesel:/src -w /src emscripten/emsdk emcc diesel.c \
    -s WASM=1 \
	-DVARIABLES \
	-include stdlib.h \
    -s EXPORTED_FUNCTIONS="['_diesel']" \
    -s EXPORTED_RUNTIME_METHODS="['allocateUTF8', 'UTF8ToString']" \
    -o diesel.js
# Move diesel.wasm and diesel.js to dist
mv ./diesel/diesel.wasm ./src/diesel.wasm
mv ./diesel/diesel.js ./src/diesel.js
