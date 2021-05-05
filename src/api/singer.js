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
    url: `/artist/top/song?id=${id}`,
    method: 'get',
  });
}
export function queryArtistAlbum(id) {
  return service({
    url: `/artist/album?id=${id}`,
    method: 'get',
  });
}
export function queryArtistSimi(id, limit) {
  return service({
    url: `/simi/artist?id=${id}&limit=${limit}`,
    method: 'get',
  });
}
export function querySongSimi(id, limit) {
  return service({
    url: `/simi/song?id=${id}&limit=${limit}`,
    method: 'get',
  });
} 
export function queryPlaylistSimi(id, limit) {
  return service({
    url: `/simi/playlist?id=${id}&limit=${limit}`,
    method: 'get',
  });
}
export function queryArtistMv(id) {
  return service({
    url: `artist/mv?id=${id}`,
    method: 'get',
  });
}
