import service from '../request/service';
export function fetchSong(id) {
  return service({
    url: '/song/url',
    method: 'get',
    params: { id },
  });
}

export function fetchLyric(id) {
  return service({
    url: `/lyric?id=${id}`,
    method: 'get',
  });
}

export function fetchTopSong(params) {
  return service({
    url: '/top/song',
    method: 'get',
    params,
  });
}