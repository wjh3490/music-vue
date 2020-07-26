import service from '../request/service'

export function vGetSinger () {
  return service({
    url: '/top/artists?limit=100',
    method: 'get'
  })
}

export function singerSongs (id) {
  return service({
    url: `artists?id=${id}`,
    method: 'get'
  })
}
