/**
 * Created by Administrator on 2015/3/26 0026.
 */

    //定义一个索引
var currentIndex = -1 ;
var ActionManagerTestLayer = BaseLayer.extend({


    // 重新测试
    onRestartCall: function () {
        var sence = new ActionManagerTestSence();
        var layer = null;
        sence.addChild(layer);
        director.runScene(sence);
    },
    // 前一个
    onPreCall: function () {

    },
    // 后一个
    onBackCall:function(){

    }

});

var ActionManagerTestSence = MainTestScene.extend({

    runThisTest:function(){
        var layer = null;
        director.runScene(this);
    }
});