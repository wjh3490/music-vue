import service from '../request/service';

export function getAlbum(id) {
  return service({
    url: `/album?id=${id}`,
    method: 'get',
  });
}
