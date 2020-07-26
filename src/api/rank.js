import service from '../request/service';

export function rankSongs (id) {
  return service({
    url: `/top/list?idx=${id}`,
    method: 'get'
  });
}
