<template functional>
  <div :class="props.vertical ? 'hot' : 'history'" v-show="props.visible">
    <p class="search-name">{{ props.hotTitle }}</p>
    <div class="del" v-if="!props.vertical">
      <span class="all search-icon" @click="listeners.del()">删除全部</span>
      <span class="iconfont icon-shanchu search-icon"></span>
    </div>
    <ul class="search-list">
      <li
        v-for="(item, index) in props.list"
        :key="index"
        @click="listeners.handleSearch(item)"
        class="search-item"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SearchList',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    visible: {
      type: Boolean,
      default: false,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    hotTitle: {
      type: String,
      default: '',
    },
  },
};
</script>
<style scoped lang="less">
@base: 37.5rem;
.commonCss() {
  .search-name {
    margin: 15 / @base 0 10 / @base 10 / @base;
    color: #000;
    font-weight: 700;
  }
}
.history {
  padding: 0 30 / @base;
  font-size: 14px;
  position: relative;
  .del {
    position: absolute;
    right: 10 / @base;
    top: 0px;
    color: #2e3030;

    .search-icon {
      vertical-align: middle;
      font-size: 20px;
    }
    .all {
      font-weight: 700;
      font-size: 14px;
    }
  }
  .search-list {
    margin-left: 15 / @base;
    .search-item {
      font-size: 14px;
      color: #2e3030;
      padding: 5 / @base 0;
    }
  }
  .commonCss();
}

.hot {
  padding: 0 30 / @base;
  font-size: 14px;
  .commonCss();
  .search-list {
    display: flex;
    flex-wrap: wrap;
    // font-size: 14px;
    .search-item {
      padding: 4 / @base 10 / @base;
      background: #f2f3f4;
      margin: 4 / @base;
      border-radius: 30 / @base;
      font-size: 12px;
      color: #2e3030;
    }
  }
}

//  <div class="history" v-show="!searchData">
//         <p>历史记录</p>
//         <div class="del" @click="del">
//           <span class="all">删除全部</span>
//           <span class="iconfont icon-shanchu"></span>
//         </div>
//         <ul class="history-list">
//           <li
//             v-for="(item, index) in historyList"
//             :key="index"
//             @click="searchHot(item)"
//             class="history-item"
//           >
//             {{ item }}
//           </li>
//         </ul>
//       </div>
</style>
