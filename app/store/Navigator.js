Ext.define('iKnowledge.store.Navigator', {
    extend: 'Ext.data.TreeStore',
    require: ['iKnowledge.model.Navigator'],
    model: 'iKnowledge.model.Navigator',

    proxy: {
        type: 'ajax',
        url: 'data/navigator.json',
        reader: 'json'
    }
});
