import service from '../request/service'

export function vGetSong (id) {
  return service({
    url: `/song/url?id=${id}`,
    method: 'get'
  })
}

export function vGetLyric (id) {
  return service({
    url: `/lyric/?id=${id}`,
    method: 'get'
  })
}
