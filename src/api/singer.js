import service from '../request/service';

export function fetchSinger(type) {
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

export function fetchArtistDetail(id) {
  return service({
    url: `/artist/detail?id=${id}`,
    method: 'get',
  });
}

export function fetchArtistDesc(id) {
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
export function fetchArtistTop(id) {
  return service({
    url: `/artist/top/song?id=${id}`,
    method: 'get',
  });
}
export function fetchArtistAlbum(id) {
  return service({
    url: `/artist/album?id=${id}`,
    method: 'get',
  });
}
export function fetchArtistSimi(id, limit) {
  return service({
    url: `/simi/artist?id=${id}&limit=${limit}`,
    method: 'get',
  });
}
export function fetchSongSimi(id, limit) {
  return service({
    url: `/simi/song?id=${id}&limit=${limit}`,
    method: 'get',
  });
} 
export function fetchPlaylistSimi(id, limit) {
  return service({
    url: `/simi/playlist?id=${id}&limit=${limit}`,
    method: 'get',
  });
}
export function fetchArtistMv(id) {
  return service({
    url: `artist/mv?id=${id}`,
    method: 'get',
  });
}
