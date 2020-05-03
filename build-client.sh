#!/bin/bash

cd client
npm run build
cd ..
if [ -f build ]; then
    rm -r build/
fi
cp -r client/build .