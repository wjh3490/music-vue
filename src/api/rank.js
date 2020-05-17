import service from '../request/service';

export function vGetList (id) {
  return service({
    url: `/top/list?idx=${id}`,
    method: 'get'
  });
}
