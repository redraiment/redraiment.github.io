Ext.define('iKnowledge.view.ArticleBox', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.articlebox',

    requires: ['iKnowledge.view.Article'],

    open: function(url) {
        var me = this;
        var id = 'tab-' + url;
        var tab = Ext.getCmp(id);

        if (!tab) {
            tab = me.add({
                xtype: 'article',
                id: id,
                title: 'New Tab',
                url: url
            });
        }
        tab.show();

        Ext.getCmp('nav').selectPath('/root' + url.substr(4));
    }
});
