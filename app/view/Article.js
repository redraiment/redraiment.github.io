Ext.define('iKnowledge.view.Article', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.article',

    autoScroll: true,
    closable: true,

    constructor: function (config) {
        var me = this;
        var mobileUrl = this.getUrl() + 'mobile.html?p=' + config.url;

        config.tbar = ['分享到：', {
            xtype: 'button',
            text: '新浪微博',
            iconCls: 'icon-share-sina',
            listeners: {
                click: {
                    fn: me.onShareSina,
                    scope: me
                }
            }
        }, '-', {
            xtype: 'button',
            text: '复制本文链接',
            iconCls: 'icon-copy-link',
            listeners: {
                click: {
                    fn: me.onCopyLink,
                    scope: me
                }
            }
        }, '<a href="' + mobileUrl + '">切换到移动版</a>'];
        config.loader = {
            autoLoad: true,
            scripts: true,
            url: config.url,
            listeners: {
                load: {
                    fn: me.afterLoad,
                    scope: me
                }
            }
        };

        this.callParent(arguments);
    },

    afterLoad: function () {
        var me = this;

        var dom = Ext.DomQuery.select('.article-content', me.el.dom);
        me.setTitle((dom && dom.length)? dom[0].title: 'New Tab');

        var href = Ext.DomQuery.select('span.tab-href', dom);
        Ext.Array.each(href, function(e) {
            e.onclick = function() {
                Ext.getCmp('main').open(me.getAbsolutePath(e.title));
            };
        });

        Rainbow.color();
    },

    getAbsolutePath: function(path) {
        if (/^\//.test(path)) {
            return path.substr(1);
        }

        var currentPath = this.id.substr(4);
        var dirname = currentPath.split('/');
        dirname.pop();

        Ext.Array.each(path.split('/'), function(e) {
            if (e == '..') {
                dirname.pop();
            } else {
                dirname.push(e);
            }
        });

        return dirname.join('/');
    },

    getUrl: function() {
        return window.location.protocol + '//'
             + window.location.hostname
             + window.location.pathname;
    },

    getPath: function() {
        return this.getUrl() + '?p=' + this.id.substr(4);
    },

    onShareSina: function() {
        var dom = Ext.DomQuery.select('img', this.el.dom);
        var picture = (dom && dom.length)? dom[0].src: '';

        var sina = 'http://service.weibo.com/share/share.php?';
        var param = {
            url: this.getPath(),
            appkey: '',
            title: '《' + this.title + '》',
            pic: picture,
            ralateUid: '1776428432',
	        language: 'zh_cn'
        };
        var query = Ext.Object.toQueryString(param);
        window.open(sina + query, '_blank', 'width=615,height=505');
    },

    onCopyLink: function() {
        Ext.Msg.prompt(this.title, '', Ext.emptyFn, this, true, this.getPath());
    }
});
