import service from '../request/service'
import type { StrKeys } from '@/types'

export function fetchSearchHots() {
  return service({
    url: '/search/hot/detail',
    method: 'get'
  })
}

export function fetchSearchSuggest(params: StrKeys<string>) {
  return service({
    url: '/search/suggest',
    method: 'get',
    params
  })
}

export function fetchCloudsearch(params: StrKeys<string>) {
  return service({
    url: '/search/cloudsearch',
    method: 'get',
    params
  })
}

export function fetchSearchDefault() {
  return service({
    url: '/search/default',
    method: 'get',
  })
}
