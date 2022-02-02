import service from '../request/service';
import { StrKeys } from '@/types'

export function rankSongs(params:StrKeys<string>) {
  return service({
    url: 'playlist/detail',
    method: 'get',
    params
  });
}

export function fetchRankList() {
  return service({
    url: `/toplist/detail`,
    method: 'get',
  });
}
