(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["album"],{"129f":function(t,i){t.exports=Object.is||function(t,i){return t===i?0!==t||1/t===1/i:t!=t&&i!=i}},"13d5":function(t,i,a){"use strict";var s=a("23e7"),e=a("d58f").left,n=a("a640"),r=a("ae40"),c=n("reduce"),l=r("reduce",{1:0});s({target:"Array",proto:!0,forced:!c||!l},{reduce:function(t){return e(this,t,arguments.length,arguments.length>1?arguments[1]:void 0)}})},"2b19":function(t,i,a){var s=a("23e7"),e=a("129f");s({target:"Object",stat:!0},{is:e})},"43dd":function(t,i,a){},"4fa0":function(t,i,a){"use strict";var s=a("8e73"),e=a.n(s);e.a},"7c44":function(t,i,a){"use strict";var s=a("43dd"),e=a.n(s);e.a},"8e73":function(t,i,a){},a15b:function(t,i,a){"use strict";var s=a("23e7"),e=a("44ad"),n=a("fc6a"),r=a("a640"),c=[].join,l=e!=Object,o=r("join",",");s({target:"Array",proto:!0,forced:l||!o},{join:function(t){return c.call(n(this),void 0===t?",":t)}})},d58f:function(t,i,a){var s=a("1c0b"),e=a("7b0b"),n=a("44ad"),r=a("50c4"),c=function(t){return function(i,a,c,l){s(a);var o=e(i),u=n(o),f=r(o.length),d=t?f-1:0,p=t?-1:1;if(c<2)while(1){if(d in u){l=u[d],d+=p;break}if(d+=p,t?d<0:f<=d)throw TypeError("Reduce of empty array with no initial value")}for(;t?d>=0:f>d;d+=p)d in u&&(l=a(l,u[d],d,o));return l}};t.exports={left:c(!1),right:c(!0)}},db17:function(t,i,a){"use strict";var s=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{ref:"singerPic",staticClass:"singerPic"},[a("img",{staticClass:"wrap",attrs:{src:t.info.coverImgUrl,alt:""}}),a("main",{staticClass:"detail",style:{opacity:t.opacity}},[a("div",{staticClass:"detail-wrap"},[a("div",{staticClass:"detail-wrap-left"},[a("img",{staticClass:"detail-wrap-bgc",attrs:{src:t.info.coverImgUrl,alt:""}})]),a("div",{staticClass:"detail-wrap-right"},[a("div",[a("p",{staticClass:"detail-wrap-name"},[t._v(t._s(t.info.name))]),t.info.avatarUrl?a("div",{staticClass:"detail-wrap-avatar"},[a("img",{staticClass:"detail-wrap-img",attrs:{src:t.info.avatarUrl,alt:""}}),a("span",{staticClass:"detail-wrap-nickname"},[t._v(t._s(t.info.nickname))])]):t._e(),t.info.artist?a("router-link",{staticClass:"detail-wrap-singername",attrs:{to:"/singer/"+t.info.id}},[a("span",{},[t._v("歌手 : "),a("span",{staticClass:"detail-wrap-artist"},[t._v(t._s(t.info.artist))])]),a("span",{staticClass:"iconfont icon-iconfont2 return-left"})]):t._e()],1),a("div",{staticClass:"detail-wrap-container"},[t.info.publishTime?a("p",{staticClass:"detail-wrap-info ellipsis"},[t._v(" 发行时间: "+t._s(t._f("parseTime")(t.info.publishTime,"{y}-{m}-{d}"))+" ")]):t._e(),a("p",{staticClass:"detail-wrap-info ellipsis"},[t._v(t._s(t.info.description))])])])]),a("div",{staticClass:"detail-msg"},[a("div",{staticClass:"detail-msg-icon iconfont icon-shanchu2"},[a("span",{staticClass:"detail-msg-des"},[t._v(" "+t._s(t._f("filterNum")(t.info.subscribedCount)))])]),a("div",{staticClass:"detail-msg-icon iconfont icon-pinglun"},[a("span",{staticClass:"detail-msg-des"},[t._v(t._s(t._f("filterNum")(t.info.commentCount)))])]),a("div",{staticClass:"detail-msg-icon iconfont icon-fenxiang"},[a("span",{staticClass:"detail-msg-des"},[t._v(" "+t._s(t._f("filterNum")(t.info.shareCount)))])])])]),t._t("default")],2)},e=[],n=(a("a9e3"),{name:"PlaylistBackGround",props:{info:{type:Object,default:function(){}},opacity:{type:[String,Number],default:1}}}),r=n,c=(a("7c44"),a("2877")),l=Object(c["a"])(r,s,e,!1,null,"001dece7",null);i["a"]=l.exports},dbea:function(t,i,a){"use strict";a.r(i);var s=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{staticClass:"album-container"},[a("BaseBack",{attrs:{background:"transparent",title:t.$route.query.name,color:"#fff"}}),a("PlayListBackGround",{attrs:{info:t.info}}),a("PlayListSongList",{attrs:{songs:t.songs},on:{player:t.player}}),a("BaseBall",{ref:"ball"})],1)},e=[],n=(a("a4d3"),a("e01a"),a("a15b"),a("13d5"),a("b0c0"),a("2b19"),a("96cf"),a("1da1")),r=a("5530"),c=a("2f62"),l=a("e498"),o=a("db17"),u=a("f8a4"),f={name:"Album",components:{PlayListSongList:u["a"],PlayListBackGround:o["a"]},data:function(){return{songs:[],info:{nickname:"",subscribedCount:0,commentCount:0,description:0,name:"",coverImgUrl:"",avatarUrl:""}}},computed:Object(r["a"])({},Object(c["c"])(["playList"])),created:function(){this.getPlaylist()},methods:Object(r["a"])({getPlaylist:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function i(){var a,s,e,n,r,c,o,u,f;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return a=t.$route.params.id,i.next=3,Object(l["a"])(a);case 3:for(s=i.sent,s.code,e=s.songs,n=s.album,r={artist:n.artist.name,subscribedCount:n.info.likedCount||0,commentCount:n.info.commentCount||0,description:n.description,name:n.name,coverImgUrl:n.picUrl,publishTime:n.publishTime,id:n.artist.id},t.info=r,c=[],o=0,u=e.length;o<u;o++)f={id:e[o]["id"],name:e[o]["name"],album:e[o]["al"]["name"],singer:t.getArtist(e[o]["ar"]).join("/"),picUrl:e[o]["al"]["picUrl"],privilege:{pl:e[o]["privilege"]["pl"],fee:e[o]["privilege"]["fee"],flag:e[o]["privilege"]["flag"],maxbr:e[o]["privilege"]["maxbr"]}},c.push(f);t.songs=c;case 12:case"end":return i.stop()}}),i)})))()},getArtist:function(t){return t.reduce((function(t,i){return t.push(i.name),t}),[])},player:function(t,i){this.$refs.ball.drop(i),Object.is(this.songs,this.playList)||(this.setPlay(this.songs),this.setSequenceList(this.songs)),this.setCurrrentIndex(t)}},Object(c["d"])(["setCurrrentIndex","setPlay","setSequenceList"]))},d=f,p=a("2877"),m=Object(p["a"])(d,s,e,!1,null,null,null);i["default"]=m.exports},e498:function(t,i,a){"use strict";a.d(i,"a",(function(){return e})),a.d(i,"e",(function(){return n})),a.d(i,"b",(function(){return r})),a.d(i,"d",(function(){return c})),a.d(i,"f",(function(){return l})),a.d(i,"c",(function(){return o}));var s=a("2b4c");function e(t){return Object(s["a"])({url:"/album?id=".concat(t),method:"get"})}function n(){return Object(s["a"])({url:"/album/newest",method:"get"})}function r(t){return Object(s["a"])({url:"/album/list",method:"get",params:t})}function c(t){return Object(s["a"])({url:"/album/new?area=".concat(t,"&limit=10"),method:"get"})}function l(t){return Object(s["a"])({url:"album/songsaleboard",params:t,method:"get"})}function o(t){return Object(s["a"])({url:"/album/list/style",method:"get",params:t})}},f8a4:function(t,i,a){"use strict";var s=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{staticClass:"songList"},[a("main",{staticClass:"songlist-main"},[a("ul",{staticClass:"songlist-wrap"},t._l(t.songs,(function(i,s){return a("li",{key:i.id,staticClass:"songlist-item",class:{active:i.id==t.currrenSong.id},on:{click:function(i){return i.stopPropagation(),i.preventDefault(),t.$emit("player",s,i.currentTarget)}}},[a("div",{staticClass:"songlist-index",class:{active:i.id==t.currrenSong.id}},[t._v(" "+t._s(s+1)+" ")]),a("div",{staticClass:"songlist-name "},[a("div",{staticClass:"ellipsis songlist-title",class:{active:i.id==t.currrenSong.id}},[a("span",[t._v(" "+t._s(i.name)+" ")]),i.alia?a("span",{staticStyle:{color:"#a59797f5"}},[t._v(" ("+t._s(i.alia)+")")]):t._e()]),a("div",{staticClass:"songlist-album",class:{active:i.id==t.currrenSong.id}},[a("div",{staticClass:"songlist-album-icons"},[999e3===i.privilege.maxbr?a("span",{staticClass:"iconsq icon sq"},[t._v("SQ")]):t._e(),/64|68|1088|1092/.test(i.privilege.flag)?a("span",{staticClass:"icon only"},[t._v("独家")]):t._e(),1===i.privilege.fee?a("span",{staticClass:"icon vip"},[t._v("vip")]):t._e(),/1152|1028|1088|1092/.test(i.privilege.flag)?a("span",{staticClass:"icon listen"},[t._v("试听")]):t._e()]),a("div",{staticClass:"ellipsis songlist-content"},[a("span",[t._v(t._s(i.singer))]),t._v(" · "),a("span",[t._v(t._s(i.album))])])])])])})),0)])])},e=[],n=a("5530"),r=a("2f62"),c={name:"PlaylistSongList",props:{songs:Array},data:function(){return{showText:!1}},computed:Object(n["a"])({},Object(r["c"])(["currrenSong","fullScreen","playList"]))},l=c,o=(a("4fa0"),a("2877")),u=Object(o["a"])(l,s,e,!1,null,"f6b5e72a",null);i["a"]=u.exports}}]);
//# sourceMappingURL=album.f0c63cb7.js.map