import service from '../request/service';

export function vGetSinger(type) {
  return service({
    url: `/toplist/artist?type=${type}`,
    method: 'get',
  });
}

export function singerSongs(id) {
  return service({
    url: `artists?id=${id}`,
    method: 'get',
  });
}

export function queryArtistDetail(id) {
  return service({
    url: `/artist/detail?id=${id}`,
    method: 'get',
  });
} 

export function queryArtistDesc(id) {
  return service({
    url: `/artist/desc?id=${id}`,
    method: 'get',
  });
}
export function queryArtist(id) {
  return service({
    url: `/artists?id=${id}`,
    method: 'get',
  });
}
export function queryArtistTop(id) {
  return service({
    url: `/artist/songs?id=${id}`,
    method: 'get',
  });
}
export function queryArtistAlbum(id) {
  return service({
    url: `/artist/album?id=${id}`,
    method: 'get',
  });
}
