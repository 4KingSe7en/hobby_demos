/**
 * Created by Larry_lee on 2015/3/17 0017.
 */
//定义几个常量给按钮设置TAG

var BASE_LAYER_TITLE_TAG = 101;
var BASE_LAYER_MENU_TAG = 102;


var BASE_LAYER_MENUITEM_PRE_TAG = 103;
var BASE_LAYER_MENUITEM_NEXT_TAG = 104;
var BASE_LAYER_MENUITEM_RESTART_TAG = 105;

var BaseLayer = cc.LayerGradient.extend({

    title: "BaseLayer",
    _title:"",

    ctor: function (start, end) {

        // grabageCollect
        cc.sys.garbageCollect();

        // default gradient colors
        var a = cc.color(98, 99, 117, 255);
        var b = cc.color(0, 0, 0, 255);

        if (arguments.length >= 1)
            a = start;
        if (arguments.length == 2)
            b = end;

        this._super(a, b);
    },

    onEnter:function(){
        this._super();
        //添加标题
        var title = this.getTitle();
        var titleTTF = new cc.LabelTTF(title,"Arial",28);
        this.addChild(titleTTF,100,BASE_LAYER_TITLE_TAG);

        // normalImage, selectedImage, three, four, five
        var item1 = new cc.MenuItemImage(s_pathB1,s_pathB2,this.onBackCall(),this);
        var item2 = new cc.MenuItemImage(s_pathR1,s_pathR2,this.onBackCall(),this);
        var item3 = new cc.MenuItemImage(s_pathF1,s_pathF2,this.onBackCall(),this);

        item1.tag = BASE_LAYER_MENUITEM_PRE_TAG;
        item2.tag = BASE_LAYER_MENUITEM_RESTART_TAG;
        item3.tag = BASE_LAYER_MENUITEM_NEXT_TAG
        //添加三个按钮 前 后 restart
        var menu = new cc.Menu(item1,item2,item3)

        var _item_width = item2.width,_item_height = item2.height;

        item1.setPosition(cc.p(winSize.width/2 - _item_width,_item_height / 2));
        item1.setPosition(cc.p(winSize.width/2 ,_item_height / 2));
        item1.setPosition(cc.p(winSize.width/2 + _item_width,_item_height / 2));

        this.addChild(menu,102,BASE_LAYER_MENU_TAG);


    },

    getTitle: function () {
        if('title' in this){
            return this.title;
        }else if('_title' in this){
            return this._title;
        }
    },
    onRestartCall: function () {

    },
    onPreCall: function () {

    },
    onBackCall:function(){

    }
})