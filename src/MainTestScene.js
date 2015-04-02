/**
 * 主要的测试界面右上角有个 关闭按钮
 * Created by Administrator on 2015/3/24 0024.
 */

var MainTestScene = cc.Scene.extend({
    ctor:function(){
        this._super();
        this.init();

        var label = new cc.LabelTTF("Main","Arial",20);
        var menuItem = new cc.MenuItemLabel(label,this.onMainMenuCallBack,this);

        var menu = new cc.Menu(menuItem);

        this.addChild(menu,1);


    },

    onMainMenuCallBack:function(){
        var sence = new cc.Scene();
        var layer = new TestWelcomeLayer();
        sence.addChild(layer);
        // 效果
        var transiton = new cc.TransitionProgressRadialCCW(0.5,sence);
        director.runScene(transiton);
    },

    runThisTest:function(){
        // override me
    }

})
