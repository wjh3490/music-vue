<template>
    <section
        v-for="item in (isProp ? artists : artistList)"
        :key="item.id"
        class="search_artist-item"
    >
        <figure class="search_artist-figure">
            <img v-lazy="item.img1v1Url" class="search_artist-coverImgUrl" />
            <img
                v-if="item.identityIconUrl"
                :src="item.identityIconUrl"
                class="search_artist-identityIconUrl"
            />
        </figure>
        <div class="search_artist-right ellipsis">{{ item.name }}</div>
    </section>
</template>
<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import { useRoute } from 'vue-router';
import { fetchCloudsearch } from '@/api/search';

export interface Artist {
    img1v1Url: string,
    name: string,
    identityIconUrl: string,
    id: number,
}

export default defineComponent({
    name: 'SearchSingers',
    props: {
        isProp: {
            type: Boolean,
            default: false
        },
        artists: {
            type: Array as PropType<Artist[]>,
            default: () => []
        }
    },
    setup(_, { expose }) {
        const flag = ref(true);
        const route = useRoute();
        const artistList = ref<Array<Artist>>([]);
        const getDetail = async () => {
            const { result: { artists } } = await fetchCloudsearch({
                type: 100,
                keywords: route?.query?.keyword as string
            });
            artistList.value = artists;
            flag.value = false;
        };

        expose({ getDetail, flag });

        return { artistList };
    },
});
</script>
<style lang="less" scoped>
.search_artist {
    &-item {
        display: flex;
        align-items: center;
        margin-bottom: 1.5rem;
        padding: 0 1.5rem;
        color: #333;
    }
    &-coverImgUrl {
        width: 5rem;
        height: 5rem;
        border-radius: 50%;
        margin-right: 1rem;
    }
    &-figure {
        position: relative;
    }
    &-identityIconUrl {
        position: absolute;
        width: 1.5rem;
        height: 1.5rem;
        bottom: 0;
        right: 1rem;
    }
    &-name {
        font-size: 14px;
    }
}
</style>
