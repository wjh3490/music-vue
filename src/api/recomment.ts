import service from '../request/service';
import { StrKeys } from '@/types'

export function fetchPersonalized() {
  return service({
    url: '/personalized?limit=6',
    method: 'get',
  });
}

export function fetchNewsong(params: StrKeys<string>) {
  return service({
    url: '/personalized/newsong',
    method: 'get',
    params,
  });
}

export function fetchBanner() {
  return service({
    url: '/banner',
    method: 'get',
  });
}

// export function fetchRecommentSongs(params) {
//   return service({
//     url: `/playlist/detail?id=${id}`,
//     method: 'get',
//     params
//   });
// }

export function fetchSongDetail(params: StrKeys<string>) {
  return service({
    url: '/song/detail',
    method: 'get',
    params
  });
}
export function recommendSongs() {
  return service({
    url: '/recommend/songs',
    method: 'get',
  });
}
