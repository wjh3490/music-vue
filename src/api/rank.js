import service from '../request/service';

export function rankSongs(id) {
  return service({
    url: `playlist/detail?id=${id}`,
    method: 'get',
  });
}

export function fetchRankList() {
  return service({
    url: `/toplist/detail`,
    method: 'get',
  });
}
