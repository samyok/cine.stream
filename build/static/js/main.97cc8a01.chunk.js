(this["webpackJsonpcine.stream"]=this["webpackJsonpcine.stream"]||[]).push([[0],{41:function(e,t,n){},49:function(e,t,n){},81:function(e,t,n){},82:function(e,t,n){},84:function(e,t,n){},94:function(e,t){},95:function(e,t,n){"use strict";n.r(t);var c=n(1),r=n.n(c),a=n(42),o=n.n(a),i=(n(49),n(2)),s=n(23),u=(n(81),n(9)),l=n(25),d=(n(82),n(0));function j(e){var t=e.ws,n=e.chats,r=Object(c.useState)(null),a=Object(i.a)(r,2),o=a[0],s=a[1],u=Object(c.useCallback)((function(){t.emit("chat",{message:o}),s("")}),[t,o]);return Object(d.jsxs)("div",{className:"chatContainer",children:[Object(d.jsx)("div",{className:"chatbox",children:n.filter((function(e){return"undefined left"!==e.username})).map((function(e){return Object(d.jsxs)("div",{className:"chatMessage",children:[Object(d.jsx)("img",{src:"img/"+e.image+"1.png",alt:"avatar"}),Object(d.jsx)("span",{className:"author",children:e.username}),Object(d.jsx)("p",{children:e.message})]})}))}),Object(d.jsx)("input",{type:"text",placeholder:"chat :D",style:{margin:0},value:o,onChange:function(e){return s(e.currentTarget.value)},onKeyPress:function(e){return"Enter"===e.code?u():""}})]})}n(84);function b(e){var t,n,r=e.ws,a=e.videoRef,o=e.updateWS,s=Object(c.useState)(!1),u=Object(i.a)(s,2),l=u[0],j=u[1];Object(c.useEffect)((function(){r.on("status",(function(e){console.log(e),a.current&&(a.current.src=e.src),a.current&&(a.current.currentTime=e.currentTime),e.paused?a.current.pause():a.current.play()}))}),[o,a,r]),Object(c.useEffect)((function(){setTimeout((function(){console.log(a.current.src),a.current.src||(a.current.src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",a.current.play(),j(!0)),o()}),5e3)}),[o,a]),function(e,t){var n=Object(c.useRef)();Object(c.useEffect)((function(){n.current=e}),[e]),Object(c.useEffect)((function(){if(null!==t){var e=setInterval((function(){n.current()}),t);return function(){return clearInterval(e)}}}),[t])}((function(){var e;v||m((null===(e=a.current)||void 0===e?void 0:e.currentTime)||0)}),1e3);var b=Object(c.useState)((null===(t=a.current)||void 0===t?void 0:t.currentTime)||0),f=Object(i.a)(b,2),O=f[0],m=f[1],p=Object(c.useState)(!1),h=Object(i.a)(p,2),v=h[0],x=h[1];return a.current?Object(d.jsx)("div",{className:"controlContainer",children:Object(d.jsxs)("div",{className:"controlbox",children:[Object(d.jsx)("button",{className:"icon",onClick:function(){l?a.current.pause():a.current.play(),j((function(e){return!e})),o()},children:Object(d.jsx)("span",{className:"material-icons-two-tone",children:l?"pause":"play_arrow"})}),Object(d.jsxs)("span",{className:"scrubber",children:[a.current.currentTime/60>>0,":",((a.current.currentTime>>0)%60).toString().padStart(2,"0")]}),Object(d.jsx)("input",{onMouseDown:function(){return x(!0)},onMouseUp:function(){a.current.currentTime=O,o(),x(!1)},type:"range",value:O,min:0,max:(null===(n=a.current)||void 0===n?void 0:n.duration)||0,onChange:function(e){m(e.currentTarget.value)}}),Object(d.jsx)("button",{className:"icon",onClick:function(){a.current.src=prompt("New video URL"),a.current.currentTime=0,o()},children:Object(d.jsx)("span",{className:"material-icons-two-tone",children:"playlist_add"})})]})}):Object(d.jsx)("div",{className:"controlContainer",children:Object(d.jsx)("div",{className:"controlbox",children:Object(d.jsx)("p",{children:"Loading..."})})})}var f=function(e){return e*Math.PI/180};function O(e){var t=e.ws,n=e.sid,r=e.state,a=10,o=Object(c.useState)(0),s=Object(i.a)(o,2),O=s[0],h=s[1],v=Object(c.useState)(0),x=Object(i.a)(v,2),g=x[0],y=x[1],w=Object(c.useState)(0),S=Object(i.a)(w,2),k=S[0],N=S[1],C=Object(c.useState)(-window.innerWidth/2),T=Object(i.a)(C,2),E=T[0],R=T[1],z=Object(c.useState)(0),X=Object(i.a)(z,2),Z=X[0],L=X[1],M=Object(c.useState)(E+598),I=Object(i.a)(M,2),Y=I[0],P=I[1],D=Object(c.useRef)({posX:Z,posZ:Y}),A=Object(c.useState)({}),F=Object(i.a)(A,2),W=F[0],J=F[1],K=Object(c.useRef)(null),B=Object(c.useState)(null),q=Object(i.a)(B,2),U=q[0],_=(q[1],Object(c.useState)([])),G=Object(i.a)(_,2),H=G[0],Q=G[1],V=Object(c.useState)(!1),$=Object(i.a)(V,2);$[0],$[1];Object(c.useEffect)((function(){console.log(t),t.on("avatars",(function(e){J(e),N((function(e){return(e+1)%100}))})),r.data.king||t.on("status",(function(e){console.log(e),K.current.src=e.src,K.current.currentTime=e.currentTime,e.paused?K.current.pause():K.current.play()})),t.on("chat",(function(e){Q((function(t){return[].concat(Object(l.a)(t),[e])})),console.log(e)}))}),[t]);var ee=Object(c.useCallback)((function(){t.emit("update",{src:K.current.src,currentTime:K.current.currentTime,paused:K.current.paused})}),[t,K]);!function(e,t){var n=Object(c.useRef)();Object(c.useEffect)((function(){n.current=e}),[e]),Object(c.useEffect)((function(){if(null!==t){var e=setInterval((function(){n.current()}),t);return function(){return clearInterval(e)}}}),[t])}((function(){t.emit("location",{posZ:Y-(E+598),posX:Z})}),100);var te=(window.innerHeight-596)/2,ne=function(e){L("function"===typeof e?function(t){return e(t)}:e),D.current=Object(u.a)(Object(u.a)({},D.current),{},{posX:Z})},ce=function(e){P("function"===typeof e?function(t){return e(t)}:e),D.current=Object(u.a)(Object(u.a)({},D.current),{},{posZ:Y})},re=Object(c.useRef)(0),ae=function(e){h("function"===typeof e?function(t){var n=e(t);return re.current=n,n%360}:function(t){return re.current=e,e%360})},oe=Object(c.useRef)([]);Object(c.useRef)(0);var ie=function(e){switch(e){case"ArrowRight":y((function(e){return e+1}));break;case"ArrowLeft":y((function(e){return e-1}));break;case"KeyW":ne((function(e){return e+Math.cos(f(re.current))*a})),ce((function(e){return e+Math.sin(f(re.current))*a}));break;case"KeyS":ne((function(e){return e+Math.cos(f(re.current+180))*a})),ce((function(e){return e+Math.sin(f(re.current+180))*a}));break;case"KeyD":ne((function(e){return e+Math.cos(f(re.current+90))*a})),ce((function(e){return e+Math.sin(f(re.current+90))*a}));break;case"KeyA":ne((function(e){return e+Math.cos(f(re.current-90))*a})),ce((function(e){return e+Math.sin(f(re.current-90))*a}));break;case"Space":R(-window.innerWidth/2),ce(E+598),ne(0),ae(0),y(0);break;default:console.log(e)}},se=Object(c.useCallback)((function(){oe.current.forEach((function(e){return ie(e)}))}),[ie]);return Object(c.useEffect)((function(){document.addEventListener("keydown",(function(e){var t;t=e.code,oe.current=Array.from(new Set([].concat(Object(l.a)(oe.current),[t])))})),document.addEventListener("keyup",(function(e){!function(e){var t=new Set(oe.current);t.delete(e),oe.current=Array.from(t)}(e.code)})),document.body.addEventListener("click",document.body.requestPointerLock||document.body.mozRequestPointerLock),document.addEventListener("mousemove",(function(e){(document.pointerLockElement||document.mozPointerLockElement)&&ae((function(t){return t+.1*e.movementX}))}),!1),setInterval(se,50)}),[]),Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(j,{ws:t,chats:H}),r.data.king&&Object(d.jsx)(b,{ws:t,videoRef:K,updateWS:ee}),Object(d.jsx)("section",{id:"container",children:Object(d.jsxs)("div",{id:"room",style:{transform:"rotateY(".concat(O,"deg)")},children:[m({orientation:"N",dy:te,dz:Y,dx:Z,styles:{backgroundColor:"rgba(0,0,0,0.3)"},inside:Object(d.jsx)("video",{ref:K,src:U,style:{width:"100%",height:"100%"},autoPlay:!0})}),Object(d.jsx)(p,{sid:n,avatars:W,posX:Z,posZ:Y,dy:te},JSON.stringify(W))]})}),Object(d.jsxs)("pre",{style:{display:"none",color:"white",position:"fixed",top:0,backgroundColor:"black"},children:["rot: ",O,"deg ",Object(d.jsx)("br",{}),"dx: ",Z,"px dz: ",Y,"px ",Object(d.jsx)("br",{}),"dr: ",g,"deg offset: ",E,"px ",Object(d.jsx)("br",{}),"sid: ",n," ",Object(d.jsx)("br",{}),"val: ",k]})]})}function m(e){var t=e.width,n=void 0===t?1196:t,c=e.height,r=void 0===c?596:c,a=e.styles,o=void 0===a?{}:a,i=e.inside,s=e.orientation,l=e.dz,j=e.dx,b=e.dy,f=e.dr,O=void 0===f?0:f,m={N:"rotateY(".concat(O,"deg) translateZ(").concat(j,"px) translateX(").concat(-l,"px) translateY(").concat(b,"px)"),E:"rotateY(".concat(-90+O,"deg) translateZ(").concat(l,"px) translateX(").concat(j,"px) translateY(").concat(b,"px)"),W:"rotateY(".concat(90+O,"deg) translateZ(").concat(l,"px) translateX(").concat(j,"px) translateY(").concat(b,"px)"),S:"rotateY(".concat(180+O,"deg) translateZ(").concat(j,"px) translateX(").concat(l,"px) translateY(").concat(b,"px)"),T:"rotateX(90deg) translateZ(".concat(b,"px) translateX(").concat(-l,"px) translateY(").concat(j,"px)"),B:"rotateX(90deg) translateZ(-".concat(b,"px) translateX(").concat(-l,"px) translateY(").concat(j,"px)")},p=["T","B"].includes(s)?{}:{fontSize:.9*r};return Object(d.jsx)("figure",{style:Object(u.a)(Object(u.a)({width:n,height:r,transform:m[s]},p),o),children:i||s})}function p(e){var t=e.sid,n=e.avatars,c=e.posX,r=e.posZ,a=e.dy;return Object.keys(n).map((function(e){var o=n[e];if(e!==t)return function(e){var t=e.color,n=void 0===t?"darkblue":t,c=e.posX,r=e.posZ,a=e.dy,o=e.x,i=void 0===o?200:o,s=e.y,u=void 0===s?0:s,l=e.z,j=void 0===l?-300:l,b=e.size,f=void 0===b?51:b,O=e.dr,p=void 0===O?0:O,h=(e.sid,r+j),v=c+i,x={margin:0};return Object(d.jsxs)(d.Fragment,{children:[m({orientation:"N",dz:h,dx:v,dy:a+596+u-f,dr:p,styles:{backgroundColor:n,fontSize:5},width:f,height:f,inside:Object(d.jsx)("img",{style:x,src:"img/"+n+"2.png",alt:""})}),m({orientation:"E",dz:r+j-5/6*f,dx:c+i-f/6,dy:a+596+u-f,styles:{backgroundColor:n,fontSize:10},width:f/3,height:f,inside:Object(d.jsx)("img",{style:x,src:"img/"+n+"3.png",alt:""})}),m({orientation:"E",dz:r+j+f/6,dx:c+i-f/6,dy:a+596+u-f,styles:{backgroundColor:n,fontSize:10},width:f/3,height:f,inside:Object(d.jsx)("img",{style:x,src:"img/"+n+"3.png",alt:""})}),m({orientation:"N",dz:r+j,dx:c+i-f/3,dy:a+596+u-f,styles:{backgroundColor:n},width:f,height:f,inside:Object(d.jsx)("img",{style:x,src:"img/"+n+"1.png",alt:""})})]})}({color:o.color,posX:c,posZ:r,dy:a,size:51,y:-225,x:600-o.posX,z:-o.posZ-598+25,dr:0,sid:e})}))}var h=n(24),v=n.n(h),x=n(43);n(41);function g(e){var t=e.func,n=e.interval,c=void 0===n?50:n,r=e.from,a=void 0===r?1:r,o=e.to,i=void 0===o?0:o,s=e.step,u=void 0===s?.17:s,l=function(e){return new Promise((function(t){return setTimeout(t,e)}))};return new Promise(function(){var e=Object(x.a)(v.a.mark((function e(n){var r;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=a;case 1:if(!(r>i)){e.next=8;break}return t(r-=u),e.next=6,l(c);case 6:e.next=1;break;case 8:n(r);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}function y(e){var t=e.setState,n=e.loading,r=Object(c.useState)(1),a=Object(i.a)(r,2),o=a[0],s=a[1];return Object(d.jsxs)("div",{className:"centerbox-container",style:{opacity:o},children:[Object(d.jsxs)("div",{className:"centerbox",children:[Object(d.jsx)("h1",{children:"cine.stream"}),Object(d.jsx)("h2",{children:"watch together. in 3D. online."}),Object(d.jsxs)("p",{children:['No more "3..2..1..Start!" ',Object(d.jsx)("br",{}),"Join a ",Object(d.jsx)("i",{children:"cinestream"})," to watch closely, virtually."]}),Object(d.jsx)("button",{disabled:n,onClick:function(){g({func:s}).then((function(){return t({page:"login",data:{newRoom:!0}})}))},children:"Create a room"}),Object(d.jsx)("br",{}),Object(d.jsx)("button",{className:"small",disabled:!0,onClick:function(){g({func:s}).then((function(){return t({page:"rooms",data:{}})}))},children:"Find a public room"})]}),Object(d.jsx)("div",{className:"copyright",children:"Created in <24 hours by Samyok and Sampada Nepal"})]})}var w=new(n(44).AvatarGenerator);function S(e){var t=e.ws,n=e.roomID,r=e.setState,a=Object(c.useState)(1),o=Object(i.a)(a,2),s=o[0],u=(o[1],Object(c.useState)({random:!1,src:null})),l=Object(i.a)(u,2),j=l[0],b=(l[1],Object(c.useState)(null)),f=Object(i.a)(b,2),O=f[0],m=f[1],p=j.src||(j.random?w.generateRandomAvatar():w.generateRandomAvatar(null===O||void 0===O?void 0:O.trim()));return Object(d.jsx)("div",{className:"centerbox-container",style:{opacity:s},children:Object(d.jsxs)("div",{className:"centerbox",children:[Object(d.jsxs)("h1",{children:[n?"join":"create"," a cinespace"]}),Object(d.jsx)("input",{type:"text",placeholder:"your username",required:!0,value:O,onChange:function(e){m(e.currentTarget.value)}}),Object(d.jsx)("button",{onClick:function(){(null===O||void 0===O?void 0:O.trim().length)>1&&(t.emit("auth",{username:O,avatar:p,newRoom:!n,roomID:n}),r({page:"world",data:{newRoom:!0,king:!0}}))},children:n?"Join":"Create"})]})})}var k=function(){var e=Object(c.useRef)({}),t=Object(c.useState)(!1),n=Object(i.a)(t,2),r=n[0],a=n[1],o=Object(c.useState)(null),u=Object(i.a)(o,2),l=u[0],j=u[1],b=Object(c.useState)(window.location.pathname.substring(1)),f=Object(i.a)(b,2),m=f[0],p=f[1],h=Object(c.useState)({page:m?"login":"landing",data:null}),v=Object(i.a)(h,2),x=v[0],g=v[1];return Object(c.useEffect)((function(){r||fetch("/ws").then((function(e){return e.json()})).then((function(t){e.current=Object(s.io)(t.endpoint),console.log("connected to ws"),a(!0),e.current.on("auth",(function(){console.log(e.current.id),j(e.current.id)})),e.current.on("room",(function(e){window.history.pushState(null,null,e),p(e)})),e.current.on("closedroom",(function(){return window.location.href="/"}))}))}),[r]),Object(d.jsxs)(d.Fragment,{children:["landing"===x.page&&Object(d.jsx)(y,{setState:g,loading:!r}),"login"===x.page&&Object(d.jsx)(S,{roomID:m,ws:e.current,setState:g}),"world"===x.page&&Object(d.jsx)(O,{roomID:m,sid:l,ws:e.current,state:x})]})},N=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,96)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,o=t.getTTFB;n(e),c(e),r(e),a(e),o(e)}))};o.a.render(Object(d.jsx)(r.a.StrictMode,{children:Object(d.jsx)(k,{})}),document.getElementById("root")),N()}},[[95,1,2]]]);
//# sourceMappingURL=main.97cc8a01.chunk.js.map