(window['webpackJsonp'] = window['webpackJsonp'] || []).push([['detail'], {'0032': function(t, e, n){}, '129f': function(t, e){t.exports = Object.is || function(t, e){return t === e ? 0 !== t || 1 / t === 1 / e : t != t && e != e}}, '132a': function(t, e, n){'use strict';var r = n('6463'), s = n.n(r);s.a}, '1d13': function(t, e, n){}, '2b19': function(t, e, n){var r = n('23e7'), s = n('129f');r({target: 'Object', stat: !0}, {is: s})}, '324a': function(t, e, n){'use strict';n.d(e, 'e', (function(){return s})), n.d(e, 'd', (function(){return i})), n.d(e, 'b', (function(){return a})), n.d(e, 'a', (function(){return c})), n.d(e, 'c', (function(){return o}));var r = n('2b4c');function s(){return Object(r['a'])({url: '/personalized', method: 'get'})}function i(){return Object(r['a'])({url: '/personalized/newsong', method: 'get'})}function a(){return Object(r['a'])({url: '/banner', method: 'get'})}function c(t){return Object(r['a'])({url: '/playlist/detail?id='.concat(t), method: 'get'})}function o(t){return Object(r['a'])({url: '/song/detail?ids='.concat(t), method: 'get'})}}, 6463: function(t, e, n){}, '7f5c': function(t, e, n){'use strict';n.d(e, 'b', (function(){return s})), n.d(e, 'a', (function(){return i}));var r = n('2b4c');function s(){return Object(r['a'])({url: '/top/artists?limit=100', method: 'get'})}function i(t){return Object(r['a'])({url: 'artists?id='.concat(t), method: 'get'})}}, bc91: function(t, e, n){'use strict';var r = n('0032'), s = n.n(r);s.a}, cfeb: function(t, e, n){'use strict';n.r(e);var r = function(){var t = this, e = t.$createElement, n = t._self._c || e;return n('div', {staticClass: 'detail-container'}, [n('div', {staticClass: 'inner_item', on: {scroll: t.scroll}}, [n('BaseBack', {attrs: {isFixed: !0, background: 'rgba(22, 154, 243, ' + t.percent + ')'}}, [n('span', {directives: [{name: 'show', rawName: 'v-show', value: t.showText, expression: 'showText'}], staticStyle: {color: '#fff', fontSize: '14px'}}, [t._v(t._s(t.$route.query.name))])]), n('DetailBackGround'), n('DetailSongList', {attrs: {songs: t.songs}, on: {player: t.player}}), n('transition', {on: {'before-enter': t.beforeEnter, enter: t.enter, 'after-enter': t.afterEnter}}, [n('div', {directives: [{name: 'show', rawName: 'v-show', value: t.musicIcon, expression: 'musicIcon'}], staticClass: 'musicIcon'}, [n('i', {staticClass: 'iconfont icon-yinle'})])])], 1)])}, s = [], i = (n('4160'), n('b0c0'), n('dca8'), n('2b19'), n('159b'), n('96cf'), n('1da1')), a = n('5530'), c = n('2f62'), o = n('324a'), u = n('7f5c'), l = n('2b4c');function d(t){return Object(l['a'])({url: '/top/list?idx='.concat(t), method: 'get'})}var f, p, m, g, h = function(){var t = this, e = t.$createElement, n = t._self._c || e;return n('div', {ref: 'singerPic', staticClass: 'singerPic'}, [n('img', {staticClass: 'img', attrs: {src: t.$route.query.singerPic, alt: ''}}), n('h1', {staticClass: 'ellipsis'}, [t._v(t._s(t.$route.query.name))]), n('div', {staticClass: 'mask'})])}, v = [], b = {inserted: function(t){var e, n = t.children[0], r = t.clientHeight;g = t.parentNode;var s = function(t, e, n, r){return n * ((t = t / r - 1) * t * t + 1) + e};f = function(s){var i = s.targetTouches[0].clientY;i < r || (e = i, t.classList.remove('rebound'), n.classList.remove('rebound'))}, p = function(i){if(e){var a = i.targetTouches[0].clientY, c = a - e;if(window.scrollY <= 0 && c > 0){var o = s(c, r, 100, 300);t.style.height = o + 'px';var u = s(c, 1, .2, 300);n.style.transform = 'translate(0%, 0%) scale('.concat(u, ')')}}}, m = function(){e = null, t.style.height = r + 'px', n.style.transform = 'translate(0%, 0%)', t.classList.add('rebound'), n.classList.add('rebound')}, y('addEventListener')}, unbind: function(){y('removeEventListener')}};function y(t){g[t]('touchstart', f), g[t]('touchmove', p), g[t]('touchend', m)}var w = {name: 'DetailBackGround', directives: {pull: b}}, x = w, j = (n('db17'), n('2877')), O = Object(j['a'])(x, h, v, !1, null, 'eb859f1a', null), C = O.exports, _ = function(){var t = this, e = t.$createElement, n = t._self._c || e;return n('div', {staticClass: 'songList'}, [n('ul', t._l(t.songs, (function(e, r){return n('li', {key: r, on: {click: function(e){return e.stopPropagation(), e.preventDefault(), t.$emit('player', r, e.currentTarget)}}}, [e.id === t.currrenSong.id ? [n('div', {staticClass: 'inner'}, [n('div', {staticClass: 'img fl'}, [n('img', {directives: [{name: 'lazy', rawName: 'v-lazy', value: e.picUrl, expression: 'item.picUrl'}], attrs: {alt: ''}})]), n('div', {staticClass: 'name ellipsis'}, [n('span', [t._v(t._s(e.name))]), n('span', [t._v('--')]), n('span', [t._v(t._s(e.singer))])])])] : [n('div', {staticClass: 'out'}, [n('div', {staticClass: 'desc ellipsis', class: {first: 0 === r}}, [n('p', {staticClass: 'ellipsis'}, [t._v(t._s(e.name))]), n('span', [t._v(t._s(e.singer))])]), n('div', {staticClass: 'album'}, [t._v(t._s(r + 1))])])]], 2)})), 0)])}, S = [], k = {name: 'DetailSongList', props: {songs: Array}, computed: Object(a['a'])({}, Object(c['c'])(['currrenSong', 'fullScreen', 'playList']))}, L = k, T = (n('132a'), Object(j['a'])(L, _, S, !1, null, '533d3156', null)), D = T.exports, E = {name: 'Detail', components: {DetailSongList: D, DetailBackGround: C}, data: function(){return{songs: [], playCount: 0, showText: !1, percent: 0, scrollTop: 0, musicIcon: !1, dom: null}}, computed: Object(a['a'])({}, Object(c['c'])(['playList', 'currrenSong', 'fullScreen', 'singer', 'currrentIndex'])), created: function(){var t = this.$route, e = t.query, n = t.params;this[e.componentName](n.id)}, methods: Object(a['a'])({RankDetail: function(t){var e = this;return Object(i['a'])(regeneratorRuntime.mark((function n(){var r, s, i, a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev = n.next){case 0:return n.next = 2, d(t);case 2:r = n.sent, s = r.code, i = r.playlist, i.playCount, a = i.tracks, 200 === s && e.getSongs(a);case 8:case'end':return n.stop()}}), n)})))()}, RecommendDetail: function(t){var e = this;return Object(i['a'])(regeneratorRuntime.mark((function n(){var r, s, i, a, c;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev = n.next){case 0:return n.next = 2, Object(o['a'])(t);case 2:r = n.sent, s = r.code, i = r.playlist, a = i.playCount, c = i.tracks, 200 === s && e.getSongs(c, a);case 8:case'end':return n.stop()}}), n)})))()}, SingerDetail: function(t){var e = this;return Object(i['a'])(regeneratorRuntime.mark((function n(){var r, s, i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev = n.next){case 0:return n.next = 2, Object(u['a'])(t);case 2:r = n.sent, s = r.code, i = r.hotSongs, 200 === s && e.getSongs(i);case 6:case'end':return n.stop()}}), n)})))()}, getSongs: function(t){var e = this, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, r = [];t.forEach((function(t){var s = {id: t.id, name: t.name, singer: t.ar[0].name, picUrl: t.al.picUrl};e.playCount = n, r.push(s)})), this.songs = Object.freeze(r)}, beforeEnter: function(t){var e = this.dom.getBoundingClientRect(), n = -(window.innerHeight - e.y - e.height / 2 - 50), r = -150;t.style.transform = 'translate3d('.concat(r, 'px, ').concat(n, 'px,0)')}, enter: function(t, e){t.offsetWidth, t.style.transform = 'translate3d(0, 0,0)', t.style.transition = 'all .6s cubic-bezier(0.49, -0.29, 0.75, 0.41)', e()}, afterEnter: function(){this.musicIcon = !1}, scroll: function(t){this.percent = Math.min(t.target.scrollTop / 400, 1), this.scrollTop = t.target.scrollTop, t.target.scrollTop > 400 ? this.showText = !0 : this.showText = !1}, player: function(t, e){this.musicIcon = !0, this.dom = e, Object.is(this.songs, this.playList) || (this.setPlay(this.songs), this.setSequenceList(this.songs)), this.setCurrrentIndex(t)}}, Object(c['d'])(['setCurrrentIndex', 'setPlay', 'setFullScreen', 'setSequenceList']))}, I = E, R = (n('bc91'), Object(j['a'])(I, r, s, !1, null, '5af72c32', null));e['default'] = R.exports}, db17: function(t, e, n){'use strict';var r = n('1d13'), s = n.n(r);s.a}}]);
//# sourceMappingURL=detail.d880fb64.js.map