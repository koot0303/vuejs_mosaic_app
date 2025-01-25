(function(){"use strict";var t={945:function(t,e,n){var a=n(751),o=n(641),i=n(33);const r={class:"app"},l={key:0},c={for:"mosaic-slider"},s={ref:"canvas",style:{"max-width":"100%"}};function u(t,e,n,u,f,d){return(0,o.uX)(),(0,o.CE)("div",r,[e[4]||(e[4]=(0,o.Lk)("h1",{class:"title"},"画像モザイクフィルタ",-1)),(0,o.Lk)("input",{type:"file",onChange:e[0]||(e[0]=(...t)=>d.handleImageUpload&&d.handleImageUpload(...t)),accept:"image/*"},null,32),f.originalImage?((0,o.uX)(),(0,o.CE)("div",l,[(0,o.Lk)("label",c,"モザイク強度: "+(0,i.v_)(f.blockSize),1),(0,o.bo)((0,o.Lk)("input",{id:"mosaic-slider",type:"range",min:"5",max:"50","onUpdate:modelValue":e[1]||(e[1]=t=>f.blockSize=t),onInput:e[2]||(e[2]=(...t)=>d.applyMosaic&&d.applyMosaic(...t))},null,544),[[a.Jo,f.blockSize]])])):(0,o.Q3)("",!0),(0,o.Lk)("canvas",s,null,512),f.originalImage?((0,o.uX)(),(0,o.CE)("button",{key:1,onClick:e[3]||(e[3]=(...t)=>d.downloadImage&&d.downloadImage(...t))},"画像をダウンロード")):(0,o.Q3)("",!0)])}var f={data(){return{originalImage:null,blockSize:10}},methods:{handleImageUpload(t){const e=t.target.files[0];if(!e)return;const n=new FileReader;n.onload=t=>{const e=new Image;e.onload=()=>{this.originalImage=e;const t=this.$refs.canvas;t.width=e.width,t.height=e.height,this.applyMosaic()},e.src=t.target.result},n.readAsDataURL(e)},applyMosaic(){if(!this.originalImage)return;const t=this.$refs.canvas,e=t.getContext("2d");e.drawImage(this.originalImage,0,0,t.width,t.height);const n=e.getImageData(0,0,t.width,t.height),a=n.data,o=parseInt(this.blockSize);for(let i=0;i<t.height;i+=o)for(let e=0;e<t.width;e+=o){const n=4*(i*t.width+e),r=a[n],l=a[n+1],c=a[n+2];for(let s=0;s<o;s++)for(let n=0;n<o;n++){const o=e+n,u=i+s;if(o<t.width&&u<t.height){const e=4*(u*t.width+o);a[e]=r,a[e+1]=l,a[e+2]=c}}}e.putImageData(n,0,0)},downloadImage(){const t=this.$refs.canvas,e=document.createElement("a");e.download="mosaic_image.png",e.href=t.toDataURL("image/png"),e.click()}}},d=n(262);const h=(0,d.A)(f,[["render",u]]);var g=h;(0,a.Ef)(g).mount("#app")}},e={};function n(a){var o=e[a];if(void 0!==o)return o.exports;var i=e[a]={exports:{}};return t[a](i,i.exports,n),i.exports}n.m=t,function(){var t=[];n.O=function(e,a,o,i){if(!a){var r=1/0;for(u=0;u<t.length;u++){a=t[u][0],o=t[u][1],i=t[u][2];for(var l=!0,c=0;c<a.length;c++)(!1&i||r>=i)&&Object.keys(n.O).every((function(t){return n.O[t](a[c])}))?a.splice(c--,1):(l=!1,i<r&&(r=i));if(l){t.splice(u--,1);var s=o();void 0!==s&&(e=s)}}return e}i=i||0;for(var u=t.length;u>0&&t[u-1][2]>i;u--)t[u]=t[u-1];t[u]=[a,o,i]}}(),function(){n.d=function(t,e){for(var a in e)n.o(e,a)&&!n.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={524:0};n.O.j=function(e){return 0===t[e]};var e=function(e,a){var o,i,r=a[0],l=a[1],c=a[2],s=0;if(r.some((function(e){return 0!==t[e]}))){for(o in l)n.o(l,o)&&(n.m[o]=l[o]);if(c)var u=c(n)}for(e&&e(a);s<r.length;s++)i=r[s],n.o(t,i)&&t[i]&&t[i][0](),t[i]=0;return n.O(u)},a=self["webpackChunkvuejs_mosaic_app"]=self["webpackChunkvuejs_mosaic_app"]||[];a.forEach(e.bind(null,0)),a.push=e.bind(null,a.push.bind(a))}();var a=n.O(void 0,[504],(function(){return n(945)}));a=n.O(a)})();
//# sourceMappingURL=app.d3169dbe.js.map