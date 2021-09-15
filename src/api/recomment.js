import service from '../request/service';

export function vGetPersonalized() {
  return service({
    url: '/personalized?limit=6',
    method: 'get',
  });
}

export function fetchNewsong(params) {
  return service({
    url: '/personalized/newsong',
    method: 'get',
    params,
  });
}

export function vGetBanner() {
  return service({
    url: '/banner',
    method: 'get',
  });
}

export function recommentSongs(id) {
  return service({
    url: `/playlist/detail?id=${id}`,
    method: 'get',
  });
}

export function vGetDetail(id) {
  return service({
    url: `/song/detail?ids=${id}`,
    method: 'get',
  });
}
export function recommendSongs() {
  return service({
    url: '/recommend/songs',
    method: 'get',
  });
}
