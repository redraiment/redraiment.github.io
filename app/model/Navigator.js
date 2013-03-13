Ext.define('iKnowledge.model.Navigator', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'text',
        type: 'string'
    }, {
        name: 'expanded',
        type: 'boolean',
        defaultValue: true
    }, {
        name: 'leaf',
        type: 'boolean'
    }, {
        name: 'url',
        type: 'string'
    }]
});
