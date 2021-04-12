<template>
  <div class="singer-about">
    <section class="singer-about-info" v-if="info.briefDesc">
      <h2>歌手资料</h2>
      <div class="singer-about-briefDesc">{{ info.briefDesc }}</div>
    </section>
    <section class="singer-about-represent" v-if="info.topicData.length">
      <h2>代表作品</h2>
      <div
        class="singer-about-represent-item"
        v-for="item in info.topicData"
        :key="item.id"
      >
        <img
          v-lazy="item.coverUrl"
          alt=""
          class="singer-about-represent-left"
        />
        <div class="singer-about-represent-right">
          <p class="singer-about-represent-mainTitle">{{ item.mainTitle }}</p>
          <p class="singer-about-represent-tag">
            标签: {{ item.tags.join(',') }}
          </p>
          <span class="singer-about-represent-read"
            >{{ item.categoryName }}, 阅读 {{ item.readCount }}</span
          >
        </div>
      </div>
    </section>
    <section
      class="singer-about-samilar"
      @touchmove.stop
      @touchstart.stop
      @scroll.stop
      v-if="simiArtists.length"
    >
      <h2>相似歌手</h2>
      <div class="singer-about-samilar-main">
        <div class="singer-about-samilar-scroller">
          <ul class="singer-about-samilar-wrap">
            <li
              v-for="item in simiArtists"
              :key="item.id"
              class="singer-about-samilar-item"
            >
              <img
                v-lazy="item.img1v1Url"
                alt=""
                class="singer-about-samilar-figure"
              />
              <span class="singer-about-samilar-name">{{ item.name }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { queryArtistDesc, queryArtistSimi } from '@/api/singer';
export default {
  name: 'SingerAbout',
  data() {
    return {
      info: { topicData: [], briefDesc: '' },
      simiArtists: [],
    };
  },
  async created() {},
  methods: {
    getDetail() {
      const { id } = this.$route.params;
      this.getSingerInfo(id);
      this.getSimiSinger(id);
    },
    async getSingerInfo(id) {
      const { code, topicData, briefDesc } = await queryArtistDesc(id);
      if (code == 200) {
        this.info = {
          topicData,
          briefDesc,
        };
      }
    },
    async getSimiSinger(id) {
      const { artists, code } = await queryArtistSimi(id);
      if (code == 200) this.simiArtists = artists;
    },
  },
};
</script>
<style lang="less" scoped>
.singer-about {
  padding: 0 10px;
  margin-top: 20px;
  padding-bottom: 70px;
  &-briefDesc {
    color: #a59797f5;
    margin-top: 10px;
    font-size: 14px;
  }
  &-samilar {
    margin-top: 20px;
    &-main {
      height: 136px;
      overflow: hidden;
    }
    &-scroller {
      height: 146px;
      overflow-x: scroll;
    }
    &-wrap {
      margin-top: 10px;
      white-space: nowrap;
      display: flex;
    }
    &-item {
      margin: 0 15px;
      text-align: center;
    }
    &-name {
      display: inline-block;
      margin-top: 6px;
      font-size: 14px;
    }
    &-figure {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
  }
  &-represent {
    margin-top: 20px;
    &-item {
      display: flex;
      align-items: center;
      margin-top: 10px;
    }
    &-left {
      width: 100px;
      height: 100px;
      border-radius: 10px;
    }
    &-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 12px;
    }
    &-mainTitle {
      font-size: 16px;
    }
    &-read {
      color: #a59797f5;
      font-size: 13px;
      margin-top: 5px;
    }
    &-tag {
      color: #a59797f5;
      margin-top: 5px;
      font-size: 13px;
    }
  }
}
</style>
