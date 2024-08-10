#! /bin/bash
# Remove previous diesel build
rm -rf ./dist/diesel.wasm
rm -rf ./dist/diesel.js
# Upack diesel.tar.gz
cd ./source && tar -xzf ./diesel.tar.gz
cd ../
# Compile diesel.c to diesel.wasm
docker run --rm -v ./source:/src -w /src emscripten/emsdk emcc diesel.c \
    -s WASM=1 \
    -s EXPORTED_FUNCTIONS="['_diesel']" \
    -s EXPORTED_RUNTIME_METHODS="['allocateUTF8', 'UTF8ToString']" \
    -o diesel.js
# Move diesel.wasm and diesel.js to dist
mv ./source/diesel.wasm ./dist/diesel.wasm
mv ./source/diesel.js ./dist/diesel.js
