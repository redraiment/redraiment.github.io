var url = 'data/navigator.mobile.xml';
var search = window.location.search;
if (/^\?p=/.test(search)) {
    url = search.substr(3);
}

var ajax = new Ajax();
ajax.get(url, function(text) {
    text = text.replace(/<script.+<\/script>/g, '');
    document.body.innerHTML = text;
});
