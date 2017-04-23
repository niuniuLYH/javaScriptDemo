var DragDrop = function(){
    var dragdrop = new EventTarget(),
        dragging = null,
        diffX = 0,
        diffY = 0;
    function handleEvent(event){
        //获取时间和目标
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        //确定事件类型
        switch(event.type){
            case 'mousedown':
                if(target.className.indexOf('draggable') > -1){
                    dragging = target;
                    diffX = event.clientX - target.offsetLeft;
                    diffY = event.clientY - target.offsetTop;
                    dragdrop.fire({type : 'dragstart',target : dragging,x : event.clientX,y : event.clientY});//触发自定义事件方法
                }
                break;
            case 'mousemove':
                if(dragging !== null){
                    dragging.style.left = (event.clientX - diffX) + 'px';
                    dragging.style.top = (event.clientY - diffY) + 'px';

                    dragdrop.fire({type : 'drag',target : dragging, x : event.clientX, y : event.clientY});
                }
                break;
            case 'mouseup':
                dragdrop.fire({type : 'dragend',target : dragging, x : event.clientX, y : event.clientY});
                dragging = null;
                break;
        }
    };
    //返回公告接口
     dragdrop.enable = function(){
        EventUtil.addHandle(document,'mousedown',handleEvent);
        EventUtil.addHandle(document,'mousemove',handleEvent);
        EventUtil.addHandle(document,'mouseup',handleEvent);
        }
    dragdrop.disable = function(){
        EventUtil.removeHandle(document,'mousedown',handleEvent);
        EventUtil.removeHandle(document,'mousemove',handleEvent);
        EventUtil.removeHandle(document,'mouseup',handleEvent);
    }
    return dragdrop;
}();

//注册自定义的三个事件
DragDrop.addHandler('dragstart',function(event){
    var status = document.getElementById('status');
    status.innerHTML = 'started dragging ' + event.target.id;
});
DragDrop.addHandler('drag',function(event){
    var status = document.getElementById('status');
    status.innerHTML = '<br /> Dragged' + event.target.id +' to (' + event.x + ',' + event.y + ')';
});
DragDrop.addHandler('dragend',function(event){
    var status = document.getElementById('status');
    status.innerHTML = '<br /> Dropped '+ event.target.id + 'at (' + event.x + ',' + event.y + ')';
});