(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["album"],{"129f":function(t,i){t.exports=Object.is||function(t,i){return t===i?0!==t||1/t===1/i:t!=t&&i!=i}},"13d5":function(t,i,s){"use strict";var a=s("23e7"),e=s("d58f").left,n=s("a640"),r=s("ae40"),c=n("reduce"),l=r("reduce",{1:0});a({target:"Array",proto:!0,forced:!c||!l},{reduce:function(t){return e(this,t,arguments.length,arguments.length>1?arguments[1]:void 0)}})},"2b19":function(t,i,s){var a=s("23e7"),e=s("129f");a({target:"Object",stat:!0},{is:e})},"43dd":function(t,i,s){},5146:function(t,i,s){"use strict";var a=s("9d89"),e=s.n(a);e.a},"7c44":function(t,i,s){"use strict";var a=s("43dd"),e=s.n(a);e.a},"9d89":function(t,i,s){},a15b:function(t,i,s){"use strict";var a=s("23e7"),e=s("44ad"),n=s("fc6a"),r=s("a640"),c=[].join,l=e!=Object,o=r("join",",");a({target:"Array",proto:!0,forced:l||!o},{join:function(t){return c.call(n(this),void 0===t?",":t)}})},d58f:function(t,i,s){var a=s("1c0b"),e=s("7b0b"),n=s("44ad"),r=s("50c4"),c=function(t){return function(i,s,c,l){a(s);var o=e(i),u=n(o),d=r(o.length),f=t?d-1:0,p=t?-1:1;if(c<2)while(1){if(f in u){l=u[f],f+=p;break}if(f+=p,t?f<0:d<=f)throw TypeError("Reduce of empty array with no initial value")}for(;t?f>=0:d>f;f+=p)f in u&&(l=s(l,u[f],f,o));return l}};t.exports={left:c(!1),right:c(!0)}},db17:function(t,i,s){"use strict";var a=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{ref:"singerPic",staticClass:"singerPic"},[s("img",{staticClass:"wrap",attrs:{src:t.info.coverImgUrl,alt:""}}),s("main",{staticClass:"detail",style:{opacity:t.opacity}},[s("div",{staticClass:"detail-wrap"},[s("div",{staticClass:"detail-wrap-left"},[s("img",{staticClass:"detail-wrap-bgc",attrs:{src:t.info.coverImgUrl,alt:""}})]),s("div",{staticClass:"detail-wrap-right"},[s("div",[s("p",{staticClass:"detail-wrap-name"},[t._v(t._s(t.info.name))]),t.info.avatarUrl?s("div",{staticClass:"detail-wrap-avatar"},[s("img",{staticClass:"detail-wrap-img",attrs:{src:t.info.avatarUrl,alt:""}}),s("span",{staticClass:"detail-wrap-nickname"},[t._v(t._s(t.info.nickname))])]):t._e(),t.info.artist?s("router-link",{staticClass:"detail-wrap-singername",attrs:{to:"/singer/"+t.info.id}},[s("span",{},[t._v("歌手 : "),s("span",{staticClass:"detail-wrap-artist"},[t._v(t._s(t.info.artist))])]),s("span",{staticClass:"iconfont icon-iconfont2 return-left"})]):t._e()],1),s("div",{staticClass:"detail-wrap-container"},[t.info.publishTime?s("p",{staticClass:"detail-wrap-info ellipsis"},[t._v(" 发行时间: "+t._s(t._f("parseTime")(t.info.publishTime,"{y}-{m}-{d}"))+" ")]):t._e(),s("p",{staticClass:"detail-wrap-info ellipsis"},[t._v(t._s(t.info.description))])])])]),s("div",{staticClass:"detail-msg"},[s("div",{staticClass:"detail-msg-icon iconfont icon-shanchu2"},[s("span",{staticClass:"detail-msg-des"},[t._v(" "+t._s(t._f("filterNum")(t.info.subscribedCount)))])]),s("div",{staticClass:"detail-msg-icon iconfont icon-pinglun"},[s("span",{staticClass:"detail-msg-des"},[t._v(t._s(t._f("filterNum")(t.info.commentCount)))])]),s("div",{staticClass:"detail-msg-icon iconfont icon-fenxiang"},[s("span",{staticClass:"detail-msg-des"},[t._v(" "+t._s(t._f("filterNum")(t.info.shareCount)))])])])]),t._t("default")],2)},e=[],n=(s("a9e3"),{name:"PlaylistBackGround",props:{info:{type:Object,default:function(){}},opacity:{type:[String,Number],default:1}}}),r=n,c=(s("7c44"),s("2877")),l=Object(c["a"])(r,a,e,!1,null,"001dece7",null);i["a"]=l.exports},dbea:function(t,i,s){"use strict";s.r(i);var a=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"album-container"},[s("BaseBack",{attrs:{background:"transparent",title:t.$route.query.name,color:"#fff"}}),s("PlayListBackGround",{attrs:{info:t.info}}),s("PlayListSongList",{attrs:{songs:t.songs},on:{player:t.player}}),s("BaseBall",{ref:"ball"})],1)},e=[],n=(s("a4d3"),s("e01a"),s("a15b"),s("13d5"),s("b0c0"),s("2b19"),s("96cf"),s("1da1")),r=s("5530"),c=s("2f62"),l=s("2b4c");function o(t){return Object(l["a"])({url:"/album?id=".concat(t),method:"get"})}var u=s("db17"),d=s("f8a4"),f={name:"Album",components:{PlayListSongList:d["a"],PlayListBackGround:u["a"]},data:function(){return{songs:[],info:{nickname:"",subscribedCount:0,commentCount:0,description:0,name:"",coverImgUrl:"",avatarUrl:""}}},computed:Object(r["a"])({},Object(c["c"])(["playList"])),created:function(){this.getPlaylist()},methods:Object(r["a"])({getPlaylist:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function i(){var s,a,e,n,r,c,l,u,d;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return s=t.$route.params.id,i.next=3,o(s);case 3:for(a=i.sent,a.code,e=a.songs,n=a.album,r={artist:n.artist.name,subscribedCount:n.info.likedCount||0,commentCount:n.info.commentCount||0,description:n.description,name:n.name,coverImgUrl:n.picUrl,publishTime:n.publishTime,id:n.artist.id},t.info=r,c=[],l=0,u=e.length;l<u;l++)d={id:e[l]["id"],name:e[l]["name"],album:e[l]["al"]["name"],singer:t.getArtist(e[l]["ar"]).join("/"),picUrl:e[l]["al"]["picUrl"],privilege:{pl:e[l]["privilege"]["pl"],fee:e[l]["privilege"]["fee"],flag:e[l]["privilege"]["flag"],maxbr:e[l]["privilege"]["maxbr"]}},c.push(d);t.songs=c;case 12:case"end":return i.stop()}}),i)})))()},getArtist:function(t){return t.reduce((function(t,i){return t.push(i.name),t}),[])},player:function(t,i){this.$refs.ball.drop(i),Object.is(this.songs,this.playList)||(this.setPlay(this.songs),this.setSequenceList(this.songs)),this.setCurrrentIndex(t)}},Object(c["d"])(["setCurrrentIndex","setPlay","setSequenceList"]))},p=f,g=s("2877"),m=Object(g["a"])(p,a,e,!1,null,null,null);i["default"]=m.exports},f8a4:function(t,i,s){"use strict";var a=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"songList"},[s("main",{staticClass:"songlist-main"},[s("ul",{staticClass:"songlist-wrap"},t._l(t.songs,(function(i,a){return s("li",{key:i.id,staticClass:"songlist-item",class:{active:i.id==t.currrenSong.id},on:{click:function(i){return i.stopPropagation(),i.preventDefault(),t.$emit("player",a,i.currentTarget)}}},[s("div",{staticClass:"songlist-index",class:{active:i.id==t.currrenSong.id}},[t._v(" "+t._s(a+1)+" ")]),s("div",{staticClass:"songlist-name "},[s("p",{staticClass:"ellipsis songlist-title",class:{active:i.id==t.currrenSong.id}},[t._v(" "+t._s(i.name)+" ")]),s("div",{staticClass:"songlist-album",class:{active:i.id==t.currrenSong.id}},[s("div",{staticClass:"songlist-album-icons"},[1===i.privilege.fee?s("span",{staticClass:"icon vip"},[t._v("vip")]):t._e(),/1152|1028|1088|1092/.test(i.privilege.flag)?s("span",{staticClass:"icon listen"},[t._v("试听")]):t._e(),/64|68|1088|1092/.test(i.privilege.flag)?s("span",{staticClass:"icon only"},[t._v("独家")]):t._e(),999e3===i.privilege.maxbr?s("span",{staticClass:"iconsq icon sq"},[t._v("SQ")]):t._e()]),s("div",{staticClass:"ellipsis songlist-content"},[s("span",[t._v(t._s(i.singer))]),t._v(" · "),s("span",[t._v(t._s(i.album))])])])])])})),0)])])},e=[],n=s("5530"),r=s("2f62"),c={name:"PlaylistSongList",props:{songs:Array},data:function(){return{showText:!1}},computed:Object(n["a"])({},Object(r["c"])(["currrenSong","fullScreen","playList"]))},l=c,o=(s("5146"),s("2877")),u=Object(o["a"])(l,a,e,!1,null,"542436d0",null);i["a"]=u.exports}}]);
//# sourceMappingURL=album.c0dcd400.js.map