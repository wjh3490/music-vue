import service from '../request/service';
import { StrKeys } from '@/types'
export function fetchAlbum(params: StrKeys<string>) {
  return service({
    url: '/album',
    method: 'get',
    params,
  });
}
export function fetchNewAlbumset() {
  return service({
    url: '/album/newest',
    method: 'get',
  });
}
export function fetchAlbumList(params: StrKeys<string>) {
  return service({
    url: '/album/list',
    method: 'get',
    params,
  });
}
// export function fetchNewAlbum(params) {
//   return service({
//     url: `/album/new?area=${area}&limit=10`,
//     method: 'get',
//     params
//   });
// }
export function fetchAlbumSongsaleboard(params: StrKeys<string>) {
  return service({
    url: 'album/songsaleboard',
    method: 'get',
    params,
  });
}
export function fetchAlbumListStyle(params: StrKeys<string>) {
  return service({
    url: `/album/list/style`,
    method: 'get',
    params,
  });
}

export function fetchTopAlbum(params: StrKeys<string>) {
  return service({
    url: '/top/album',
    method: 'get',
    params,
  });
}
