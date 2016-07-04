function $( selector,content ){
	var firstChar = selector.charAt(0);
	if( firstChar === "#" ){
		return document.getElementById(selector.substring(1));
	}else{
		var c = content || document;
		return c.getElementsByTagName(selector);
	};		
};
function getStyle(obj,attr){
    if( obj.currentStyle ){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj)[attr];
    };
};
function doMove(obj,attr,target,speed,callBack){
    var cur = parseInt( getStyle(obj,attr) );
    speed = cur < target ? Math.abs(speed) : -Math.abs(speed);
    clearInterval(obj.timer);
    obj.timer = setInterval(function (){
        cur += speed;
        if(  cur >= target && speed > 0 ||  cur <= target && speed < 0){
            clearInterval(obj.timer);
            cur = target;
            obj.style[attr] = cur + "PX";
            typeof callBack === "function" &&　callBack();
        }else {
            obj.style[attr] = cur + "PX";
        }
    },30);
};

window.onload = function(){
	var list = $("#list");
    var aLi = $("li",list);
    var nextBtn = $("#next");
    var prevBtn = $("#prve");
    var nav00 = $("#nav00")
    var span = $("span",nav00);
    var n = 1;
    var onOff = false;  //设置开关，防止多次点击
    var imgWidth = 700; //一张图片的宽度
    var timer = null;
    var j = 0;
    play();
    
    nextBtn.onmouseover = function (){
        clearInterval( timer );
    };
    prevBtn.onmouseover = function (){
        clearInterval( timer );
    };
    nextBtn.onmouseout = function (){
        play();
    };
    prevBtn.onmouseout = function (){
        play();
    };
    nextBtn.onclick = function (){
        if(onOff)return;
        n++;
        j++;
        if( n > aLi.length - 1 ){
            n = 1;
        }
        fn();
    };
    prevBtn.onclick = function (){
        if( onOff ) return;
        n--;
        j--;
        if( n <0){
            n = aLi.length-2;
        }
        if(j<0){
           j = span.length-1
        }
         fn();
    };
    for (var i = 0; i < span.length; i++){
        span[i].index = i;
        span[i].onmouseover=function (){
            clearInterval( timer );
            for (var i = 0; i < span.length; i++){
                span[i].className = "";
            }
            span[this.index].className = "active";
            list.style.left = -(this.index+1)*imgWidth + "px";
    	};
        span[i].onmouseout=function (){
            j = this.index;
            n = this.index+1;
            play();
        };
    };
    list.addEventListener("webkitTransitionEnd",function(){
        if(n>=aLi.length-1){
          list.style.transition = "none";
            list.style.left= -imgWidth + "px";
            n = 1;
        }else if(n<=0){
          list.style.transition = "none";
            list.style.left = -(aLi.length-2)*imgWidth + "px";
            n = aLi.length-2;
        }
        onOff = false
    });
    function play(){
        timer = setInterval(function (){
            n++;
            j++;
            if(n>aLi.length-1){
                n = 1;
            }
            for (var i = 0; i < span.length; i++){
                span[i].className = "";
            }
            span[j % span.length].className = "active";
            list.style.transition = "0.5s";
            list.style.left = -n * imgWidth + "px";
        },2000);
    };
    function fn(){
        for (var i = 0; i < span.length; i++){
            span[i].className = "";
        };
        span[j%span.length].className = "active";
        list.style.transition = "0.5s";
        list.style.left= -n * imgWidth + "px";
        onOff = true;
    };
};


