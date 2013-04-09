if (Ext.is.Phone && !/mobile\.html/.test(document.referer)) {
    location.href = location.protocol + '//'
                  + location.hostname + '/mobile.html'
                  + location.search;
}

// For Google Analytics
var _gaq = [
    ['_setAccount', 'UA-39440649-1'],
    ['_trackPageview']
];

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
