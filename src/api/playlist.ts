import service from '../request/service';
import { StrKeys } from '@/types'

export function fetchPlaylist() {
  return service({
    url: `/playlist/hot`,
    method: 'get',
  });
}

export function fetchPlaylistDetail(params: StrKeys<string>) {
  return service({
    url: 'playlist/detail',
    method: 'get',
    params
  });
}
export function getRecommendPlaylist() {
  return service({
    url: '/personalized',
    method: 'get',
  });
}
