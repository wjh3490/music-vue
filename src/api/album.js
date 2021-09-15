import service from '../request/service';

export function getAlbum(id) {
  return service({
    url: `/album?id=${id}`,
    method: 'get',
  });
}
export function fetchNewAlbumset() {
  return service({
    url: '/album/newest',
    method: 'get',
  });
}
export function fetchAlbumList(params) {
  return service({
    url: '/album/list',
    method: 'get',
    params,
  });
}
export function fetchNewAlbum(area) {
  return service({
    url: `/album/new?area=${area}&limit=10`,
    method: 'get',
  });
}
export function fetchAlbumSongsaleboard(params) {
  return service({
    url: 'album/songsaleboard',
    params,
    method: 'get',
  });
}
export function fetchAlbumListStyle(params) {
  return service({
    url: `/album/list/style`,
    method: 'get',
    params,
  });
}

export function fetchTopAlbum(params) {
  return service({
    url: '/top/album',
    method: 'get',
    params,
  });
}
