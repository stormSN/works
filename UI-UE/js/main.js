/**
 * Created by cuikaidao on 2016/3/2.
 */

function $(selector,content){
    if( selector.charAt(0) === "#" ){
        return document.getElementById(selector.substring(1))
    }else{
        content = content || document;
        return  content.getElementsByTagName(selector);
    }
}
function getStyle(obj,attr){
    if( obj.currentStyle ){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj)[attr];
    }
}
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
        }else{
            obj.style[attr] = cur + "PX";
        }
    },30);
}
function addZero(n){
    return n < 10 ? "0"+n : n;
}
function getTimes(){
    var d = new Date();
    var H = d.getHours();
    var Min = d.getMinutes();
    var S = d.getSeconds();
    var str =addZero(H)+":"+addZero(Min)+":"+addZero(S);
    return str;
}
window.onload=function(){
    var picList=$("#list");
    var aImg=$("img",picList);
    var n=0;
    var timer=null;
    var aPic=["images/1.jpg","images/2.jpg","images/3.jpg","images/4.jpg","images/5.jpg"];
    function play(){
        timer=setInterval(function(){
            n++;
            if(n>aPic.length-1){
                n=0;
            }
            aImg[1].src=aPic[n];
            doMove(picList,"left",-580,30,function(){
                picList.style.left=0;
                aImg[0].src=aImg[1].src;
            })
        },2000);
    }
    play();
    var getTime=document.getElementById("gettime");
    var allSpan = getTime.getElementsByTagName("span");
    var futureTime = new Date(2016,8,31,24,0,0);
        setInterval(function (){
            var now = new Date();
            var t = (futureTime.getTime() - now.getTime())/1000;
            if( t <0 ){
                alert("时间到了");
            }
            console.log(t)
            var D =  Math.floor(t/86400);
            var H =  Math.floor(t%86400/3600);
            var Min =  Math.floor(t%86400%3600/60);
            var S = Math.floor(t%60);
            var str =addZero(D)+"-"+addZero(H)+"-"+addZero(Min)+"-"+addZero(S);
            var newTime=str.split("-");
            var time=newTime.join("");
            for( var i = 0; i < time.length; i++ ){
                if(time.charAt(i) !=""){
                    allSpan[i].innerHTML = time.charAt(i);
                }
            }
        },1000)
    var btn=$("#btn");
    var aSpan=$("span",btn);
    aSpan[0].onmouseover=function(){
        clearInterval(timer);
        this.style.background="green"
    };
    aSpan[0].onmouseout=function(){
        this.style.background="#4c4c4c";
       play()
    };
    aSpan[1].onmouseover=function(){
        clearInterval(timer);
        this.style.background="green"
    };
    aSpan[1].onmouseout=function(){
        this.style.background="#4c4c4c";
        play()
    };
    aSpan[0].onclick=function(){
        n--;
        if(n<0){
            n=aPic.length-1
        }
        aImg[0].src=aPic[n];
    };
    aSpan[1].onclick=function(){
        n++;
        if(n>aPic.length-1){
            n=0
        }
        aImg[0].src=aPic[n];
    }
}