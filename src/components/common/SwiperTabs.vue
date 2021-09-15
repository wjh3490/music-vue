<template>
    <div class="swiper-tabs">
        <template v-for="(item, index) in list" :key="item[valueKey]">
            <span @click="handleChange(item[valueKey])">{{ item[valueKey] }}</span>
            <span v-if="index !== list.length - 1" class="mall-rank-line"></span>
        </template>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import type { StrKeys } from '@/types'

type Type = string | number;
export default defineComponent({
    name: "SwiperTabs",
    props: {
        list: {
            type: Array as PropType<StrKeys<string>[]>,
            default: () => []
        },
        valueKey: {
            type: String,
            default: ''
        },
        lineStyle: {
            type: Object as PropType<StrKeys<string>>,
            default: () => { }
        },
    },
    emits: ['change'],
    setup() {
        const handleChange = (type: Type) => {

        }

        return { handleChange }
    },
})
</script>

<style lang="less">
.swiper-tabs {
    display: flex;
    align-items: center;
    font-size: 15px;
    height: 10px;
}
</style>