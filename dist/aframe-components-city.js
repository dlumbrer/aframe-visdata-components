!function(t){var e={};function i(a){if(e[a])return e[a].exports;var n=e[a]={i:a,l:!1,exports:{}};return t[a].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=e,i.d=function(t,e,a){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(a,n,function(e){return t[e]}.bind(null,n));return a},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";i(1),i(2),i(3),i(4),i(5),i(6),i(7),i(8),i(10)},function(t,e,i){"use strict";if("undefined"==typeof AFRAME)throw new Error("Component attempted to register before AFRAME was available.");AFRAME.registerComponent("querier_github",{schema:{user:{type:"string"},token:{type:"string"},repos:{type:"array"}},multiple:!1,init:function(){var t=this.data,e=this.el;t.user&&0===t.repos.length?n(t,e):t.repos.length>0&&a(t,e)},update:function(t){this.data,this.el},remove:function(){},pause:function(){},play:function(){}});var a=function(t,e){var i={};t.repos.forEach(function(a,n){var s=new XMLHttpRequest,r="https://api.github.com/repos/"+t.user+"/"+a+"?_="+(new Date).getTime();s.open("get",r,!1),s.onload=function(){if(this.status>=200&&this.status<300){console.log("data OK in request.response",e.id);var t=JSON.parse(s.response);i[t.name]=t}else reject({status:this.status,statusText:xhr.statusText})},s.onerror=function(){reject({status:this.status,statusText:xhr.statusText})},s.send()}),t.dataRetrieved=i,e.setAttribute("data_retrieved",JSON.stringify(t.dataRetrieved));var a=new CustomEvent("dataReady"+e.id,{detail:t.dataRetrieved});e.dispatchEvent(a)},n=function(t,e){var i=new XMLHttpRequest,a="https://api.github.com/users/"+t.user+"/repos?_="+(new Date).getTime();i.open("get",a),i.onload=function(){if(this.status>=200&&this.status<300){console.log("data OK in request.response",e.id),t.dataRetrieved=s(JSON.parse(i.response)),e.setAttribute("data_retrieved",JSON.stringify(t.dataRetrieved));var a=new CustomEvent("dataReady"+e.id,{detail:t.dataRetrieved});e.dispatchEvent(a)}else reject({status:this.status,statusText:xhr.statusText})},i.onerror=function(){reject({status:this.status,statusText:xhr.statusText})},i.send()},s=function(t){var e={};return t.forEach(function(t,i){e[t.name]=t}),e}},function(t,e,i){"use strict";if("undefined"==typeof AFRAME)throw new Error("Component attempted to register before AFRAME was available.");AFRAME.registerComponent("querier_json",{schema:{url:{type:"string"},embedded:{type:"string"}},multiple:!1,init:function(){var t=this.data,e=this.el;t.url?a(t,e):t.embedded&&n(t,e)},update:function(t){this.data,this.el},remove:function(){},pause:function(){},play:function(){}});var a=function(t,e){var i=new XMLHttpRequest;i.open("get",t.url),i.onload=function(){if(this.status>=200&&this.status<300){"string"==typeof i.response||i.response instanceof String?t.dataRetrieved=JSON.parse(i.response):t.dataRetrieved=i.response,e.setAttribute("data_retrieved",JSON.stringify(t.dataRetrieved));var a=new CustomEvent("dataReady"+e.id,{detail:t.dataRetrieved});e.dispatchEvent(a)}else reject({status:this.status,statusText:xhr.statusText})},i.onerror=function(){reject({status:this.status,statusText:xhr.statusText})},i.send()},n=function(t,e){t.dataRetrieved=JSON.parse(t.embedded),e.setAttribute("data_retrieved",t.embedded);var i=new CustomEvent("dataReady"+e.id,{detail:t.dataRetrieved});e.dispatchEvent(i)}},function(t,e,i){"use strict";if("undefined"==typeof AFRAME)throw new Error("Component attempted to register before AFRAME was available.");AFRAME.registerComponent("vismapper",{schema:{width:{type:"string"},depth:{type:"string"},height:{type:"string"},debug:{type:"boolean"}},multiple:!1,init:function(){var t=this.data,e=this.el;t.debug&&a(t,e)},update:function(t){var e=this.data,i=this.el;e.dataToShow&&("box"===i.components.geometry.data.primitive&&(i.components.geometry.data.height=e.dataToShow[e.height]/100,i.components.geometry.data.width=e.dataToShow[e.width]||2,i.components.geometry.data.depth=e.dataToShow[e.depth]||2,i.setAttribute("position","0 "+e.dataToShow[e.height]/200+" 0")),i.components.geometry.update(i.components.geometry.data))},remove:function(){},pause:function(){},play:function(){}});var a=function(t,e){console.log("OK, debug mode activated"),e.addEventListener("mouseenter",function(i){var a=function(t,e){var i=document.createElement("a-plane");i.setAttribute("color","white"),i.setAttribute("width",10),i.setAttribute("height",10);var a=e.getAttribute("position");i.setAttribute("position",{x:a.x+e.getAttribute("geometry").width/2+5,y:0-e.getAttribute("geometry").height/2+5,z:a.z});var n=document.createElement("a-text");return n.setAttribute("value",JSON.stringify(t.dataToShow)),n.setAttribute("width",10),n.setAttribute("height",10),n.setAttribute("color","black"),n.setAttribute("position",{x:0-i.getAttribute("width")/2,y:0-e.getAttribute("height")/2,z:0}),i.appendChild(n),i}(t,e);e.appendChild(a)}),e.addEventListener("mouseleave",function(t){e.removeChild(e.childNodes[0])})}},function(t,e,i){"use strict";if("undefined"==typeof AFRAME)throw new Error("Component attempted to register before AFRAME was available.");AFRAME.registerComponent("visdata",{dependencies:["querier","vismapper"],schema:{from:{type:"string"},index:{type:"string"}},multiple:!1,init:function(){var t=this.data,e=this.el,i=document.getElementById(t.from);if(i.getAttribute("data_retrieved")){var n=JSON.parse(i.getAttribute("data_retrieved"));n[t.index]||isNaN(parseInt(t.index))?a(t,e,n[t.index]):a(t,e,n[Object.keys(n)[parseInt(t.index)]])}else document.getElementById(t.from).addEventListener("dataReady"+t.from,function(i){i.detail[t.index]||isNaN(parseInt(t.index))?(a(t,e,i.detail[t.index]),e.setAttribute("visdata","dataRetrieved",t.dataRetrieved)):(a(t,e,i.detail[Object.keys(i.detail)[parseInt(t.index)]]),e.setAttribute("visdata","dataRetrieved",t.dataRetrieved))})},update:function(t){var e=this.data,i=this.el;e!==t&&(e.dataRetrieved!==t.dataRetrieved&&(i.components.vismapper.data.dataToShow=e.dataRetrieved,i.components.vismapper.update(i.components.vismapper.data)),e.from!==t.from&&(console.log("Change event because from has changed"),document.getElementById(e.from).removeEventListener("dataReady"+t.from,function(t){}),document.getElementById(e.from).addEventListener("dataReady"+e.from,function(t){a(e,i,t.detail[e.index]),i.components.vismapper.data.dataToShow=e.dataRetrieved,i.components.vismapper.update(i.components.vismapper.data)})))},remove:function(){},pause:function(){},play:function(){}});var a=function(t,e,i){t.dataRetrieved=i,e.setAttribute("dataEntity",JSON.stringify(i))}},function(t,e,i){"use strict";if("undefined"==typeof AFRAME)throw new Error("Component attempted to register before AFRAME was available.");AFRAME.registerComponent("interaction-mapper",{schema:{input:{type:"string"},output:{type:"string"}},multiple:!1,init:function(){var t=this.data,e=this.el;t.input&&t.output&&a(t,e)},update:function(t){var e=this.data,i=this.el;e!==t&&(e.input===t.input&&e.output===t.output||(console.log("Change event because from has changed"),i.removeEventListener(t.input,function(t){}),a(e,i)))},remove:function(){},pause:function(){},play:function(){}});var a=function(t,e){e.addEventListener(t.input,function(i){e.emit(t.output,i,!1)})}},function(t,e,i){"use strict";if("undefined"==typeof AFRAME)throw new Error("Component attempted to register before AFRAME was available.");AFRAME.registerComponent("debug-data",{schema:{inputEvent:{type:"string"}},multiple:!1,init:function(){var t=this.data,e=this.el;t.input&&t.output&&a(t,e)},update:function(t){var e=this.data,i=this.el;e!==t&&e.inputEvent!==t.inputEvent&&(console.log("Change event because from has changed"),i.removeEventListener(e.inputEvent,function(t){}),a(e,i))},remove:function(){},pause:function(){},play:function(){}});var a=function(t,e){e.addEventListener(t.inputEvent,function(i){n(t,e)})},n=function(t,e){var i=function(t,e,i){var a=document.createElement("a-plane");a.setAttribute("color","white"),a.setAttribute("class","debug-data"),a.setAttribute("width",10),a.setAttribute("height",10);var n=e.getAttribute("position");a.setAttribute("position",{x:n.x+e.getAttribute("geometry").width/2+5,y:0-e.getAttribute("geometry").height/2+5,z:n.z});var s=document.createElement("a-text");return s.setAttribute("value",JSON.stringify(i)),s.setAttribute("width",10),s.setAttribute("height",10),s.setAttribute("color","black"),s.setAttribute("position",{x:0-a.getAttribute("width")/2,y:0-e.getAttribute("height")/2,z:0}),a.appendChild(s),a}(0,e,e.getAttribute("dataEntity"));e.querySelector(".debug-data")||e.appendChild(i)}},function(t,e){var i=[],a=new THREE.Vector3;function n(t,e,n){var s,r,o,h,d,l,c=Math.ceil(e/t.columns);for(r=t.marginColumn,o=t.marginRow,n&&(r=t.margin,o=t.margin),d=u(t.align,c),h=u(t.align,t.columns),l=0;l<c;l++)for(s=0;s<t.columns;s++)a.set(0,0,0),0===t.plane.indexOf("x")&&(a.x=(s-h)*r),0===t.plane.indexOf("y")&&(a.y=(s-h)*r),1===t.plane.indexOf("y")&&(a.y=(l-d)*o),1===t.plane.indexOf("z")&&(a.z=(l-d)*o),f(a);return i}function s(t,e){var n,s;for(n=0;n<e;n++)s=isNaN(t.angle)?n*(2*Math.PI)/e:n*t.angle*.01745329252,a.set(0,0,0),0===t.plane.indexOf("x")&&(a.x=t.radius*Math.cos(s)),0===t.plane.indexOf("y")&&(a.y=t.radius*Math.cos(s)),1===t.plane.indexOf("y")&&(a.y=t.radius*Math.sin(s)),1===t.plane.indexOf("z")&&(a.z=t.radius*Math.sin(s)),f(a);return i}function r(t,e){return t.columns=e,n(t,e,!0)}function o(t,e){return p(1,0,0,0,1,0,0,0,1,-1,0,0,0,-1,0,0,0,-1),l(t.radius/2),i}function h(t,e){var a=(1+Math.sqrt(5))/2,n=1/a,s=2-a,r=-1*n,o=-1*s;return p(-1,s,0,-1,o,0,0,-1,s,0,-1,o,0,1,s,0,1,o,1,s,0,1,o,0,n,n,n,n,n,r,n,r,n,n,r,r,s,0,1,s,0,-1,r,n,n,r,n,r,r,r,n,r,r,r,o,0,1,o,0,-1),l(t.radius/2),i}function d(t,e){var a=Math.sqrt(3),n=-1/Math.sqrt(3);return p(0,0,a+n,-1,0,n,1,0,n,0,2*Math.sqrt(2/3),0),l(t.radius/2),i}function u(t,e){switch(t){case"start":return e-1;case"center":return(e-1)/2;case"end":return 0}}function l(t){var e;for(e=0;e<i.length;e++)i[e]=i[e]*t}function c(t,e,i){var a,n,s;if(i)for(n=0;n<t.length;n++)null!=(a=t[n].getAttribute(i))&&(s=3*parseInt(a,10),t[n].object3D.position.set(e[s],e[s+1],e[s+2]));else for(n=0;n<e.length;n+=3){if(!t[n/3])return;t[n/3].object3D.position.set(e[n],e[n+1],e[n+2])}}function p(){var t;for(t=0;t<arguments.length;t++)i.push(t)}function f(t){i.push(t.x),i.push(t.y),i.push(t.z)}AFRAME.registerComponent("layout",{schema:{angle:{type:"number",default:!1,min:0,max:360,if:{type:["circle"]}},columns:{default:1,min:0,if:{type:["box"]}},margin:{default:1,min:0,if:{type:["box","line"]}},marginColumn:{default:1,min:0,if:{type:["box"]}},marginRow:{default:1,min:0,if:{type:["box"]}},orderAttribute:{default:""},plane:{default:"xy"},radius:{default:1,min:0,if:{type:["circle","cube","dodecahedron","pyramid"]}},reverse:{default:!1},type:{default:"line",oneOf:["box","circle","cube","dodecahedron","line","pyramid"]},fill:{default:!0,if:{type:["circle"]}},align:{default:"end",oneOf:["start","center","end"]}},init:function(){var t=this,e=this.el;this.children=e.getChildEntities(),this.initialPositions=[],this.children.forEach(function(e){if(e.hasLoaded)return i();function i(){t.initialPositions.push(e.object3D.position.x),t.initialPositions.push(e.object3D.position.y),t.initialPositions.push(e.object3D.position.z)}e.addEventListener("loaded",i)}),this.handleChildAttached=this.handleChildAttached.bind(this),this.handleChildDetached=this.handleChildDetached.bind(this),e.addEventListener("child-attached",this.handleChildAttached),e.addEventListener("child-detached",this.handleChildDetached),e.addEventListener("layoutrefresh",this.update.bind(this))},update:function(t){var e,a,u,l=this.children,p=this.data,f=this.el;switch(a=l.length,p.type){case"box":u=n;break;case"circle":u=s;break;case"cube":u=o;break;case"dodecahedron":u=h;break;case"pyramid":u=d;break;default:u=r}e=f.getDOMAttribute("layout"),i.length=0,i=u(p,a,"string"==typeof e?-1!==e.indexOf("margin"):"margin"in e),p.reverse&&i.reverse(),c(l,i,p.orderAttribute)},remove:function(){this.el.removeEventListener("child-attached",this.handleChildAttached),this.el.removeEventListener("child-detached",this.handleChildDetached),c(this.children,this.initialPositions)},handleChildAttached:function(t){var e=this.el;t.detail.el.parentNode===e&&(this.children.push(t.detail.el),this.update())},handleChildDetached:function(t){-1!==this.children.indexOf(t.detail.el)&&(this.children.splice(this.children.indexOf(t.detail.el),1),this.initialPositions.splice(this.children.indexOf(t.detail.el),1),this.update())}}),t.exports.getBoxPositions=n,t.exports.getCirclePositions=s,t.exports.getLinePositions=r,t.exports.getCubePositions=o,t.exports.getDodecahedronPositions=h,t.exports.getPyramidPositions=d},function(t,e,i){var a=i(9);if("undefined"==typeof AFRAME)throw new Error("Component attempted to register before AFRAME was available.");var n={roboto:17,aileronsemibold:20,dejavu:20.5,exo2bold:20,exo2semibold:20.3,kelsonsans:22.8,monoid:19.5,mozillavr:9.5,sourcecodepro:20.3};function s(t,e){for(var i=0;i<t.length;i++)if(t[i].id===e)return t[i];return null}AFRAME.registerComponent("super-keyboard",{schema:{align:{default:"left",oneOf:["left","center","right"]},blinkingSpeed:{type:"int",default:400},filters:{type:"array"},font:{default:"aileronsemibold"},hand:{type:"selector"},imagePath:{default:"."},injectToRaycasterObjects:{default:!0},inputColor:{type:"color",default:"#6699ff"},interval:{type:"int",default:50},keyBgColor:{type:"color",default:"#000"},keyColor:{type:"color",default:"#6699ff"},keyHoverColor:{type:"color",default:"#1A407F"},keyPressColor:{type:"color",default:"#5290F6"},label:{type:"string",default:""},labelColor:{type:"color",default:"#aaa"},maxLength:{type:"int",default:0},model:{default:"basic"},show:{default:!0},value:{type:"string",default:""},width:{default:.8}},init:function(){this.el.addEventListener("click",this.click.bind(this)),this.changeEventDetail={},this.textInputObject={},this.keys=null,this.focused=!1,this.keyHover=null,this.prevCheckTime=null,this.shift=!1,this.rawValue=this.data.value,this.defaultValue=this.data.value,this.userFilterFunc=null,this.intervalId=0,this.kbImg=document.createElement("a-entity"),this.kbImg.classList.add("keyboardRaycastable"),this.kbImg.classList.add("superKeyboardImage"),this.kbImg.addEventListener("raycaster-intersected",this.hover.bind(this)),this.kbImg.addEventListener("raycaster-intersected-cleared",this.blur.bind(this)),this.el.appendChild(this.kbImg),this.label=document.createElement("a-entity"),this.label.setAttribute("text",{align:"center",font:this.data.font,baseline:"bottom",lineHeight:40,value:this.data.label,color:this.data.labelColor,width:this.data.width,wrapCount:30}),this.el.appendChild(this.label),this.textInput=document.createElement("a-entity"),this.textInput.setAttribute("text",{align:this.data.align,font:this.data.font,value:this.data.value,color:this.data.inputColor,width:this.data.width,wrapCount:20}),this.el.appendChild(this.textInput),this.cursor=document.createElement("a-entity"),this.cursor.object3D.position.set(0,0,.001),this.cursor.setAttribute("material",{shader:"flat",color:this.data.inputColor}),this.textInput.appendChild(this.cursor),this.cursorUpdated=!1,this.keyBgColor=new THREE.Color,this.keyHoverColor=new THREE.Color,this.keyPressColor=new THREE.Color;var t=this;document.addEventListener("keydown",function(e){if("t"===e.key){for(var i="",a="abcdefghijklmopqrstuvQWIEUTGASDLIGKBXACQWETL102394676457",n=Math.floor(20*Math.random()),s=0;s<n;s++)i+=a[Math.floor(Math.random()*a.length)];t.el.setAttribute("super-keyboard",{value:i})}}),document.addEventListener("show",this.open.bind(this)),this.hand=null,this.handListenersSet=!1,this.raycaster=null},update:function(t){var e=a[this.data.model],i=this.data.width,n=this.data.width/2;if(void 0!==e){t&&this.defaultValue===t.defaultValue?this.updateTextInput(this.filter(this.rawValue)):(this.rawValue=this.data.value,this.defaultValue=this.data.value,this.updateTextInput(this.filter(this.data.value))),this.data.width===t.width&&this.data.height===t.height&&this.data.keyColor===t.keyColor||(this.kbImg.setAttribute("geometry",{primitive:"plane",width:i,height:n}),this.kbImg.setAttribute("material",{shader:"flat",src:this.data.imagePath+"/"+e.img,color:this.data.keyColor,transparent:!0})),this.data.label===t.label&&this.data.labelColor===t.labelColor&&this.data.width===t.width||(this.label.setAttribute("text",{value:this.data.label,color:this.data.labelColor,width:this.data.width}),this.label.object3D.position.set(0,.3*i,-.02)),this.data.width===t.width&&this.data.keyBgColor===t.keyBgColor||this.initKeyColorPlane();var s="center"!==this.data.align?e.inputOffsetX*i:0;"right"===this.data.align&&(s*=-1),this.data.font===t.font&&this.data.inputColor===t.inputColor&&this.data.width===t.width&&this.data.align===t.align||this.textInput.setAttribute("text",{font:this.data.font,color:this.data.inputColor,width:i,wrapCount:e.wrapCount,align:this.data.align});for(var r=0;r<e.layout.length;r++){var o=e.layout[r];"Insert"===o.key&&(this.inputRect=o)}this.textInput.object3D.position.set(s,i/4-(this.inputRect.y+this.inputRect.h/2)*i/2+e.inputOffsetY*i,.002),this.data.width!==t.width&&this.cursor.setAttribute("geometry",{primitive:"plane",width:.03*i,height:.01*i}),this.updateCursorPosition(),this.setupHand(),this.keyBgColor.set(this.data.keyBgColor),this.keyHoverColor.set(this.data.keyHoverColor),this.keyPressColor.set(this.data.keyPressColor),this.data.show?this.open():this.close()}else console.error('super-keyboard ERROR: model "'+this.data.model+'" undefined.')},tick:function(t){var e;if(!(this.prevCheckTime&&t-this.prevCheckTime<this.data.interval))if(this.prevCheckTime){if(this.raycaster&&this.focused&&(e=this.raycaster.getIntersection(this.kbImg)))for(var i=e.uv,n=a[this.data.model].layout,s=0;s<n.length;s++){var r=n[s];if(i.x>r.x&&i.x<r.x+r.w&&1-i.y>r.y&&1-i.y<r.y+r.h){this.keyHover!==r&&(this.keyHover=r,this.updateKeyColorPlane(this.keyHover.key,this.keyHoverColor));break}}}else this.prevCheckTime=t},play:function(){this.cursorUpdated&&this.startBlinking()},pause:function(){this.stopBlinking()},initKeyColorPlane:function(){var t=this.keyColorPlane=document.createElement("a-entity");t.classList.add("superKeyboardKeyColorPlane"),t.object3D.position.z=.001,t.object3D.visible=!1,t.setAttribute("geometry",{primitive:"plane"}),t.setAttribute("material",{shader:"flat",color:this.data.keyBgColor,transparent:!0}),t.addEventListener("componentinitialized",function(t){"material"===t.detail.name&&(this.getObject3D("mesh").material.blending=THREE.AdditiveBlending)}),this.el.appendChild(t)},updateKeyColorPlane:function(t,e){var i=a[this.data.model],n=this.keyColorPlane;if(t){for(var s=0;s<i.layout.length;s++){var r=i.layout[s];if(r.key===t){var o=this.data.width,h=this.data.width/2,d=o/2,u=h/2,l=r.w*o,c=r.h*h;n.object3D.scale.x=l,n.object3D.scale.y=c,n.object3D.position.x=r.x*o-d+l/2,n.object3D.position.y=(1-r.y)*h-u-c/2,n.getObject3D("mesh").material.color.copy(e);break}}n.object3D.visible=!0}else n.object3D.visible=!1},setupHand:function(){if(this.hand&&this.hand.ownRaycaster&&this.hand.removeAttribute("raycaster"),this.data.hand?this.hand=this.data.hand:this.hand=document.querySelector(["[cursor]","[vive-controls]","[tracked-controls]","[oculus-touch-controls]","[windows-motion-controls]","[hand-controls]","[daydream-controls] [cursor] > [raycaster]"].join(",")),this.hand){if(!this.hand.hasLoaded)return void this.hand.addEventListener("loaded",this.setupHand.bind(this));var t=this.hand.components.raycaster,e={};if(t){if(this.hand.ownRaycaster=!1,this.data.injectToRaycasterObjects){var i=t.data.objects.split(",");-1===i.indexOf(".keyboardRaycastable")&&i.push(".keyboardRaycastable"),e.objects=i.join(",").replace(/^,/,""),this.hand.setAttribute("raycaster",e)}}else this.hand.ownRaycaster=!0,e.showLine=this.data.show,e.enabled=this.data.show,this.data.injectToRaycasterObjects&&(e.objects=".keyboardRaycastable"),this.hand.setAttribute("raycaster",e);this.raycaster=this.hand.components.raycaster}else console.error('super-keyboard: no controller found. Add <a-entity> with controller or specify with super-keyboard="hand: #selectorToController".')},filter:function(t){if(""===t)return"";for(var e=0;e<this.data.filters.length;e++)switch(this.data.filters[e]){case"custom":this.userFilterFunc&&(t=this.userFilterFunc(t));break;case"allupper":t=t.toUpperCase();break;case"alllower":t=t.toLowerCase();break;case"title":t=t.split(" ").map(function(t){return t[0].toUpperCase()+t.substr(1)}).join(" ");break;case"numbers":t=t.split("").filter(function(t){return!isNaN(parseInt(t))||"."===t}).join("");break;case"first":t=t[0].toUpperCase()+t.substr(1);break;case"trim":t=t.trim()}return this.data.maxLength>0?t.substr(0,this.data.maxLength):t},click:function(t){if(this.keyHover){switch(this.keyHover.key){case"Enter":this.accept();break;case"Insert":return;case"Delete":this.rawValue=this.rawValue.substr(0,this.rawValue.length-1);var e=this.filter(this.rawValue);this.el.setAttribute("super-keyboard","value",e),this.updateTextInput(e),this.changeEventDetail.value=e,this.el.emit("superkeyboardchange",this.changeEventDetail);break;case"Shift":this.shift=!this.shift,this.keyHover.el.setAttribute("material","color",this.shift?this.data.keyHoverColor:this.data.keyBgColor);break;case"Escape":this.dismiss();break;default:if(this.data.maxLength>0&&this.rawValue.length>this.data.maxLength)break;this.rawValue+=this.shift?this.keyHover.key.toUpperCase():this.keyHover.key;e=this.filter(this.rawValue);this.el.setAttribute("super-keyboard","value",e),this.updateTextInput(e),this.changeEventDetail.value=e,this.el.emit("superkeyboardchange",this.changeEventDetail)}this.updateKeyColorPlane(this.keyHover.key,this.keyPressColor);var i=this;setTimeout(function(){i.updateKeyColorPlane(i.keyHover.key,i.keyHoverColor)},100),this.updateCursorPosition()}},open:function(){this.el.object3D.visible=!0,this.hand&&this.hand.ownRaycaster&&this.hand.setAttribute("raycaster",{showLine:!0,enabled:!0})},close:function(){this.el.object3D.visible=!1,this.hand&&this.hand.ownRaycaster&&this.hand.setAttribute("raycaster",{showLine:!1,enabled:!1})},accept:function(){this.el.object3D.visible=!1,this.hand&&this.hand.ownRaycaster&&this.hand.setAttribute("raycaster",{showLine:!1,enabled:!1}),this.el.emit("superkeyboardinput",{value:this.data.value}),this.data.show=!1},dismiss:function(){this.data.value=this.defaultValue,this.updateTextInput(),this.el.object3D.visible=!1,this.hand&&this.hand.ownRaycaster&&this.hand.setAttribute("raycaster",{showLine:!1,enabled:!1}),this.el.emit("superkeyboarddismiss"),this.data.show=!1},blur:function(t){this.focused=!1,this.keyHover&&"Shift"!==this.keyHover.key&&this.updateKeyColorPlane(this.keyHover.key,this.keyBgColor),this.keyHover=null},hover:function(t){this.focused=!0},startBlinking:function(){this.stopBlinking(),this.intervalId=window.setInterval(this.blink.bind(this),this.data.blinkingSpeed)},stopBlinking:function(){window.clearInterval(this.intervalId),this.intervalId=0},blink:function(){this.cursor.object3D.visible=!this.cursor.object3D.visible},setCustomFilter:function(t){this.userFilterFunc=t},addCustomModel:function(t,e){t&&(a[t]=e)},updateCursorPosition:function(){var t=this.textInput.components.text.currentFont;if(!t){var e=this;return this.cursor.object3D.visible=!1,void window.setTimeout(function(){e.updateCursorPosition(),e.startBlinking()},700)}var i=this.data.width,r=a[this.data.model],o=-this.inputRect.h/2*i/2.4+r.inputOffsetY*i,h=this.data.width/this.textInput.components.text.data.wrapCount,d=0,u=n[this.textInput.components.text.data.font];void 0===u&&(u=20);for(var l=0;l<this.data.value.length;l++){var c=s(t.chars,this.data.value.charCodeAt(l));d+=c.width+c.xadvance*(32===c.id?2:1)}"center"===this.data.align?d=d*h*u*.0011/2+.02*i:"left"===this.data.align?(d=d*h*u*.0011+.02*i,d-=i/2):"right"===this.data.align&&(d=-d*h*u*.0011-.02*i,d+=i/2),this.cursor.object3D.position.set(d,o,.001),this.cursorUpdated=!0},updateTextInput:function(t){this.textInputObject.value=t||this.data.value,this.textInput.setAttribute("text",this.textInputObject)}})},function(t,e){t.exports={basic:{wrapCount:30,inputOffsetY:.008,inputOffsetX:.08,img:"sk-basic.png",layout:[{key:"1",x:.044,y:.226,w:.079,h:.152},{key:"2",x:.124,y:.226,w:.079,h:.152},{key:"3",x:.203,y:.226,w:.079,h:.152},{key:"4",x:.282,y:.226,w:.08,h:.152},{key:"5",x:.363,y:.226,w:.079,h:.152},{key:"6",x:.442,y:.226,w:.079,h:.152},{key:"7",x:.521,y:.226,w:.079,h:.152},{key:"8",x:.601,y:.226,w:.08,h:.152},{key:"9",x:.681,y:.226,w:.079,h:.152},{key:"0",x:.761,y:.226,w:.079,h:.152},{key:"Delete",x:.846,y:.227,w:.108,h:.146},{key:"Enter",x:.847,y:.526,w:.108,h:.244},{key:"q",x:.044,y:.377,w:.079,h:.152},{key:"w",x:.124,y:.377,w:.079,h:.152},{key:"e",x:.203,y:.377,w:.079,h:.152},{key:"r",x:.282,y:.377,w:.08,h:.152},{key:"t",x:.363,y:.377,w:.079,h:.152},{key:"y",x:.442,y:.377,w:.079,h:.152},{key:"u",x:.521,y:.377,w:.079,h:.152},{key:"i",x:.601,y:.377,w:.08,h:.152},{key:"o",x:.681,y:.377,w:.079,h:.152},{key:"p",x:.761,y:.377,w:.079,h:.152},{key:"l",x:.729,y:.53,w:.08,h:.154},{key:"a",x:.092,y:.53,w:.08,h:.154},{key:"s",x:.171,y:.53,w:.08,h:.154},{key:"d",x:.251,y:.53,w:.08,h:.154},{key:"f",x:.331,y:.53,w:.079,h:.154},{key:"g",x:.41,y:.53,w:.08,h:.154},{key:"h",x:.49,y:.53,w:.079,h:.154},{key:"j",x:.57,y:.53,w:.079,h:.154},{key:"k",x:.649,y:.53,w:.08,h:.154},{key:"z",x:.172,y:.684,w:.079,h:.154},{key:"x",x:.251,y:.684,w:.08,h:.154},{key:"c",x:.331,y:.684,w:.079,h:.154},{key:"v",x:.41,y:.684,w:.08,h:.154},{key:"b",x:.49,y:.684,w:.08,h:.154},{key:"n",x:.57,y:.684,w:.079,h:.154},{key:"m",x:.649,y:.684,w:.08,h:.154},{key:" ",x:.27,y:.838,w:.415,h:.126},{key:"Shift",x:.042,y:.827,w:.068,h:.142},{key:"Escape",x:.876,y:.823,w:.078,h:.134},{key:"Insert",x:.058,y:0,w:.881,h:.149}]},numpad:{wrapCount:20,inputOffsetY:.005,inputOffsetX:.32,img:"sk-numpad.png",layout:[{key:"7",x:.313,y:.254,w:.088,h:.177},{key:"8",x:.401,y:.254,w:.088,h:.177},{key:"9",x:.49,y:.254,w:.088,h:.177},{key:"4",x:.313,y:.431,w:.088,h:.177},{key:"5",x:.401,y:.431,w:.088,h:.177},{key:"6",x:.49,y:.431,w:.088,h:.177},{key:"2",x:.401,y:.608,w:.088,h:.177},{key:"1",x:.313,y:.608,w:.088,h:.177},{key:"3",x:.49,y:.608,w:.088,h:.177},{key:"0",x:.313,y:.785,w:.177,h:.161},{key:".",x:.49,y:.785,w:.088,h:.161},{key:"Escape",x:.578,y:.785,w:.105,h:.161},{key:"Enter",x:.578,y:.431,w:.105,h:.354},{key:"Delete",x:.578,y:.254,w:.105,h:.177},{key:"Insert",x:.294,y:.001,w:.409,h:.19}]}}},function(t,e){var i=(0,AFRAME.utils.debug)("aframe-text-component:error"),a=new THREE.FontLoader;AFRAME.registerComponent("text-geometry",{schema:{bevelEnabled:{default:!1},bevelSize:{default:8,min:0},bevelThickness:{default:12,min:0},curveSegments:{default:12,min:0},font:{type:"asset",default:"https://rawgit.com/ngokevin/kframe/master/components/text-geometry/lib/helvetiker_regular.typeface.json"},height:{default:.05,min:0},size:{default:.5,min:0},style:{default:"normal",oneOf:["normal","italics"]},weight:{default:"normal",oneOf:["normal","bold"]},value:{default:""}},update:function(t){var e=this.data,n=this.el.getOrCreateObject3D("mesh",THREE.Mesh);e.font.constructor===String?a.load(e.font,function(t){var i=AFRAME.utils.clone(e);i.font=t,n.geometry=new THREE.TextGeometry(e.value,i)}):e.font.constructor===Object?n.geometry=new THREE.TextGeometry(e.value,e):i("Must provide `font` (typeface.json) or `fontPath` (string) to text component.")}})}]);
//# sourceMappingURL=aframe-components-city.js.map