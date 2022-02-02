import type { Song } from '@/types'

export function filterNum(val: number) {
    let res: number | string = ''
    if (val >= 10000 && val < 100000000) {
        res = `${((val) / 10000).toFixed(1)}万` as string | number;
    }
    if (val >= 100000000) {
        res = `${(val / 100000000).toFixed(1)}亿`;
    }
    return res;
}

export function formatTime(interval: number): string {
    interval = ~~interval;
    let minute = ~~(interval / 60);
    let second = String(interval % 60).padStart(2, '0');
    return minute + ':' + second;
}

export function parseTime(time: number, cFormat: string) {
    if (arguments.length === 0 || !time) {
        return null;
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
    let date: Date;
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

export function arrayToString(arr: Array<any> = [], separate: string = '/', val: string = 'name'): string {
    return arr.map((item) => item[val]).join(separate);
}

export function splitString(arr: Array<any> = [], separate: string = '/'): string {
    return arr.join(separate);
}

export function formatIndex(index: number): string {
    return (index + '').padStart(2, '0');
}

export function formatRank(rank: number) {
    if (rank > 0) return ['icon-jiantou', 'rankRose'];
    if (rank < 0) return ['icon-jiantou', 'rankLose'];
    if (rank == 0) return ['icon-line', 'rankEqual'];
}
/**
 * @param {Array} list
 * @param {Object} currentSong
 * @return {Array}
 */

export function filterList(list: Array<any>, currentSong: Song): Array<Song> {
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
export function shuffle<T extends Array<any>>(arr: T) {
    let _arr = arr.slice();
    for (let i = 0; i < arr.length; i++) {
        let j = getRandomInt(0, i);
        let t = _arr[i];
        _arr[i] = _arr[j];
        _arr[j] = t;
    }
    return _arr
}

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
/**
 * @param {Lrc} lrc
 * @return {Object}
 */
export function parseLyric(lrc: string) {
    if (!lrc) return [];
    let lyrics = lrc.split('\n').filter(Boolean);
    let lrcObj: Array<{ time: number, lyric: string }> = [];

    for (let i = 0; i < lyrics.length; i++) {
        let lyric = decodeURIComponent(lyrics[i]);
        let timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
        let timeRegExpArr = lyric.match(timeReg);
        if (!timeRegExpArr) continue;
        let clause: string = lyric.replace(timeReg, '') as string;
        let t = timeRegExpArr[0];
        let min: number = Number(String(t.match(/\[\d*/i)).slice(1));
        let sec: number = Number(String(t.match(/\:\d*/i)).slice(1));
        let time: number = min * 60 + sec;
        lrcObj.push({
            time,
            lyric: clause
        })
    }
    return !!lrcObj.length ? lrcObj : lyrics;
}

export function scrollToEase(
    el: Element,
    start: number,
    to: number,
    scrollTop: string = 'scrollTop',
    duration: number = 300
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

export function scrollToInstant(el: Element, to: number) {
    el.scrollTo({
        top: to,
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

export function splitList<T extends Array<any>>(list: T, length: number) {
    let index: number = 0;
    let newArray: Array<any> = [];
    while (index < list.length) {
        newArray.push(list.slice(index, (index += length)));
    }
    return newArray;
}

export function optionsToMaps(options: Array<any>) {
    return options.reduce((acc, cur, index) => {
        acc[index] = cur.id
        return acc
    }, {});
}