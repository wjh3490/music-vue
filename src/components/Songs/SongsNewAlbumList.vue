<template>
  <ul class="songs-album">
    <router-link :to="`/album/${album.id}`" v-for="album in newAlbums" :key="album.id" class="songs-album-item">
      <figure class="songs-album-figure">
        <img v-lazy="album.picUrl" alt="" class="songs-album-img" />
      </figure>
      <div class="songs-album-info">
        <p class="songs-album-name elrouter-linkpsis">{{ album.name }}</p>
        <p class="songs-album-artist ellipsis">
          {{ getArtist(album.artists).join('/') }}
        </p>
      </div>
    </router-link>
  </ul>
</template>
<script>
import { getAlbumNew } from '@/api/album';
export default {
  name: 'SongsNewAlbumList',
  data() {
    return {
      newAlbums: [],
    };
  },
  methods: {
    async getSingers(type) {
      const { code, albums } = await getAlbumNew(type);
      if (code === 200) this.newAlbums = albums;
    },
    getArtist(artist) {
      return artist.reduce((acc, cur) => {
        acc.push(cur.name);
        return acc;
      }, []);
    },
  },
};
</script>
<style lang="less" scoped>
.songs-album {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 15px;
  margin-top: 15px;
  &-item {
    margin-bottom: 15px;
  }
  &-img {
    width: 162px;
    height: 162px;
    border-radius: 8px;
  }
  &-info {
    margin-top: 5px;
  }
  &-name {
    width: 150px;
    font-size: 14px;
  }
  &-artist {
    width: 150px;
    font-size: 13px;
    color: #999;
    margin-top: 3px;
  }
}
</style>
