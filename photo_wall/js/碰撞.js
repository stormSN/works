window.onload = function (){
	var c = document.getElementById("photos");
	var a = c.getElementsByTagName("li");
	var n = document.getElementById("mians");
	var d = document.getElementById("btns");
	var m = [];
	for(var g = 0;g<a.length;g++){
		m[g] = {
			left:a[g].offsetLeft,top:a[g].offsetTop
		};
	};
	d.onclick = function (){
		m.sort(function (){
			return Math.random()-0.5
		});
		for(var p = 0;p<a.length;p++){
			a[p].index = p;
			b(a[p],m[p]);
		};
	};
	for(var g = 0;g<a.length;g++){
		a[g].index = g;
		a[g].style.position = "absolute";
		a[g].style.left = m[g].left+"px";
		a[g].style.top = m[g].top+"px";
		a[g].style.margin = "0";
	};
	for(var g = 0;g<a.length;g++){
		h(a[g]);
	};
	var f = 1;
	function h(i){
		i.onmousedown = function (s){
			f++;
			var p = s||event;
			var r = p.clientX-i.offsetLeft;
			var q = p.clientY-i.offsetTop;
			this.style.zIndex = f;
			if(i.setCapture){
				i.setCapture()
			};
			document.onmousemove = function (y){
				var y = y||event;
				var u = y.clientX-r;
				var w = y.clientY-q;
				if(u <= -(n.offsetWidth-c.offsetWidth)/2){
					u = -(n.offsetWidth-c.offsetWidth)/2;
				}else {
					if(u>=c.offsetWidth-i.offsetWidth+(n.offsetWidth-c.offsetWidth)/2){
						u=c.offsetWidth-i.offsetWidth+(n.offsetWidth-c.offsetWidth)/2;
					};
				};
				if(w <= -(n.offsetHeight-c.offsetHeight)/2-28){
					w = -(n.offsetHeight-c.offsetHeight)/2-28;
				}else {
					if(w >= c.offsetHeight-i.offsetHeight+110){
						w = c.offsetHeight-i.offsetHeight+110
					};
				};
				i.style.left = u + "px";
				i.style.top = w + "px";
				for(var v =0;v<a.length;v++){
					a[v].className = "";
				};
				var x = j(i);
				if(x){
					//document.title=x.index;
					x.className = "actives";
				};
			};
			document.onmouseup = function (){
				document.onmousemove = null;
				document.onmouseup = null;
				var t = j(i);
				if(t == null){
					b(i,m[i.index])
				}else {
					b(i,m[t.index]);
					b(t,m[i.index]);
					var u = 0;
					u = i.index;
					i.index = t.index;
					t.index = u;
					t.className = "";
				};
				if(i.releaseCapture){
					i.releaseCapture()
				};
			};
			return false;
		};
	};
	function l(p,i){
		var r = p.offsetLeft;
		var u = p.offsetLeft+p.offsetWidth;
		var v = p.offsetTop;
		var x = p.offsetTop+p.offsetHeight;
		var q = i.offsetLeft;
		var s = i.offsetLeft+i.offsetWidth;
		var t = i.offsetTop;
		var w = i.offsetTop+i.offsetHeight;
		if(r>s||u<q||v>w||x<t){
			return false;
		}else {
			return true;
		};
	};
	function e(q,p){
		var r = q.offsetLeft-p.offsetLeft;
		var i = q.offsetTop-p.offsetTop;
		return Math.sqrt(r*r+i*i);
	};
	function j(t){
		var s = 999999999;
		var p = -1;
		for(var r = 0;r<a.length;r++){
			if(t == a[r]){
				continue;
			};
			if(l(t,a[r])){
				var q = e(t,a[r]);
				if(s > q){
					s = q;
					p = r;
				};
			};
		};
		if(p == -1){
			return null;
		}else {
			return a[p];
		};
	};
	function k(p,i){
		if(p.currentStyle){
			return p.currentStyle[i];
		}else {
			return getComputedStyle(p,"abc")[i];
		};
	};
	function b(q,i,p){
		clearInterval(q.timer);
		q.timer=setInterval(function (){
			var s = true;
			for(var r in i){
				var u = 0;
				if(r == "opacity"){
					u = Math.round(parseFloat(k(q,r))*100);
				}else {
					u = parseInt(k(q,r));
				};
				var t=(i[r]-u)/8;
				t = t > 0 ? Math.ceil(t):Math.floor(t);
				if(u != i[r]){
					s = false;
				};
				if(r == "opacity"){
					q.style.filter = "alpha(opacity:"+(u+t)+")";
					q.style.opacity = (u+t)/100;
				}else {
					q.style[r] = u+t+"px";
				};
			};
			if(s){
				clearInterval(q.timer);
				if(p){
					p();
				};
			};
		},30);
	};
	function o(s,t){
		var r = s.getElementsByTagName("*");
		var p = [];
		for(var q = 0;q<r.length;q++){
			if(r[q].className == t){
				p.push(r[q]);
			};
		};
		return p;
	};
};

