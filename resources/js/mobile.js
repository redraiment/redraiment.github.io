var url = 'data/navigator.mobile.xml';
var hash = location.hash;
var search = location.search;
if (/^#!/.test(hash)) {
    url = hash.substr(2);
} else if (/^\?p=/.test(search)) {
    url = search.substr(3);
}

var ajax = new Ajax();
ajax.get(url, function(text) {
    text = text.replace(/<script.+<\/script>/g, '');
    var pcURL = location.href.replace(/mobile\.html/, '');
    text = '<a class="version-convert" href="' + pcURL
         + '">切换到桌面版</a>' + text;
    document.body.innerHTML = text;
});

// For Google Analytics
var _gaq = [
    ['_setAccount', 'UA-39440649-1'],
    ['_trackPageview']
];
