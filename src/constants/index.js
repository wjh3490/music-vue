export const colors = {
    blue: '#169af3',
    red: '#ff3a3a',
};

export const radios = [
    { tabIndex: 1, name: "广播电台" },
    { tabIndex: 2, name: "24小时播客" },
];

export const tabLinkMaps = {
    1: '/songs/0',
    2: '/songs/1',
    3: '/mall',
};

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

export const singerOptions = [
    { component: "PlayerInfo" },
    { component: "PlayerMain" },
    { component: "PlayerLyric" },
]

export const modeOptions = [
    { icon: 'icon-iconsMusicyemianbofangmoshiRepeat', name: '顺序播放' },
    { icon: 'icon-danquxunhuan1', name: '单曲循环', },
    { icon: 'icon-iconsMusicyemianbofangmoshiShuffle', name: '随机播放' },
]

