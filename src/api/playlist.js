import service from '../request/service';

export function fetchPlaylist() {
  return service({
    url: `/playlist/hot`,
    method: 'get',
  });
}

export function fetchPlaylistDetail(id) {
  return service({
    url: `playlist/detail?id=${id}`,
    method: 'get',
  });
}
export function getRecommendPlaylist(page_no = 1) {
  return service({
    url: `/personalized?limit=${10 * page_no}`,
    method: 'get',
  });
}
