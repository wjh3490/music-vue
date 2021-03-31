import service from '../request/service'

export function vGetSinger (type) {
  return service({
    url: `/toplist/artist?type=${type}`,
    method: 'get'
  })
}

export function singerSongs (id) {
  return service({
    url: `artists?id=${id}`,
    method: 'get'
  })
}
