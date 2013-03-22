var url = 'data/navigator.mobile.xml';
var hash = location.hash;
var search = location.search;
if (/^#!/.test(hash)) {
    url = hash.substr(2);
} else if (/^\?p=/.test(search)) {
    url = search.substr(3);
}


var getAbsolutePath = function(path) {
    if (/^\//.test(path)) {
        return path.substr(1);
    }

    var dirname = url.split('/');
    dirname.pop();

    var list = path.split('/');
    for (var i = 0; i < list.length; i++) {
        if (list[i] == '..') {
            dirname.pop();
        } else {
            dirname.push(list[i]);
        }
    }

    return dirname.join('/');
};

var insert_link = function() {
    var span = document.getElementsByTagName('span');
    for (var i = 0; i < span.length; i++) {
        var link = span[i];
        if (link.className == 'tab-href') {
            link.innerHTML = '<a href="mobile.html?p='
                           + getAbsolutePath(link.title)
                           + '">' + link.innerHTML
                           + '</a>';
        }
    }
};

var fetch_article = function(text) {
    text = text.replace(/<script.+<\/script>/g, '');
    var pcURL = location.href.replace(/mobile\.html/, '');
    text = '<a class="version-convert" href="' + pcURL
         + '">切换到桌面版</a>' + text;
    document.body.innerHTML = text;
    insert_link();
};


var ajax = new Ajax();
ajax.get(url, fetch_article);

// For Google Analytics
var _gaq = [
    ['_setAccount', 'UA-39440649-1'],
    ['_trackPageview']
];
