var Ajax = function() {
    var request = null;

    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    } else if ( window.ActiveXObject ) {
        request = new ActiveXObject("Microsoft.XMLHTTP");
        if (!request) {
            request = new ActiveXObject("Msxml2.XMLHTTP");
        }
    }

    this.request = request;
};

Ajax.prototype.post = function(url, args, callback) {
    var request = this.request;
    if (!request) {
        return false;
    }

    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            callback && callback(request.responseText);
        }
    };
    request.open('POST', url, true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    var params = [];
    for (var name in args) {
        var value = escape(args[name]);
        params.push(name + '=' + value);
    }
    request.send(params.join('&'));

    return
};
