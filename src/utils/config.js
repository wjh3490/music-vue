
export const playMode = {
  sequence: 0,
  loop: 1,
  random: 2,
};

export class Song {
  constructor(options) {
    this.id = options.id || ''; //歌曲id
    this.name = options.name || ''; // 歌曲名
    this.picUrl = options.picUrl || ''; // 图片
    this.album = options.album || ''; // 歌曲专辑
    this.alia = (options.alia || []).join('/') || ''; // 歌曲别名
    this.publishTime = options.publishTime || ''; // 发布时间
    this.artists =  ''; // 歌手
    this.privilege = options.privilege || {}; // 状态
  }
}
