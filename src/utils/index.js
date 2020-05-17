/**
 *
 * @param {Array} list
 * @param {Object} currrenSong
 * @return {Array}
 */

 /*eslint-disable */
export function filterList(list, currrenSong) {
  if (list.length === 0) {
    list.push(currrenSong);
  } else {
    let flag = list.every(ele => ele.id !== currrenSong.id);
    if (flag) {
      list.unshift(currrenSong);
    }
  }
  return list;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
/**
 *
 * @param {Array} arr
 * @return {Array}
 */
export function shuffle(arr) {
  let _arr = arr.slice();
  for (let i = 0; i < arr.length; i++) {
    let j = getRandomInt(0, i);
    let t = _arr[i];
    _arr[i] = _arr[j];
    _arr[j] = t;
  }
  return _arr;
}

/**
 *
 * @param {Lrc} lrc
 * @return {Object}
 */
export function parseLyric(lrc) {
  let lyrics = lrc.split('\n');
  let lrcObj = {};

  for (let i = 0; i < lyrics.length; i++) {
    let lyric = decodeURIComponent(lyrics[i]);
    /* eslint-disable-next-line */
    let timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
    let timeRegExpArr = lyric.match(timeReg);
    if (!timeRegExpArr) continue;
    let clause = lyric.replace(timeReg, '');
    for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
      let t = timeRegExpArr[k];
      let min = Number(String(t.match(/\[\d*/i)).slice(1));
      /* eslint-disable-next-line */
      let sec = Number(String(t.match(/\:\d*/i)).slice(1));
      let time = min * 60 + sec;
      lrcObj[time] = clause;
    }
  }

  return lrcObj;
}
