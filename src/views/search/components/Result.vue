<template functional>
  <div class="result">
  
    <ul class="result-list">
      <li
        v-for="(item, index) in props.list"
        :key="index"
        @click="listeners.play(item, index)"
        class="result-item"
      >
        <slot :item="item" />
      </li>
    </ul>
      <p v-if="props.noResult" style="color: red; textAlign:center; marginTop: 0.4rem">暂无结果</p>
  </div>
</template>

<script>
export default {
  name: 'Result'
};
</script>
<style scoped lang="less">
@base: 37.5rem;
.result {
  .result-list {
    padding: 0 30 / @base;

    .result-item {
      color: #2e3030;
      font-size: 12px;
      padding-top: 5 / @base;
      height: 50 / @base;
      border-bottom: 1 / @base solid #e4e4e4;
      /deep/ .red {
        color: #169af3;
      }
      .name {
        font-size: 14px;
      }
    }
  }
}
//   <div class="result">
//         <ul class="result-list">
//           <li
//             v-for="(item, index) in searchList"
//             :key="index"
//             @click="play(item, index)"
//             class="result-item"
//           >
//             <div class="name" v-html="highlight(item.name)"></div>
//             <div class="singer" v-html="highlight(item.singer)"></div>
//           </li>
//         </ul>
//       </div>
</style>
