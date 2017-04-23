/**
 * 自定义事件的构造函数
 */

function EventTarget(){
    this.handlers = [];
}
EventTarget.prototype = {
    constructor : EventTarget,
    addHandler : function(type,handler){
        if( typeof this.handlers[type] == 'undefined'){
            this.handlers[type] = [];
        }
        this.handlers[type].push(handler);
    },
    fire : function(event){
        if(!event.target){
            event.target = this;
        }
        if(this.handlers[event.type] instanceof Array){
            var handlers = this.handlers[event.type];//对应的事件注册的多个事假处理程序
            for(var i = 0,len = handlers.length; i < len; i++){
                handlers[i](event);
            }
        }
    },
    removeHandler:function(type,handler){
        if(this.handlers[type] instanceof Array){
            var handlers = this.handlers[type];
            for(var i = 0,len = handlers.length; i< len;i++){
                if(handlers[i] === handler){
                    break;
                }
            }
            handlers.splice(i,1);
        }
    }
}

/**其他对象继承自定义事件的构造函数，并使用其中的方法**/
        function Person(name,age){
            EventTarget.call(this);
            this.name = name;
            this.age= age;
        }
        Person.prototype = Object(EventTarget.prototype);
        Person.prototype.say = function(message){
            this.fire({type:'message',message:message});
        }