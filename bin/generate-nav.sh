#!/bin/bash

cd $(dirname "$0")
cd ..

java -cp "$CLASSPATH:$HOME/lib/js.jar" -Dfile.encoding=UTF-8 org.mozilla.javascript.tools.shell.Main -f bin/generate-nav.js
