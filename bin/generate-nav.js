/** Type Predicates */
var is = function(o, type) {
    return Object.prototype.toString.call(o) === '[object ' + type + ']';
};

var is_number = function(o) {
    return is(o, 'Number');
};

var is_string = function(o) {
    return is(o, 'String');
};

var is_array = function(o) {
    return is(o, 'Array');
};

var is_java_array = function(o) {
    return is(o, 'JavaArray');
};

var is_object = function(o) {
    return is(o, 'Object');
};

var is_java_object = function(o) {
    return is(o, 'JavaObject');
};

/** Functional Utilities */

var map = function(o, fn) {
    var res = [];
    if (is_array(o) || is_java_array(o)) {
        for (var i = 0; i < o.length; i++) {
            res.push(fn(i, o[i]));
        }
    } else if (is_object(o)) {
        for (var m in o) {
            res.push(fn(m, o[m]));
        }
    } else {
        res = fn(o);
    }
    return res;
};

/** JSON Utility */

var json_encode_string = function(o) {
    return '"' + o.replace(/"/g, '\\"') + '"';
};

var json_encode_array = function(o) {
    return '[' + map(o, function(i, e) {
        return json_encode(e);
    }).join(',') + ']';
};

var json_encode_object = function(o) {
    return '{' + map(o, function(key, value) {
        return json_encode(key) + ':' + json_encode(value);
    }).join(',') + '}';
};

var json_encode = function(o) {
    if (is_object(o)) {
        return json_encode_object(o);
    } else if (is_array(o)) {
        return json_encode_array(o);
    } else if (is_string(o)) {
        return json_encode_string(o);
    } else if (is_java_object(o)) {
        return json_encode_string(String(o.toString()));
    } else {
        return String(o);
    }
};

/** Navigator Menu Generator */

var htmlFileFilter = new java.io.FileFilter() {
    accept: function(file) {
        return file.isDirectory()
            || (file.isFile() && file.getName().endsWith(".html"));
    }
};

var expandedFileFilter = new java.io.FileFilter() {
    accept: function(file) {
        return file.isFile()
            && file.getName().equalsIgnoreCase("expanded");
    }
};

var getFileFirstLine = function(file) {
    var line = '';
    var fin = new java.util.Scanner(file);
    if (fin.hasNextLine()) {
        line = String(fin.nextLine());
    }
    fin.close();
    return line;
};

var getFileTitle = function(file) {
    var line = getFileFirstLine(file);
    var title = /title="([^"]+)"/.exec(line);
    if (title && title.length >= 2) {
        return title[1];
    } else {
        return '';
    }
};

var i18n_zh_CN = {
    'software': '软件人生',
    'programming': '程序设计方法',
    'kill-if': '消灭成堆的分支语句',
    'code': '物尽其（奇）用',
    'basic': 'BASIC解释器',
    'shell': '脚本小子',
    'thinking': '思考与感悟',
    'tool-tips': '善用佳软',
    'reading-room': '阅读室',
    'learning': '学习方法',
    'happy-life': '幸福生活'
};

var go_folder = function(folder) {
    var id = folder.getName();
    var o = {
        id: id,
        text: i18n_zh_CN[id] || id,
        expanded: folder.listFiles(expandedFileFilter).length > 0,
        children: []
    };

    var list = folder.listFiles(htmlFileFilter);
    o.children = map(list, function(i, e) {
        return go(e);
    });

    return o;
};

var go_file = function(file) {
    return {
        id: file.getName(),
        text: getFileTitle(file),
        leaf: true
    };
};

var go = function(file) {
    if (file.isDirectory()) {
        return go_folder(file);
    } else {
        return go_file(file);
    }
};

var nav = function(path) {
    var dir = new java.io.File(path);
    var json = go(dir);
    json.success = true;
    return json;
};

print(json_encode(nav('data')));
