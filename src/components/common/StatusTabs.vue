       
       
<template >
    <div class="status-tabs-wrap">
        <span
            v-for="(item, index) in list"
            :key="item.name"
            :class="[
                index !== list.length - 1 && 'status-tabs-item'
            ]"
            :style="{ ...normalStyle, color: item.id === active ? activeColor : normalStyle?.color }"
            @click="$emit('change', item.id)"
        >{{ item.name }}</span>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, } from 'vue';
interface StatusTab {
    id: string | number,
    name: string,
    [key: string]: string | number,
}

export default defineComponent({
    name: 'StatusTabs',
    props: {
        list: {
            type: Array as PropType<StatusTab[]>,
            default: () => []
        },
        active: {
            type: String,
            default: ''
        },
        activeColor: {
            type: String,
            default: '#169af3'
        },
        normalStyle: {
            type: Object,
            default: () => { }
        }
    },
    emits: ['change'],
});
</script>
<style  scoped lang="less">
.status-tabs {
    &-wrap {
        display: flex;
        align-items: center;
        font-size: 15px;
    }
    &-item {
        &::after {
            content: "";
            display: inline-block;
            height: 1rem;
            width: 0.1rem;
            background-color: #999;
            margin: 0 0.6rem;
        }
    }
}
</style>
