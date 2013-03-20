#!/bin/bash

cd $(dirname "$0")
cd ..

# Generate Navigator
bin/generate-nav.sh > data/navigator.json

# local | remote
target=${1:-local}

rm -rf ${target}/{app,data,resources,index.html,mobile.html}
cp -r app data resources index.html mobile.html "${target}/"
