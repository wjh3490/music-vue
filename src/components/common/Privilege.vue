<template >
  <div class="song-privilege">
    <!-- vip -->
    <span v-if="privilege.fee === 1" class="icon vip">vip</span>
    <!-- sq -->
    <span v-if="privilege.maxbr === 999000" class="iconsq icon sq">SQ</span>
    <!-- 独家 -->
    <span v-if="/64|68|1088|1092/.test(`${privilege.flag}`)" class="icon only">独家</span>
    <!-- 试听 -->
    <span v-if="/1152|1028|1088|1092/.test(`${privilege.flag}`)" class="icon listen">试听</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import type { Privilege } from '@/types';
export default defineComponent({
  name: 'Privilege',
  props: {
    privilege: {
      type: Object as PropType<Privilege>,
      default: () => { }
    },
  },
});
</script>
<style  scoped>
.song-privilege {
  display: flex;
}
.icon {
  border: 0.1rem solid #169af3;
  border-radius: 3px;
  color: #169af3;
  transform: scale(0.7);
  width: 2.8rem;
  height: 1.7rem;
  line-height: 1.5rem;
  text-align: center;
  margin-left: -0.3rem;
}
.iconsq {
  border: 0.1rem solid #f3cd16;
  color: #f3cd16;
}
</style>
