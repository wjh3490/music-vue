import service from '../request/service';
import { StrKeys } from '@/types'

export function fetchSong(params: StrKeys<string>) {
  return service({
    url: '/song/url',
    method: 'get',
    params,
  });
}

export function fetchLyric(params: StrKeys<string>) {
  return service({
    url: '/lyric',
    method: 'get',
    params
  });
}

export function fetchTopSong(params: StrKeys<string>) {
  return service({
    url: '/top/song',
    method: 'get',
    params,
  });
}