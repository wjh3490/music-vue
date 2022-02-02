import service from '../request/service';
import { StrKeys } from '@/types'

export function fetchTopSinger(params: StrKeys<string>) {
  return service({
    url: '/toplist/artist',
    method: 'get',
    params
  });
}

// export function singerSongs(id) {
//   return service({
//     url: `artists?id=${id}`,
//     method: 'get',
//   });
// }

export function fetchArtistDetail(params: StrKeys<string>) {
  return service({
    url: '/artist/detail',
    method: 'get',
    params
  });
}

export function fetchArtistDesc(params: StrKeys<string>) {
  return service({
    url: '/artist/desc',
    method: 'get',
    params
  });
}

export function fetchArtistTop(params: StrKeys<string>) {
  return service({
    url: '/artist/top/song',
    method: 'get',
    params
  });
}

export function fetchArtistAlbum(params: StrKeys<string>) {
  return service({
    url: '/artist/albu',
    method: 'get',
    params
  });
}

export function fetchArtistSimi(params: StrKeys<string>) {
  return service({
    url: '/simi/artist',
    method: 'get',
    params
  });
}
export function fetchSongSimi(params: StrKeys<string>) {
  return service({
    url: '/simi/song',
    method: 'get',
    params
  });
}

export function fetchPlaylistSimi(params: StrKeys<string>) {
  return service({
    url: '/simi/playlist',
    method: 'get',
    params
  });
}

export function fetchArtistMv(params: StrKeys<string>) {
  return service({
    url: 'artist/mv',
    method: 'get',
    params
  });
}
