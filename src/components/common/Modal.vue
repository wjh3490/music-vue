<template>
    <div :style="{ zIndex }" class="modal-wrap">
        <transition :appear="appear" name="fade-in">
            <div v-show="modal" class="modal-lay" @click="$emit('close')"></div>
        </transition>
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Modal',
    emit: ['close'],
    props: {
        modal: {
            type: Boolean,
            default: true
        },
        appear: {
            type: Boolean,
            default: true
        },
        zIndex: Number,
    },
})
</script>
<style scoped>
.modal-wrap {
    position: relative;
}
.modal-lay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
}
</style>