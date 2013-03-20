#!/bin/bash

cd $(dirname "$0")
cd ..

echo '<dl class="navigator">'
find data -type d | while read d; do
    p=${d#data}
    if [ -z $p ]; then
        p=/
    fi
    count=$(find $d -depth 1 -type f -name '*.html' | wc -l)
    if [ $count -gt 0 ]; then
        echo "<dt>${p}</dt>"
        find $d -depth 1 -type f -name '*.html' | while read f; do
            title=$(sed -e 's/^<div title="//' -e 's/".*//' -e '1q' "$f")
            echo "<dd><a href=\"mobile.html?p=${f}\" target=\"_blank\">${title}</a></dd>"
        done
    fi
done
echo '</dl>'
