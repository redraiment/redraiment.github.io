Ext.define('iKnowledge.view.ArticleBox', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.articlebox',

    requires: ['iKnowledge.view.Article'],

    open: function(url) {
        var me = this;
        var id = 'tab-' + url;
        var tab = Ext.getCmp(id);
        var path = '/root' + url.substr(4);

        if (!tab) {
            tab = me.add({
                xtype: 'article',
                id: id,
                title: 'New Tab',
                url: url,
                listeners: {
                    activate: function() {
                        Ext.getCmp('nav').selectPath(path);
                    }
                }
            });
        }
        tab.show();
    }
});
