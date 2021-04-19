import service from '../request/service';

export function getAlbum(id) {
  return service({
    url: `/album?id=${id}`,
    method: 'get',
  });
}
export function getAlbumNewset() {
  return service({
    url: '/album/newest',
    method: 'get',
  });
}
export function getAlbumList(params) {
  return service({
    url: '/album/list',
    method: 'get',
    params,
  });
}
export function getAlbumNew(area) {
  return service({
    url: `/album/new?area=${area}&limit=10`,
    method: 'get',
  });
}
export function getAlbumSongsaleboard(params) {
  return service({
    url: 'album/songsaleboard',
    params,
    method: 'get',
  });
}
export function getAlbumListStyle(params) {
  return service({
    url: `/album/list/style`,
    method: 'get',
    params,
  });
}
