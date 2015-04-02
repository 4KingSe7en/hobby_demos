/**
 * Created by Administrator on 2015/3/24 0024.
 */


var winSize;
var director;

var LINE_SPACE = 40;
var curPos = cc.p(0, 0);
var TestWelcomeLayer = cc.LayerGradient.extend({
    _menuItem: null,

    ctor: function () {

        this._super(cc.color(0, 0, 0, 255), cc.color(0x46, 0x82, 0xB4, 255));

        director = cc.director;
        winSize = cc.director.getWinSize();

        //加菜单
        this._menuItem = new cc.Menu();
        for (var i = 0; i < demos.length; i++) {
            var title = demos.title;
            var menuLabel = new cc.LabelTTF(title, "Arial", 24);
            var menuItem = new cc.MenuItemLabel(menuLabel, this.onMenuCallBack, this);

            //设置添加这个菜单，并设置一个Zorder 相当于给菜单添加一个序号，方便后面获取 是第几个菜单
            this._menuItem.addChild(menuItem, i + 1000);
            menuItem.setPosition(new cc.Point(winSize.width / 2, winSize.height - (i + 1) * LINE_SPACE));
        }

        this._menuItem.width = winSize.width;
        this._menuItem.height = 20 * LINE_SPACE;
        this._menuItem.setPosition(curPos);

        this.addChild(this._menuItem);

        if ('touch' in cc.sys.capabilities) {
            cc.eventManager.addListener({
                event: cc.Event.TOUCH_ALL_AT_ONCE,
                onTouchesMoved: function (touches, event) {
                    var target = event.getCurrentTarget();
                    var delta = touches[0].getDelta();
                    target.moveMenu(delta);
                    return true;
                }
            }, this);
        } else if ('mouse' in cc.sys.capabilities) {
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseMove: function (event) {
                    if (event.getButton() == cc.EventMouse.BUTTON_LEFT)
                        event.getCurrentTarget().moveMenu(event.getDelta());
                },
                onMouseScroll: function (event) {
                    var delta = cc.sys.isNative ? event.getScrollY() * 6 : -event.getScrollY();
                    event.getCurrentTarget().moveMenu({y: delta});
                    return true;
                }
            }, this);
        }

    },

    onEnter: function () {
        this._super();
        this._menuItem.y = TestWelcomeLayer.YoffSet
    },

    onMenuCallBack: function (sender) {
        TestWelcomeLayer.YoffSet = this._menuItem.y;
        //获取当前是第几个菜单
        var index = sender.getLocalZOrder() - 1000;

        var demo = demos[index];
        var res = demo.resource || [];
        cc.LoaderScene.preload(res, function () {
            var scene = demo.scene();
            if (scene) {
                scene.runThisTest();
            }
        });
    },

    moveMenu: function (delta) {
        var newY = this._menuItem.y + delta.y;
        if (newY < 0)
            newY = 0;

        if (newY > ((20 + 1) * LINE_SPACE - winSize.height))
            newY = ((20 + 1) * LINE_SPACE - winSize.height);

        this._menuItem.y = newY;
    }

});
//记录一个菜单被调整过的位置
TestWelcomeLayer.YoffSet = 0;
var demos = [
    {
        title: "ActionManagerTest",
        linkSrc: "",
        scene: function () {
             return new ActionManagerTest();
        }
    }
]