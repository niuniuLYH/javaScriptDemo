var EventUtil = {
    addHandle:function(element,type,handle){//给元素添加事件处理程序
        if(element.addEventListener){
            element.addEventListener(type,handle,false);//false为在事件冒泡时触发
        }else if(element.attachEvent){
            element.attachEvent('on' + type,handle);//兼容ie9及以上
        }else {
            element['on' + type] = handle;//兼容ie8及以下的浏览器
        }
    },
    removeHandle:function(element,type,handle){//移除元素的时间处理程序
        if(element.removeEventListener){
            element.removeEventListener(type,handle,false);
        }else if(element.detachEvent){
            element.detachEvent('on' + type,handle);
        }else{
            element['on' + type] = null;
        }
    },
    getEvent:function(event){
        return event ? event:window.event;
    },
    getTarget:function(event){
        return event.target || event.srcElement;
    },
    preventDefault:function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
    },
    stopPropagation : function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble = true;
        }
    },
    getRelatedTarget: function(event){//获取时间的相关元素。只有mouseover和mouseout的event对象才有该属性
        if(event.relatedTarget){
            return event.relatedTarget;
        }else if(event.toElement){//ie浏览器mouseout事件触发时保存的相关元素
            return event.toElement;
        }else if(event.fromElement){//ie浏览器mouseover事件触发时保存的相关元素
            return event.formElement;
        }else{//其他事件无该属性
            return null;
        }
    },
    getButton:function(event){//取得点击事件中鼠标的按钮编号。
        if(document.implementation.hasFeature('MouseEvents','2.0')){//检测浏览器是否支持DOM版鼠标事件.(DOM版的只有三个值，0,1，2)
            return event.button;
        }else{//兼容ie8及以下的鼠标事件的button属性，因其有很多不需要的值，所以以DOM版为标准做了一个规整
            switch(event.button){
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4:
                    return 1;
            }
        }
    },
    getWheelDelta:function(event){//当鼠标滚轮事件发生时，获取wheelDelta的值。
        if(event.wheelDelta){
            return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
        }else {
            return -event.detail * 40;//兼容Firefox
        }

    },
    getCharCode: function(event){//当键盘事件发生时，event对象有一个属性，返回按下的那个键所代表字符的ASCII编码
        if(typeof event.charCode == 'number'){
            return event.charCode;
        }else{
            return event.keyCode;//兼容ie8及以下和Opera浏览器
        }
    }
}