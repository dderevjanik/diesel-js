cd ./source && tar -xzf ./diesel.tar.gz
cd ../
docker run --rm -v ./source:/src -w /src emscripten/emsdk emcc diesel.c \
    -s EXPORTED_FUNCTIONS="['_diesel']" \
    -s EXPORTED_RUNTIME_METHODS="['allocateUTF8', 'UTF8ToString', 'malloc', 'free']" \
    -o diesel.js
mv ./source/diesel.js ./dist/diesel.js
mv ./source/diesel.wasm ./dist/diesel.wasm