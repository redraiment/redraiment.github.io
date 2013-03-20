#!/bin/bash

cd $(dirname "$0")
cd ..

# Generate Navigator
bin/generate-nav.sh > data/navigator.json

# local | remote
target=${1:-local}

rm -rf ${target}/{app,data,resources,mobile,index.html}
cp -r app data resources mobile index.html "${target}/"
