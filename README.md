### 目录简介  
#### js  
中包含一个js文件夹，包含一个名叫eventDelegate.js的文件。它是一个模块。其中包含事件绑定方法【兼容ie6及以上】，阻止事件冒泡和默认事件方法，和一些兼容ie8及以下浏览器的方法  
#### vent_delegate.html文件
调用模块，以及点击事件的主函数 
### 功能简介
该demo主要是通过事件委托的方法，实现点击每个li，console出该li的索引号。兼容了ie6及以上。当然如果需要在点击时达到不同的点击效果，只需要修改点击事件触发的函数。  
  返回的方法接口：  
 1.addEvent()//给dom元素绑定事件，兼容ie6及以上  
 2.stopEvent()//阻止事件冒泡和默认的事件行为，可在事件触发的方法中直接调用  
 3.addIndexOf()//ie8及以下的浏览器，给数组添加indexOf()方法  
### 模块参数详解
 'ar event_delegate = new EventDelegate(elemetn,eType,handle,bol,handlePara)'  
#### 方法参数详解
 * @element--绑定事件的dom元素
 * @eType -- 事件类型，如‘click’等
 * @handle -- 事件触发的方法
 * @bol--是否在冒泡阶段触发，ture为事件捕获时触发，false在事件冒泡时触发  
 *@handlePara -- 事件触发方法的参数，使用一个数组传递所有的参数。可为空  
 
