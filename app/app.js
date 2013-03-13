Ext.application({
    name: 'iKnowledge',
    appFolder: 'app',

    controllers: [
        'Navigator',
        'ArticleBox'
    ],

    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            items: [{
                region: 'west',
                width: 300,
                xtype: 'navigator',
                id: 'nav'
            }, {
                region: 'center',
                xtype: 'articlebox',
                id: 'main'
            }]
        });
    }
});
