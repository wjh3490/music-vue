export function filterNum(val) {
  let num;
  if (val >= 10000) {
    num = `${(val / 10000).toFixed(1)}万`;
  }
  if (val >= 100000000) {
    num = `${(val / 100000000).toFixed(1)}亿`;
  }
  return num;
}

export function format(interval) {
  interval = interval | 0;
  let minute = (interval / 60) | 0;
  let second = (interval % 60).toString().padStart(2, '0');
  // minute = minute < 10 ? "0" + minute : minute;
  // second = second < 10 ? '0' + second : second
  // second = second.padStart(2, '0')
  return minute + ':' + second;
}
