import service from '../request/service';

export function vGetPersonalized() {
  return service({
    url: '/personalized',
    method: 'get'
  });
}

export function vGetNewsong() {
  return service({
    url: '/personalized/newsong',
    method: 'get'
  });
}

export function vGetBanner() {
  return service({
    url: '/banner',
    method: 'get'
  });
}

export function vGetSongs(id) {
  return service({
    url: `/playlist/detail?id=${id}`,
    method: 'get'
  });
}

export function vGetDetail(id) {
  return service({
    url: `/song/detail?ids=${id}`,
    method: 'get'
  });
}


