(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["singer-detail"],{"019d":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"detail-container"},[i("BaseBack",{attrs:{background:t.background,title:t.name,color:"#fff"}}),i("SingerInfo",{attrs:{info:t.info}}),i("BaseTabs",{ref:"tabs",attrs:{navList:t.navList,active:t.active,position:"sticky",top:"1.33rem",count:t.info,color:"#a7a3a3",lineColor:"#000",lineWidth:"45px",lineHeight:"2px"},on:{tabs:t.handleScroll,change:t.handleChange}}),i("main",{staticClass:"detail-main"},[t.navList.length>0?i("swiper",{ref:"mySwiper",attrs:{options:t.swiperOptions}},t._l(t.navList,(function(e){return i("swiper-slide",{key:e.id,attrs:{"data-id":e.targetId}},[i(t.currentTabComponent(e.id),{ref:"singerDetail",refInFor:!0,tag:"component",attrs:{active:t.active}})],1)})),1):t._e()],1)],1)},s=[],a=(i("a15b"),i("13d5"),i("b0c0"),i("96cf"),i("1da1")),r=i("5530"),c=i("2f62"),o=i("7f5c"),l=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"singer-info",style:{backgroundImage:"url("+t.info.cover+")"}},[i("div",{staticClass:"singer-info-wrap"},[i("div",{staticClass:"singer-info-name"},[t._v(t._s(t.info.name))]),t.info.identifyTag?i("div",{staticClass:"singer-info-identify"},[i("img",{staticClass:"singer-info-figure",attrs:{src:t.info.identify.imageUrl,alt:""}}),i("span",{staticClass:"singer-info-identifyTag"},[t._v(t._s(t.info.identifyTag))])]):t._e(),t.info.identify.imageDesc?i("p",{staticClass:"singer-info-desc"},[t._v(" "+t._s(t.info.identify.imageDesc)+" ")]):t._e(),t._m(0)]),t._t("default")],2)},u=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"singer-info-action"},[i("span",{staticClass:"singer-info-btn singer-info-follow"},[t._v(" + 关注")]),i("span",{staticClass:"singer-info-btn singer-info-twitter iconfont icon-duanxin"},[t._v(" 私信")])])}],f={name:"SingerInfo",props:{info:{type:Object}}},g=f,m=(i("5fbc"),i("2877")),d=Object(m["a"])(g,l,u,!1,null,"35694c5a",null),p=d.exports,v=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"singer-about",class:3==t.active?"auto-height":"fixed-height"},[t.info.briefDesc?i("section",{staticClass:"singer-about-info"},[i("h2",[t._v("歌手资料")]),i("div",{staticClass:"singer-about-briefDesc"},[t._v(t._s(t.info.briefDesc))])]):t._e(),t.info.topicData.length?i("section",{staticClass:"singer-about-represent"},[i("h2",[t._v("代表作品")]),t._l(t.info.topicData,(function(e){return i("div",{key:e.id,staticClass:"singer-about-represent-item"},[i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.coverUrl,expression:"item.coverUrl"}],staticClass:"singer-about-represent-left",attrs:{alt:""}}),i("div",{staticClass:"singer-about-represent-right"},[i("p",{staticClass:"singer-about-represent-mainTitle"},[t._v(t._s(e.mainTitle))]),i("p",{staticClass:"singer-about-represent-tag ellipsis"},[t._v(" 标签: "+t._s(e.tags.join(","))+" ")]),i("span",{staticClass:"singer-about-represent-read "},[t._v(t._s(e.categoryName||"")+", 阅读 "+t._s(t._f("filterNum")(e.readCount)))])])])}))],2):t._e(),t.simiArtists.length?i("section",{staticClass:"singer-about-samilar",on:{touchmove:function(t){t.stopPropagation()},touchstart:function(t){t.stopPropagation()},scroll:function(t){t.stopPropagation()}}},[i("h2",[t._v("相似歌手")]),i("div",{staticClass:"singer-about-samilar-main"},[i("div",{staticClass:"singer-about-samilar-scroller"},[i("ul",{staticClass:"singer-about-samilar-wrap"},t._l(t.simiArtists,(function(e){return i("li",{key:e.id,staticClass:"singer-about-samilar-item"},[i("router-link",{attrs:{to:"/singer/"+e.id}},[i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.img1v1Url,expression:"item.img1v1Url"}],staticClass:"singer-about-samilar-figure",attrs:{alt:""}}),i("span",{staticClass:"singer-about-samilar-name"},[t._v(t._s(e.name))])])],1)})),0)])])]):t._e()])},b=[],h=(i("a9e3"),{name:"SingerAbout",props:{active:{type:[String,Number],default:"0"}},data:function(){return{info:{topicData:[],briefDesc:""},simiArtists:[]}},created:function(){return Object(a["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)})))()},methods:{getDetail:function(){var t=this.$route.params.id;this.getSingerInfo(t),this.getSimiSinger(t)},getSingerInfo:function(t){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function i(){var n,s,a,r;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.next=2,Object(o["b"])(t);case 2:n=i.sent,s=n.code,a=n.topicData,r=n.briefDesc,200==s&&(e.info={topicData:a,briefDesc:r});case 7:case"end":return i.stop()}}),i)})))()},getSimiSinger:function(t){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function i(){var n,s,a;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.next=2,Object(o["e"])(t);case 2:n=i.sent,s=n.artists,a=n.code,200==a&&(e.simiArtists=s);case 6:case"end":return i.stop()}}),i)})))()}}}),_=h,C=(i("0a28"),Object(m["a"])(_,v,b,!1,null,"633b75f0",null)),S=C.exports,y=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"singer-album",class:1==t.active?"auto-height":"fixed-height"},[i("ul",{staticClass:"singer-album-wrap"},t._l(t.albums,(function(e){return i("router-link",{key:e.id,staticClass:"singer-album-item",attrs:{tag:"li",to:"/album/"+e.id}},[i("div",{staticClass:"singer-album-left"},[i("img",{staticClass:"singer-album-figure",attrs:{src:e.picUrl,alt:""}})]),i("div",{staticClass:"singer-album-right"},[i("p",{staticClass:"singer-album-name ellipsis"},[t._v(t._s(e.name))]),i("p",{staticClass:"singer-album-publishTime"},[t._v(" "+t._s(t._f("parseTime")(e.publishTime,"{y}-{m}-{d}"))+" ")])])])})),1)])},w=[],j={name:"SingerAblum",props:{active:{type:[String,Number],default:"0"}},data:function(){return{albums:[]}},methods:{getDetail:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var i,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(o["a"])(t.$route.params.id);case 2:i=e.sent,n=i.hotAlbums,t.albums=n;case 5:case"end":return e.stop()}}),e)})))()}}},O=j,x=(i("46a5"),Object(m["a"])(O,y,w,!1,null,"526c224d",null)),D=x.exports,k=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"singer-songs",class:0==t.active?"auto-height":"fixed-height"},[i("PlayListSongList",{attrs:{songs:t.songs},on:{player:t.player}})],1)},T=[],L=(i("2b19"),i("f8a4")),$={name:"SingerHotSong",components:{PlayListSongList:L["a"]},props:{active:{type:[String,Number],default:"0"}},data:function(){return{songs:[]}},computed:Object(r["a"])({},Object(c["c"])(["playList","fullScreen"])),methods:Object(r["a"])({getDetail:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var i,n,s,a,r,c,l;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return i=t.$route.params.id,e.next=3,Object(o["f"])(i);case 3:for(n=e.sent,s=n.songs,a=[],r=0,c=s.length;r<c;r++)l={id:s[r]["id"],name:s[r]["name"],album:s[r]["al"]["name"],alia:s[r]["alia"].join(" "),singer:t.getArtist(s[r]["ar"]).join("/"),picUrl:s[r]["al"]["picUrl"],privilege:{pl:s[r]["privilege"]["pl"],fee:s[r]["privilege"]["fee"],flag:s[r]["privilege"]["flag"],maxbr:s[r]["privilege"]["maxbr"]}},a.push(l);t.songs=a;case 8:case"end":return e.stop()}}),e)})))()},getArtist:function(t){return t.reduce((function(t,e){return t.push(e.name),t}),[])},player:function(t,e){this.$drop(e),Object.is(this.songs,this.playList)||(this.setPlay(this.songs),this.setSequenceList(this.songs)),this.setCurrrentIndex(t)}},Object(c["d"])(["setCurrrentIndex","setPlay","setFullScreen","setSequenceList"]))},A=$,z=(i("9902"),Object(m["a"])(A,k,T,!1,null,"1923f7fd",null)),E=z.exports,I=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"singer-mv",class:2==t.active?"auto-height":"fixed-height"},t._l(t.mvs,(function(e){return i("section",{key:e.id,staticClass:"singer-mv-section"},[i("div",{staticClass:"singer-mv-wrap"},[i("div",{staticClass:"singer-mv-main",style:{backgroundImage:"url("+e.imgurl+")"}}),i("div",{staticClass:"singer-mv-figure"},[i("img",{staticClass:"singer-mv-img",attrs:{src:e.imgurl,alt:""}}),i("span",{staticClass:"singer-mv-border"}),i("span",{staticClass:"singer-mv-border"}),i("span",{staticClass:"singer-mv-border"}),i("span",{staticClass:"singer-mv-border"})]),i("div",{staticClass:"singer-mv-desc"},[i("span",[t._v(t._s(e.publishTime))]),i("span",[t._v(t._s(t._f("format")(e.duration/1e3)))])])]),i("div",{staticClass:"singer-mv-info"},[i("p",{staticClass:"singer-mv-name ellipsis"},[t._v(" "+t._s(e.name)+" ")]),i("p",{staticClass:"singer-mv-count"},[i("span",{staticClass:"iconfont icon-erji"}),t._v(" "+t._s(t._f("filterNum")(e.playCount))+" ")])])])})),0)},R=[],P={name:"SingerMV",props:{active:{type:[String,Number],default:"0"}},data:function(){return{mvs:[]}},methods:{getDetail:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var i,n,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(o["d"])(t.$route.params.id);case 2:i=e.sent,n=i.code,s=i.mvs,200==n&&(t.mvs=s);case 6:case"end":return e.stop()}}),e)})))()}}},N=P,U=(i("782b"),Object(m["a"])(N,I,R,!1,null,"47d3ddb1",null)),q=U.exports,H={1:"SingerHotSong",2:"SingerAlbum",3:"SingerMV",4:"SingerAbout"},M={name:"SingerDetail",components:{SingerAbout:S,SingerAlbum:D,SingerHotSong:E,SingerMV:q,SingerInfo:p},data:function(){var t=this;return{active:0,background:"",name:"",navList:[{id:1,name:"歌曲",icon:"musicSize"},{id:2,name:"专辑",icon:"albumSize"},{id:3,name:"视频",icon:"mvSize"},{id:4,name:"关于TA",icon:""}],scrollList:{},swiperOptions:{on:{slideChange:function(){t.active=t.swiper.activeIndex}},loop:!1,watchSlidesVisibility:!0},info:{cover:"",albumSize:"",identifyTag:"",musicSize:"",mvSize:"",name:"",identify:{imageDesc:"",imageUrl:""}}}},computed:Object(r["a"])({swiper:function(){return this.$refs.mySwiper.swiper},currentTabComponent:function(){return function(t){return H[t]}}},Object(c["c"])(["playList","currrenSong","fullScreen","singer","currrentIndex"])),created:function(){this.getSingerInfo()},mounted:function(){var t=this;this.singerDetail=this.$refs.singerDetail,this.singerDetail[0].getDetail(),this.$refs.tabs.init(),document.addEventListener("scroll",this.scroll),this.$once("beforeDestory",(function(){return document.addEventListener("scroll",t.scroll)}))},methods:Object(r["a"])({getSingerInfo:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var i,n,s,a,r,c,l,u,f,g,m,d,p;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return i=t.$route.params.id,e.next=3,Object(o["c"])(i);case 3:n=e.sent,s=n.code,a=n.data,r=a.artist,c=a.identify,200==s&&(l=r.cover,u=r.albumSize,f=r.identifyTag,g=void 0===f?[]:f,m=r.musicSize,d=r.mvSize,p=r.name,t.info={cover:l,albumSize:u,identifyTag:g&&g.join(" / ")||"",musicSize:m,mvSize:d,name:p,identify:c});case 9:case"end":return e.stop()}}),e)})))()},scroll:function(){this.background="rgba(0,0,0,".concat(Math.min(document.documentElement.scrollTop/150,1),")"),document.documentElement.scrollTop>150?this.name=this.info.name:this.name=""},getArtist:function(t){return t.reduce((function(t,e){return t.push(e.name),t}),[])},handleChange:function(t,e){console.log(t,e),this.singerDetail[t].getDetail(),document.documentElement.scrollTop<240?this.scrollList={}:(this.scrollList[e]=document.documentElement.scrollTop,document.documentElement.scrollTop=this.scrollList[t]||240)},handleScroll:function(t){this.active!=t&&this.swiper.slideTo(t,0,!1)}},Object(c["d"])(["setCurrrentIndex","setPlay","setFullScreen","setSequenceList"]))},V=M,B=(i("273c"),Object(m["a"])(V,n,s,!1,null,"4156cb48",null));e["default"]=B.exports},"0619":function(t,e,i){},"0a28":function(t,e,i){"use strict";var n=i("98d5"),s=i.n(n);s.a},"129f":function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},1312:function(t,e,i){},"13d5":function(t,e,i){"use strict";var n=i("23e7"),s=i("d58f").left,a=i("a640"),r=i("ae40"),c=a("reduce"),o=r("reduce",{1:0});n({target:"Array",proto:!0,forced:!c||!o},{reduce:function(t){return s(this,t,arguments.length,arguments.length>1?arguments[1]:void 0)}})},"273c":function(t,e,i){"use strict";var n=i("0619"),s=i.n(n);s.a},"2b19":function(t,e,i){var n=i("23e7"),s=i("129f");n({target:"Object",stat:!0},{is:s})},"46a5":function(t,e,i){"use strict";var n=i("7d6b"),s=i.n(n);s.a},"4fa0":function(t,e,i){"use strict";var n=i("8e73"),s=i.n(n);s.a},5121:function(t,e,i){},"5fbc":function(t,e,i){"use strict";var n=i("ae60"),s=i.n(n);s.a},"782b":function(t,e,i){"use strict";var n=i("1312"),s=i.n(n);s.a},"7d6b":function(t,e,i){},"7f5c":function(t,e,i){"use strict";i.d(e,"g",(function(){return s})),i.d(e,"c",(function(){return a})),i.d(e,"b",(function(){return r})),i.d(e,"f",(function(){return c})),i.d(e,"a",(function(){return o})),i.d(e,"e",(function(){return l})),i.d(e,"d",(function(){return u}));var n=i("2b4c");function s(t){return Object(n["a"])({url:"/toplist/artist?type=".concat(t),method:"get"})}function a(t){return Object(n["a"])({url:"/artist/detail?id=".concat(t),method:"get"})}function r(t){return Object(n["a"])({url:"/artist/desc?id=".concat(t),method:"get"})}function c(t){return Object(n["a"])({url:"/artist/songs?id=".concat(t),method:"get"})}function o(t){return Object(n["a"])({url:"/artist/album?id=".concat(t),method:"get"})}function l(t){return Object(n["a"])({url:"/simi/artist?id=".concat(t),method:"get"})}function u(t){return Object(n["a"])({url:"artist/mv?id=".concat(t),method:"get"})}},"8e73":function(t,e,i){},"98d5":function(t,e,i){},9902:function(t,e,i){"use strict";var n=i("5121"),s=i.n(n);s.a},a15b:function(t,e,i){"use strict";var n=i("23e7"),s=i("44ad"),a=i("fc6a"),r=i("a640"),c=[].join,o=s!=Object,l=r("join",",");n({target:"Array",proto:!0,forced:o||!l},{join:function(t){return c.call(a(this),void 0===t?",":t)}})},ae60:function(t,e,i){},d58f:function(t,e,i){var n=i("1c0b"),s=i("7b0b"),a=i("44ad"),r=i("50c4"),c=function(t){return function(e,i,c,o){n(i);var l=s(e),u=a(l),f=r(l.length),g=t?f-1:0,m=t?-1:1;if(c<2)while(1){if(g in u){o=u[g],g+=m;break}if(g+=m,t?g<0:f<=g)throw TypeError("Reduce of empty array with no initial value")}for(;t?g>=0:f>g;g+=m)g in u&&(o=i(o,u[g],g,l));return o}};t.exports={left:c(!1),right:c(!0)}},f8a4:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"songList"},[i("main",{staticClass:"songlist-main"},[i("ul",{staticClass:"songlist-wrap"},t._l(t.songs,(function(e,n){return i("li",{key:e.id,staticClass:"songlist-item",class:{active:e.id==t.currrenSong.id},on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.$emit("player",n,e.currentTarget)}}},[i("div",{staticClass:"songlist-index",class:{active:e.id==t.currrenSong.id}},[t._v(" "+t._s(n+1)+" ")]),i("div",{staticClass:"songlist-name "},[i("div",{staticClass:"ellipsis songlist-title",class:{active:e.id==t.currrenSong.id}},[i("span",[t._v(" "+t._s(e.name)+" ")]),e.alia?i("span",{staticStyle:{color:"#a59797f5"}},[t._v(" ("+t._s(e.alia)+")")]):t._e()]),i("div",{staticClass:"songlist-album",class:{active:e.id==t.currrenSong.id}},[i("div",{staticClass:"songlist-album-icons"},[999e3===e.privilege.maxbr?i("span",{staticClass:"iconsq icon sq"},[t._v("SQ")]):t._e(),/64|68|1088|1092/.test(e.privilege.flag)?i("span",{staticClass:"icon only"},[t._v("独家")]):t._e(),1===e.privilege.fee?i("span",{staticClass:"icon vip"},[t._v("vip")]):t._e(),/1152|1028|1088|1092/.test(e.privilege.flag)?i("span",{staticClass:"icon listen"},[t._v("试听")]):t._e()]),i("div",{staticClass:"ellipsis songlist-content"},[i("span",[t._v(t._s(e.singer))]),t._v(" · "),i("span",[t._v(t._s(e.album))])])])])])})),0)])])},s=[],a=i("5530"),r=i("2f62"),c={name:"PlaylistSongList",props:{songs:Array},data:function(){return{showText:!1}},computed:Object(a["a"])({},Object(r["c"])(["currrenSong","fullScreen","playList"]))},o=c,l=(i("4fa0"),i("2877")),u=Object(l["a"])(o,n,s,!1,null,"f6b5e72a",null);e["a"]=u.exports}}]);
//# sourceMappingURL=singer-detail.0773a7f9.js.map