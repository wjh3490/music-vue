<template>
    <section>
        <router-link :to="{ name: 'Album', params: { id: data.id } }" class="album-item">
            <div class="album-left">
                <img v-lazy="data.picUrl" class="album-figure" />
            </div>
            <div class="album-right">
                <p class="album-name ellipsis">{{ data.name }}</p>
                <p class="album-publishTime">
                    <span>{{ parseTime(data.publishTime, '{y}-{m}-{d}') }}</span>
                    <span class="album-size">{{ data.size }}首</span>
                </p>
            </div>
            <span v-if="icon" class="iconfont icon-youjiantou"></span>
        </router-link>
    </section>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { parseTime } from '@/utils'

export interface Album {
    id: number,
    picUrl: string,
    name: string,
    size: number,
    publishTime: number,
}

export default defineComponent({
    name: 'AlbumItem',
    props: {
        icon: {
            type: Boolean,
            default: true
        
        },
        data: {
            type: Object as PropType<Album>,
            default: () => { }
        }
    },
    setup() {
        return { parseTime }
    }
});
</script>

<style lang="less" scoped>
.album {
    &-item {
        display: flex;
        margin-bottom: 1rem;
        align-items: center;
        justify-content: space-between;
    }
    &-left {
        width: 6rem;
        height: 6rem;
        margin-right: 1.5rem;
        border-radius: 6px;
        overflow: hidden;
    }
    &-right {
        flex: 1;
    }
    &-figure {
        width: 6rem;
        height: 6rem;
    }
    &-name {
        font-size: 16px;
    }
    &-publishTime {
        margin-top: 0.4rem;
        color: #888;
        font-size: 13px;
        display: flex;
        align-items: center;
    }
    &-size {
        margin-left: 1rem;
    }
}
</style>
