/**
 * @param {Array} list
 * @param {Object} currrenSong
 * @return {Array}
 */

/*eslint-disable */
export function filterList (list, currrenSong) {
  let data = list.slice()
  if (data.length === 0) {
    data.push(currrenSong);
  } else {
    let flag = data.find(ele => ele.id === currrenSong.id);
    if (!flag) {
      data.unshift(currrenSong);
    }
  }
  return data;
}

/**
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

export function scrollToEase(el, start, to, duration = 300) {
  const change = to - start;

  const increment = 20;
  let currentTime = 0;

  var animate = function() {
    currentTime += increment;
    var val = easeOutQuart(currentTime, start, change, duration);
    el.scrollTop = val;
    if (currentTime < duration) {
      requestAnimFrame(animate);
    }
  };
  animate();
}

export function scrollToSmooth(el, to, flag = false) {
  el.scrollTo({
    top: to,
    behavior: flag ? 'smooth' : 'instant'
  });
}

export function randomColor() {
  let r = parseInt(Math.random() * 100) + 100;
  let g = parseInt(Math.random() * 100) + 100;
  let b = parseInt(Math.random() * 100) + 100;
  return `rgb(${r}, ${g}, ${b})`;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
var requestAnimFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

function easeOutQuart(t, b, c, d) {
  return -c * ((t = t / d - 1) * t * t * t - 1) + b;
}
