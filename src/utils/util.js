export function filterNum(val) {
    if (val >= 10000 && val < 100000000) {
        val = `${(val / 10000).toFixed(1)}万`;
    }
    if (val >= 100000000) {
        val = `${(val / 100000000).toFixed(1)}亿`;
    }
    return val;
}

export function formatTime(interval) {
    interval = ~~interval;
    let minute = ~~(interval / 60);
    let second = String(interval % 60).padStart(2, '0');
    return minute + ':' + second;
}

export function parseTime(time, cFormat) {
    if (arguments.length === 0 || !time) {
        return null;
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
    let date;
    if (typeof time === 'object') {
        date = time;
    } else {
        if (typeof time === 'string') {
            if (/^[0-9]+$/.test(time)) {
                time = parseInt(time);
            } else {
                time = time.replace(new RegExp(/-/gm), '/');
            }
        }

        if (typeof time === 'number' && time.toString().length === 10) {
            time = time * 1000;
        }
        date = new Date(time);
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay(),
    };
    const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
        const value = formatObj[key];
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value];
        }
        return value.toString().padStart(2, '0');
    });
    return time_str;
}

export function arrayToString(arr = [], separate = '/', val = 'name') {
    return arr.map((item) => item[val]).join(separate);
}

export function splitString(arr = [], separate = '/') {
    return arr.join(separate);
}

export function formatIndex(index) {
    return (index + '').padStart(2, '0');
}

export function formatRank(rank) {
    if (rank > 0) return ['icon-jiantou', 'rankRose'];
    if (rank < 0) return ['icon-jiantou', 'rankLose'];
    if (rank == 0) return ['icon-line', 'rankEqual'];
}
/**
 * @param {Array} list
 * @param {Object} currentSong
 * @return {Array}
 */

export function filterList(list, currentSong) {
    let data = list.slice();
    if (data.length === 0) {
        data.push(currentSong);
    } else {
        let flag = data.find((ele) => ele.id === currentSong.id);
        if (!flag) {
            data.unshift(currentSong);
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

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
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
        let timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
        let timeRegExpArr = lyric.match(timeReg);
        if (!timeRegExpArr) continue;
        let clause = lyric.replace(timeReg, '');
        let t = timeRegExpArr[0];
        let min = Number(String(t.match(/\[\d*/i)).slice(1));
        let sec = Number(String(t.match(/\:\d*/i)).slice(1));
        let time = min * 60 + sec;
        lrcObj[time] = clause;
    }

    return lrcObj;
}
export function formatLyrics(currentLyric, currentTLyric) {
    const lyrics = Object.keys(currentLyric).reduce((acc, cur) => {
        if (currentLyric[cur]) {
            const lyricItem = {
                time: cur,
                lyric: currentLyric[cur],
                tlyric: currentTLyric[cur],
            }
            acc.push(lyricItem)
        }
        return acc
    }, [])
    return lyrics;
}
export function scrollToEase(
    el,
    start,
    to,
    scrollTop = 'scrollTop',
    duration = 300
) {
    const change = to - start;

    const increment = 20;
    let currentTime = 0;

    var animate = function () {
        currentTime += increment;
        var val = easeOutQuart(currentTime, start, change, duration);
        el[scrollTop] = val;
        if (currentTime < duration) {
            requestAnimFrame(animate);
        }
    };
    animate();
}

export function scrollToSmooth(el, to, flag = false) {
    el.scrollTo({
        top: to,
        behavior: flag ? 'smooth' : 'instant',
    });
}

var requestAnimFrame = (function () {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        }
    );
})();

function easeOutQuart(t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
}

export function splitList(list, length) {
    let index = 0;
    let newArray = [];
    while (index < list.length) {
        newArray.push(list.slice(index, (index += length)));
    }
    return newArray;
}

export function optionsToMaps(options) {
    return options.reduce((acc, cur, index) => {
        acc[index] = cur.id
        return acc
    }, {});
}