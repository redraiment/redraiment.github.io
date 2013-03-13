Ext.define('iKnowledge.view.Navigator', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.navigator',

    title: 'iKnowledge',
    collapsible: true,
    resizable: true,
    rootVisible: false,

    store: 'Navigator',

    initComponent: function() {
        this.callParent(arguments);
    }
});
