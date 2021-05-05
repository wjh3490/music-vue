<template>
  <div class="player" v-show="playList.length > 0">
    <NormalPlayer v-show="fullScreen" />
    <MiniPlayer v-show="!fullScreen" />
  </div>
</template>

<script>
import NormalPlayer from '@/components/Player/NormalPlayer';
import MiniPlayer from '@/components/Player/MiniPlayer';
import { mapGetters } from 'vuex';
export default {
  name: 'Player',
  components: {
    MiniPlayer,
    NormalPlayer,
  },
  computed: {
    ...mapGetters(['fullScreen', 'playList']),
  },
};
</script>
