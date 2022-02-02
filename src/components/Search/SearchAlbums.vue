<template>
    <div class="search_albums-wrap">
        <album-item
            v-for="item in (isProp ? albums : albumList)"
            :key="item.id"
            :data="item"
            :icon="false"
        />
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { useRoute } from 'vue-router'
import { fetchCloudsearch } from '@/api/search';
import AlbumItem from '@/components/common/AlbumItem.vue'
import type { Album } from '@/components/common/AlbumItem.vue'

export default defineComponent({
    name: 'SearchAblum',
    props: {
        isProp: {
            type: Boolean,
            default: false
        },
        albums: {
            type: Array as PropType<Album[]>,
            default: () => []
        }
    },
    components: { AlbumItem },
    setup(_, { expose }) {
        const flag = ref(true);
        const route = useRoute();
        const albumList = ref<Array<Album>>([]);
        const getDetail = async () => {
            const { result: { albums } } = await fetchCloudsearch({
                type: 10,
                keywords: route?.query?.keyword as string
            });
            albumList.value = albums;
            flag.value = false;
        };

        expose({ getDetail, flag });

        return { albumList };
    },
});
</script>
<style lang="less" scoped>
.search_albums-wrap {
    padding: 0 1.5rem;
}
</style>
