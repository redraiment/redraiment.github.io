#!/bin/bash

cd $(dirname "$0")
cd ..

fn=data/sitemaps.xml

rm -f $fn
fout() {
    echo "$@" >> $fn
}

fout '<?xml version="1.0" encoding="UTF-8"?>'
fout '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'
fout '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"'
fout '        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">'
find data -type f -name '*.html' | while read f; do
    fout '  <url>'
    fout "    <loc>http://redraiment.com/${f}</loc>"
    fout '    <changefreq>always</changefreq>'
    egrep -o 'resources[^"]+' "$f" | while read img; do
        fout '    <image:image>'
        fout "      <image:loc>http://redraiment.com/${img}</image:loc>"
        fout '    </image:image>'
    done
    fout '  </url>'
done
fout '</urlset>'
