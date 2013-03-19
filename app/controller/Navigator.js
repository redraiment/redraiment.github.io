Ext.define('iKnowledge.controller.Navigator', {
    extend: 'Ext.app.Controller',

    stores: ['Navigator'],
    models: ['Navigator'],
    views: ['Navigator'],
    statics: {
        rootNode: 'data',
        defaultPage: 'data/About.html',
        pathSeparator: '/'
    },

    init: function() {
        var me = this;
        me.control({
            'treepanel': {
                itemclick: {
                    fn: this.onItemClick,
                    scope: me
                },
                load: this.onLoad
            }
        });
    },

    onItemClick: function(view, record, item, index, e, options) {
        if (record.isLeaf()) {
            Ext.getCmp('main').open(this.getRecordPath(record));
        }
    },

    getRecordPath: function(record) {
        if (record.parentNode) {
            return this.getRecordPath(record.parentNode)
                 + iKnowledge.controller.Navigator.pathSeparator
                 + record.internalId;
        } else {
            return iKnowledge.controller.Navigator.rootNode;
        }
    },

    onLoad: function() {
        var url = this.getDefaultArticle();
        var path = '/root' + url.substr(4);
        Ext.getCmp('main').open(url);
        // Ext JS Bug: won't fire active event when add first tab.
        Ext.getCmp('nav').selectPath(path);
    },

    getDefaultArticle: function() {
        var url = iKnowledge.controller.Navigator.defaultPage;
        var search = window.location.search;

        if (search) {
            var param = Ext.Object.fromQueryString(search.substr(1));
            if (param['p']) {
                url = param['p'];
            }
        }

        return url;
    }
});
