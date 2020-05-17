import service from '../request/service'

export function vSearch (data) {
  return service({
    url: `/search?keywords=${data} `,
    method: 'get'
  })
}

export function vSearchHot () {
  return service({
    url: `/search/hot `,
    method: 'get'
  })
}
