import service from '../request/service';

export function vGetPersonalized() {
  return service({
    url: '/personalized',
    method: 'get'
  });
}

export function vGetNewsong() {
  return service({
    url: '/personalized/newsong?limit=100',
    method: 'get'
  });
}

export function vGetBanner() {
  return service({
    url: '/banner',
    method: 'get'
  });
}

export function recommentSongs(id) {
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
//https://platform.xuanyu.com.cn/promotions/seckill/time-line


