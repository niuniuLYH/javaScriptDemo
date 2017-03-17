/**
 * Created by liyh on 2017/3/16.
 */

/**
 * 模块。其中包含事件绑定方法【兼容ie6及以上】，阻止事件冒泡和默认事件方法，和一些兼容ie8及以下浏览器的方法
 * @element -- 第一个参数，绑定点击事件的dom元素
 * @eType -- 事件类型
 * @handle -- 事件触发的方法
 * @bol -- 是否在事件冒泡时触发。true为事件捕获时触发，false时事件冒泡时触发
 * @handlePara -- 事件触发的方法的参数，使用一个数组传递所有的参数
 * @constructor
 */
function EventDelegate(element,eType,handle,bol){
    /**事件绑定方法，兼容ie6及以上。*/
    var this_ = this;
    if(typeof EventDelegate.prototype.addEvent != 'function'){
        EventDelegate.prototype.addEvent = function(){
            if(element.addEventListener){
                element.addEventListener(eType,function(e){
                    this_.eventObj = e;
                    handle();
                },bol);//第三个参数，是事件执行的时间，默认是false，即时间冒泡时执行，为true时是事件捕获时执行
            }else if(element.attachEvent){
                element.attachEvent('on'+eType, handle,bol);
            }else{
                element['on'+eType] = handle;
            }
        }
    }

    /**阻止事件冒泡和默认事件*/
    if(typeof EventDelegate.prototype.stopEvent != 'function'){
        EventDelegate.prototype.stopEvent = function(){
            var e = this_.eventObj;
            if(e && e.stopPropagation){//其他浏览器
                e.stopPropagation();
                e.preventDefault();//阻止通过 addEventListener( ) 添加的事件的默认事件
            }else{
                window.event.cancelBubble = true;//ie9以下阻止事件冒泡
                window.event.returnValue = false;//ie9以下阻止默认行为.阻止通过 attachEvent( ) 添加的事件的默认事件
            }
        }
    }

    /**给ie8及以下的浏览器，添加数组的indexOf方法**/
    this_.addIndexOf = function(){
        //添加数组IndexOf方法
        if (!Array.prototype.indexOf)
        {
            Array.prototype.indexOf = function(elt /*, from*/)
            {
                var len = this.length >>> 0;
                var from = Number(arguments[1]) || 0;
                from = (from < 0)
                    ? Math.ceil(from)
                    : Math.floor(from);
                if (from < 0)
                    from += len;

                for (; from < len; from++)
                {
                    if (from in this &&
                        this[from] === elt)
                        return from;
                }
                return -1;
            };
        }
    };
}