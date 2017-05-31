/**
 * Created by admin on 2017/5/24.
 */
'use strict';

var DEFAULT_INTERVAL = 1000 / 60;

/**
 * raf
 */
var requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            function (callback) {
                return window.setTimeout(callback,callback.interval ||
                DEFAULT_INTERVAL
                );
            }
})();

var cancelAnimationFrame = ()function () {
    return window.cancelAnimationFrame()||
            window.webkitCancelAnimationFrame()||
            window.mozCancelAnimationFrame()||
            window.oCancelAnimationFrame()||
            function(id){

            }
}();