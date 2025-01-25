(function(){"use strict";var e={281:function(e,t,n){var a=n(751),o=n(641),i=n(33);const r={class:"app"},l={key:0},c={for:"mosaic-slider"},s={ref:"canvas",style:{"max-width":"100%"}},u=["disabled"];function d(e,t,n,d,f,h){return(0,o.uX)(),(0,o.CE)("div",r,[t[4]||(t[4]=(0,o.Lk)("h1",{class:"title"},"画像モザイクフィルタ",-1)),(0,o.Lk)("input",{type:"file",onChange:t[0]||(t[0]=(...e)=>h.handleImageUpload&&h.handleImageUpload(...e)),accept:"image/*"},null,32),f.originalImage?((0,o.uX)(),(0,o.CE)("div",l,[(0,o.Lk)("label",c,"モザイク強度: "+(0,i.v_)(f.blockSize),1),(0,o.bo)((0,o.Lk)("input",{id:"mosaic-slider",type:"range",min:"5",max:"100",step:"5","onUpdate:modelValue":t[1]||(t[1]=e=>f.blockSize=e),onInput:t[2]||(t[2]=(...e)=>h.applyMosaic&&h.applyMosaic(...e))},null,544),[[a.Jo,f.blockSize]])])):(0,o.Q3)("",!0),(0,o.Lk)("canvas",s,null,512),(0,o.Lk)("button",{disabled:!f.originalImage,onClick:t[3]||(t[3]=(...e)=>h.downloadImage&&h.downloadImage(...e))},"画像をダウンロード",8,u)])}var f={data(){return{originalImage:null,blockSize:10}},methods:{handleImageUpload(e){const t=e.target.files[0];if(!t)return;const n=new FileReader;n.onload=e=>{const t=new Image;t.onload=()=>{this.originalImage=t;const e=this.$refs.canvas;e.width=t.width,e.height=t.height,this.applyMosaic()},t.src=e.target.result},n.readAsDataURL(t)},applyMosaic(){if(!this.originalImage)return;const e=this.$refs.canvas,t=e.getContext("2d");t.drawImage(this.originalImage,0,0,e.width,e.height);const n=t.getImageData(0,0,e.width,e.height),a=n.data,o=parseInt(this.blockSize);for(let i=0;i<e.height;i+=o)for(let t=0;t<e.width;t+=o){const n=4*(i*e.width+t),r=a[n],l=a[n+1],c=a[n+2];for(let s=0;s<o;s++)for(let n=0;n<o;n++){const o=t+n,u=i+s;if(o<e.width&&u<e.height){const t=4*(u*e.width+o);a[t]=r,a[t+1]=l,a[t+2]=c}}}t.putImageData(n,0,0)},downloadImage(){const e=this.$refs.canvas,t=document.createElement("a");t.download="mosaic_image.png",t.href=e.toDataURL("image/png"),t.click()}}},h=n(262);const g=(0,h.A)(f,[["render",d]]);var p=g;(0,a.Ef)(p).mount("#app")}},t={};function n(a){var o=t[a];if(void 0!==o)return o.exports;var i=t[a]={exports:{}};return e[a](i,i.exports,n),i.exports}n.m=e,function(){var e=[];n.O=function(t,a,o,i){if(!a){var r=1/0;for(u=0;u<e.length;u++){a=e[u][0],o=e[u][1],i=e[u][2];for(var l=!0,c=0;c<a.length;c++)(!1&i||r>=i)&&Object.keys(n.O).every((function(e){return n.O[e](a[c])}))?a.splice(c--,1):(l=!1,i<r&&(r=i));if(l){e.splice(u--,1);var s=o();void 0!==s&&(t=s)}}return t}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[a,o,i]}}(),function(){n.d=function(e,t){for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={524:0};n.O.j=function(t){return 0===e[t]};var t=function(t,a){var o,i,r=a[0],l=a[1],c=a[2],s=0;if(r.some((function(t){return 0!==e[t]}))){for(o in l)n.o(l,o)&&(n.m[o]=l[o]);if(c)var u=c(n)}for(t&&t(a);s<r.length;s++)i=r[s],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(u)},a=self["webpackChunkvuejs_mosaic_app"]=self["webpackChunkvuejs_mosaic_app"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var a=n.O(void 0,[504],(function(){return n(281)}));a=n.O(a)})();
//# sourceMappingURL=app.6b59dfa1.js.map