BEGIN {
    RS = "\n\n";
    FS = "\n";
}

{
    gsub(/^[[:space:]]+/, "", $2);
    print "<h2>"$1"</h2>";
    for (i = 2; i <= NF; i++) {
        gsub(/</, "\\&lt;", $i);
        gsub(/>/, "\\&gt;", $i);
        if ($1 ~ /Sample/) {
            if (i == 2) {
                if (i == NF) {
                    print "<pre>"$i"</pre>";
                } else {
                    print "<pre>"$i;
                }
            } else if (i == NF) {
                print $i"</pre>";
            } else {
                print $i;
            }
        } else {
            print "<p>"$i"</p>";
        }
    }
}
