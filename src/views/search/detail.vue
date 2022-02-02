<template>
    <div class="search-detail-container">
        <g-head-nav :show="false" :isFixed="true">
            <div class="search-detail-container-wrap">
                <i class="iconfont icon-sousuo search-detail-container-look"></i>
                <input
                    type="text"
                    v-model="keyword"
                    class="search-detail-container-input"
                    @focus="handleFocus"
                />
                <i
                    v-show="keyword"
                    class="iconfont icon-guanbi2fill search-detail-container-close"
                    @click="handleClear"
                ></i>
            </div>
            <template #right>{{ null }}</template>
        </g-head-nav>
        <g-tabs-nav
            :navList="SearchOptions"
            :active="active"
            :isFixed="true"
            :style="{ top: '5rem' }"
            ref="tabRef"
            @tabs="handleSlide"
            @change="handleChange"
        />
        <g-swiper-items
            v-slot="{ index }"
            :list="SearchOptions"
            :options="basicSwiperOptions"
            @slideChange="onSlideChange"
            @swiper="onSwiper"
        >
            <div class="search-detail-container-component">
                <component :is="arr[index]" :ref="getRefs" @change="handleSlide" />
            </div>
        </g-swiper-items>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import useSwiper from '@/composables/useSwiper'
import { SearchOptions, basicSwiperOptions } from '@/utils'
import SearchMultiple from '@/components/Search/SearchMultiple.vue'
import SearchSongs from '@/components/Search/SearchSongs.vue'
import SearchAblums from '@/components/Search/SearchAlbums.vue'
import SearchSingers from '@/components/Search/SearchSingers.vue'
import SearchPlaylist from '@/components/Search/SearchPlaylist.vue'

interface Detail {
    getDetail: (type: number) => void,
    flag: boolean
}
interface Tab {
    init: (time?: number) => void
}
export default defineComponent({
    name: 'SearchDetail',
    components: {
        SearchMultiple,
        SearchSongs,
        SearchAblums,
        SearchSingers,
        SearchPlaylist,
    },
    setup() {
        const route = useRoute()
        const router = useRouter()
        const _keyword = (route?.query?.keyword as string) ?? ''
        const keyword = ref<string>(_keyword)
        const tabRef = ref<Tab | null>(null)
        const searchs = ref<Detail[]>([]);
        const {
            active,
            onSwiper,
            handleSlide,
            onSlideChange } = useSwiper();

        const handleChange = (index: number): void => {
            const id = SearchOptions[index].id;
            searchs.value[index].flag && searchs.value[index].getDetail(id);
        }
        const handleFocus = () => {
            router.push({ name: 'Search', query: { keyword: _keyword } })
        }
        const handleClear = () => {
            router.push({ name: 'Search', query: { keyword: '' } })
        }
        const getRefs = (el: Detail) => {
            searchs.value.push(el)
        }
        onMounted(async () => {
            searchs.value[0].getDetail(1);
            (tabRef.value as Tab).init(0);
        })

        const arr = [
            'SearchMultiple',
            'SearchSongs',
            'SearchAblums',
            'SearchSingers',
            'SearchPlaylist',
        ]
        return {
            arr,
            tabRef,
            active,
            keyword,
            SearchOptions,
            basicSwiperOptions,
            getRefs,
            onSwiper,
            handleClear,
            handleSlide,
            handleFocus,
            handleChange,
            onSlideChange,
        }
    }
})
</script>
<style lang="less" scoped>
.search-detail-container {
    position: relative;
    background: #fbfbfb;
    z-index: 9;
    padding-top: 9.5rem;
    &-component {
        height: calc(100vh - 9.5rem);
        overflow-y: auto;
    }
    &-wrap {
        position: relative;
        width: 96%;
        height: 3.5rem;
        padding: 0 3rem;
        box-sizing: border-box;
        background: #ebecec;
        border-radius: 3rem;
    }
    &-input {
        width: 100%;
        height: 3.5rem;
        line-height: 1.8rem;
        background: rgba(0, 0, 0, 0);
        font-size: 14px;
        color: #333;
    }
    &-look,
    &-close {
        position: absolute;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        margin: 0 0.8rem;
        vertical-align: middle;
    }
    &-look {
        left: 0;
    }
    &-close {
        right: 0;
        color: #bbbdc0;
    }
}
</style>
