import { optionsToMaps } from './util'

export const playMode = {
    sequence: 0,
    loop: 1,
    random: 2,
};

export const homeNavOptions = [
    { icon: 'icon-portrait', name: '歌手', to: '/singer' },
    { icon: 'icon-paiming', name: '排行榜', to: '/rank' },
    { icon: 'icon-fenlei', name: '歌单', to: '/playlist' },
    { icon: 'icon-Live-1', name: '电台', to: '' },
    { icon: 'icon-zhibojiankan', name: '直播', to: '' },
]

export const mallNavOptions = [
    { icon: 'icon-icon', name: '畅销榜', to: '/mall-shop' },
    { icon: 'icon-category1', name: '语种风格馆', to: '/mall-category' },
    { icon: 'icon-yigoumai', name: '已购', to: '' },
]

export const colorsMaps = {
    blue: '#169af3',
    red: '#ff3a3a',
};

export const tabLinkMaps = {
    'song': { name: "Songs", params: { id: 1 } },
    'album': { name: "Songs", params: { id: 2 } },
    'digitalbum': { name: "Mall" },
};

export const radioOptions = [
    { tabIndex: 1, name: "广播电台" },
    { tabIndex: 2, name: "24小时播客" },
];

export const countryOptions = [
    { id: 1, name: "华语" },
    { id: 2, name: "欧美" },
    { id: 3, name: "韩国" },
    { id: 4, name: "日本" },
];

export const singerOptions = [
    { id: 1, name: '歌曲', icon: 'musicSize', component: 'SingerHotSong' },
    { id: 2, name: '专辑', icon: 'albumSize', component: 'SingerAlbum' },
    { id: 3, name: '视频', icon: 'mvSize', component: 'SingerMV' },
    { id: 4, name: '关于TA', icon: '', component: 'SingerAbout' },
];

export const playerOptions = [
    { component: "PlayerInfo" },
    { component: "PlayerMain" },
    { component: "PlayerLyric" },
]

export const modeOptions = [
    { icon: 'icon-iconsMusicyemianbofangmoshiRepeat', name: '顺序播放' },
    { icon: 'icon-danquxunhuan1', name: '单曲循环', },
    { icon: 'icon-iconsMusicyemianbofangmoshiShuffle', name: '随机播放' },
]

export const mallOptions = [
    { time: 'daily', rank: '日榜' },
    { time: 'week', rank: '周榜' },
    { time: 'total', rank: '总榜' },
]

export const nameMaps = {
    0: '华语新生力量',
    1: '欧美品质大碟',
    2: '韩国风向牌',
    3: '日本专辑推荐',
}

export const malltabOptions = [
    { id: 'daily', name: '日榜' },
    { id: 'week', name: '周榜' },
    { id: 'year', name: '2021年榜' },
    { id: 'total', name: '总榜' },
]

export const mallNavMaps = optionsToMaps(malltabOptions);

export const categoryOptions = [
    { id: 'Z_H', name: '华语' },
    { id: 'E_A', name: '欧美' },
    { id: 'KR', name: '韩国' },
    { id: 'JP', name: '日本' },
]

export const categoryNavMaps = optionsToMaps(categoryOptions);

export const topSongOptions = [
    { id: 7, name: '华语', en: 'Mandarin', },
    { id: 96, name: '欧美', en: 'Western' },
    { id: 16, name: '韩国', en: 'Korean' },
    { id: 8, name: '日本', en: 'Japanese' },
]

export const topSongMaps = optionsToMaps(topSongOptions);

