import service from '../request/service'

export function vGetSong (id) {
  return service({
    url: '/song/url',
    method: 'get',
    params: {id}
  })
}

export function vGetLyric (id) {
  return service({
    url: `/lyric?id=${id}`,
    method: 'get'
  })
}

