(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-cate-cate"],{"06c5":function(e,t,n){"use strict";n("a630"),n("fb6a"),n("d3b7"),n("25f0"),n("3ca3"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=o;var a=i(n("6b75"));function i(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(e){if("string"===typeof e)return(0,a.default)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?(0,a.default)(e,t):void 0}}},"21b5":function(e,t,n){"use strict";n.r(t);var a=n("6fc3"),i=n("4ebd");for(var o in i)"default"!==o&&function(e){n.d(t,e,(function(){return i[e]}))}(o);n("59b8");var r,d=n("f0c5"),c=Object(d["a"])(i["default"],a["b"],a["c"],!1,null,"0f71feeb",null,!1,a["a"],r);t["default"]=c.exports},2909:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=c;var a=d(n("6005")),i=d(n("db90")),o=d(n("06c5")),r=d(n("3427"));function d(e){return e&&e.__esModule?e:{default:e}}function c(e){return(0,a.default)(e)||(0,i.default)(e)||(0,o.default)(e)||(0,r.default)()}},2985:function(e,t,n){"use strict";var a=n("4ea4");n("99af"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=a(n("2909"));n("96cf");var o=a(n("1da1")),r={data:function(){return{pageIndex:1,selectedId:0,cate:[{id:0,name:"数码产品"},{id:1,name:"数码产品"},{id:2,name:"数码产品"},{id:3,name:"数码产品"},{id:4,name:"数码产品"},{id:5,name:"数码产品"},{id:6,name:"数码产品"},{id:7,name:"数码产品"},{id:8,name:"数码产品"},{id:9,name:"数码产品"},{id:10,name:"数码产品"},{id:11,name:"数码产品"},{id:12,name:"数码产品"}],goods:[]}},methods:{itemClick:function(e){this.selectedId=e.id},getGoods:function(){var e=this;return(0,o.default)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$myRequest({url:"/getList?pageindex="+e.pageIndex});case 2:n=t.sent,e.pageIndex++,console.log(n),e.goods=[].concat((0,i.default)(e.goods),(0,i.default)(n.data.messages)),console.log(e.goods),n.data||console.log("没有更多了！");case 8:case"end":return t.stop()}}),t)})))()}},onLoad:function(){this.getGoods(),console.log(this.$route)}};t.default=r},3427:function(e,t,n){"use strict";function a(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}Object.defineProperty(t,"__esModule",{value:!0}),t.default=a},"4ebd":function(e,t,n){"use strict";n.r(t);var a=n("2985"),i=n.n(a);for(var o in a)"default"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o);t["default"]=i.a},"51e1":function(e,t,n){var a=n("c0f2");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var i=n("4f06").default;i("09d34c44",a,!0,{sourceMap:!1,shadowMode:!1})},"59b8":function(e,t,n){"use strict";var a=n("51e1"),i=n.n(a);i.a},6005:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=o;var a=i(n("6b75"));function i(e){return e&&e.__esModule?e:{default:e}}function o(e){if(Array.isArray(e))return(0,a.default)(e)}},"6b75":function(e,t,n){"use strict";function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}Object.defineProperty(t,"__esModule",{value:!0}),t.default=a},"6fc3":function(e,t,n){"use strict";var a;n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return a}));var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"cate"},[n("v-uni-view",{staticClass:"left"},e._l(e.cate,(function(t,a){return n("v-uni-view",{key:t.id,class:{selected:e.selectedId==a},on:{click:function(n){arguments[0]=n=e.$handleEvent(n),e.itemClick(t)}}},[e._v(e._s(t.name))])})),1),n("v-uni-scroll-view",{staticClass:"right",attrs:{"scroll-y":"true"}},e._l(e.goods,(function(t){return n("v-uni-view",{staticClass:"goods"},[n("v-uni-image",{attrs:{src:t.img,mode:""}}),n("v-uni-view",{staticClass:"message"},[e._v(e._s(t.message))]),n("v-uni-view",{staticClass:"price"},[e._v(e._s("￥"+t.price))]),n("v-uni-view",{staticClass:"master"},[e._v(e._s(t.master))])],1)})),1)],1)},o=[]},c0f2:function(e,t,n){var a=n("24fb");t=a(!1),t.push([e.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */uni-page-body[data-v-0f71feeb]{height:100%}uni-page-body .cate[data-v-0f71feeb]{display:-webkit-box;display:-webkit-flex;display:flex;height:100%}uni-page-body .cate .left[data-v-0f71feeb]{height:100%;width:%?200?%;border-right:#ccc 1px solid;box-sizing:border-box;overflow:scroll}uni-page-body .cate .left uni-view[data-v-0f71feeb]{height:%?100?%;line-height:%?100?%;text-align:center;font-size:%?30?%;border-top:#ccc solid 1px}uni-page-body .cate .left uni-view[data-v-0f71feeb]:first-child{border-top:none}uni-page-body .cate .left .selected[data-v-0f71feeb]{background-color:#f1729d}uni-page-body .cate .right[data-v-0f71feeb]{height:100%;width:%?510?%;padding:0 %?20?%}uni-page-body .cate .right .goods[data-v-0f71feeb]{margin-bottom:%?10?%;padding-bottom:%?10?%;border-bottom:%?1?% solid #ccc}uni-page-body .cate .right .goods uni-image[data-v-0f71feeb]{width:%?500?%;height:%?500?%}uni-page-body .cate .right .goods .message[data-v-0f71feeb]{font-size:%?30?%;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;text-overflow:ellipsis;overflow:hidden}uni-page-body .cate .right .goods .price[data-v-0f71feeb]{margin-top:%?10?%;font-size:%?30?%;color:red}uni-page-body .cate .right .goods .master[data-v-0f71feeb]{font-size:%?30?%;color:#ccc}',""]),e.exports=t},db90:function(e,t,n){"use strict";function a(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}n("a4d3"),n("e01a"),n("d28b"),n("a630"),n("d3b7"),n("3ca3"),n("ddb0"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=a}}]);