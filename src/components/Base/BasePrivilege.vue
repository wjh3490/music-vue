<template functional>
  <div class="song-privilege">
    <!-- sq -->
    <span v-if="props.privilege.maxbr === 999000" class="iconsq icon sq"
      >SQ</span
    >
    <!-- 独家 -->
    <span v-if="/64|68|1088|1092/.test(props.privilege.flag)" class="icon only"
      >独家</span
    >
    <!-- vip -->
    <span v-if="props.privilege.fee === 1" class="icon vip">vip</span>
    <!-- 试听 -->
    <span
      v-if="/1152|1028|1088|1092/.test(props.privilege.flag)"
      class="icon listen"
      >试听</span
    >
  </div>
</template>

<script>
export default {
  name: 'BasePrivilege',
  props: {
    privilege: Object,
  },
};
</script>
<style lang="less" scoped>
.song-privilege {
  display: flex;
}
.icon {
  border: 1px solid #169af3;
  border-radius: 3px;
  color: #169af3;
  transform: scale(0.7);
  width: 28px;
  height: 17px;
  line-height: 15px;
  text-align: center;
  margin-left: -3px;
}
.iconsq {
  border: 1px solid #f3cd16;
  color: #f3cd16;
}
</style>
