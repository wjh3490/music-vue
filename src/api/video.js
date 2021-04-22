import service from '../request/service';

export function getVideos() {
  return service({
    url: '/personalized/privatecontent/list?limit=6&offset=1',
    method: 'get',
  });
}
export function getMVs() {
  return service({
    url: '/top/mv?limit=6',
    method: 'get',
  });
} 
export function getDjs() {
  return service({
    url: 'dj/hot?limit=6&offset=1',
    method: 'get',
  });
}

export function getDjToplist() {
    return service({
      url: 'dj/toplist?type=new&limit=6',
      method: 'get',
    });
  }
