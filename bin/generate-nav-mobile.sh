#!/bin/bash

cd $(dirname "$0")
cd ..

echo '<dl class="navigator">'
find data -type d | while read d; do
    count=$(find $d -maxdepth 1 -type f -name '*.html' | wc -l)
    if [ $count -gt 0 ]; then
        p=${d#data}
        if [ -z $p ]; then
            p=/
        fi
        p=$(sed -e 's/software/软件人生/g' \
                -e 's/programming/程序设计方法/g' \
                -e 's/algorithm/算法/g' \
                -e 's/hdu/杭电100题/g' \
                -e 's/kill-if/消灭成堆的分支语句/g' \
                -e 's/code/物尽其（奇）用/g' \
                -e 's/basic/BASIC解释器/g' \
                -e 's/shell/脚本小子/g' \
                -e 's/thinking/思考与感悟/g' \
                -e 's/tool-tips/善用佳软/g' \
                -e 's/reading-room/阅读室/g' \
                -e 's/learning/学习方法/g' \
                -e 's/happy-new-year/新年快乐/g' \
                -e 's/happy-life/幸福生活/g' <<< "$p")
        echo "<dt>${p}</dt>"

        find $d -maxdepth 1 -type f -name '*.html' | while read f; do
            title=$(sed -e 's/^<div title="//' -e 's/".*//' -e '1q' "$f")
            echo "<dd><a href=\"mobile.html?p=${f}\" target=\"_blank\">${title}</a></dd>"
        done
    fi
done
echo '</dl>'
