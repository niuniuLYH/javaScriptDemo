/**
 * 函数节流的方法
 */
var processor = {
    timeoutId : null,
    //实际进行处理的方法
    performProcessing : function (){
        console.log('hahahha');
    },
    process : function(){
        clearTimeout(this.timeoutId);
        var that = this;
        this.timeoutId = setTimeout(function() {
            that.performProcessing();
        }, 100);
    }
}


/**
 * 函数节流方法的升级版。只要用于resize事件中。
 * @param {*} method 
 * @param {*} context 
 */
function throttle(method,context){
    clearTimeout(method.tId);
    method.tId = setTimeout(function() {
        method.call(context);
    }, 100);
}