<template>
    <modal :modal="false" :z-index="zIndex">
        <transition name="fade-in" :appear="true">
            <div v-show="visible" class="toast-container">
                <span class="iconfont" :class="{ icon }"></span>
                <span>{{ content }}</span>
            </div>
        </transition>
    </modal>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import Modal from '../Modal.vue'
import { toastProps } from './props'
export default defineComponent({
    name: 'Toast',
    components: { Modal },
    props: toastProps,
    setup(props) {
        const visible = ref(true)
        let timer: number
        const close = () => { visible.value = false }
        const startTimer = () => {
            visible.value = true
            timer = setTimeout(close, props.duration)
        }
        const clearTimer = () => { clearTimeout(timer) }
        onMounted(startTimer)
        onUnmounted(clearTimer)
      
        return {
            visible,
            clearTimer,
            startTimer
        }
    }
})
</script>
<style scoped>
.toast-container {
    position: fixed;
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: content-box;
    max-width: 70%;
    padding: 12px 16px;
    color: #fff;
    font-size: 14px;
    line-height: 20px;
    white-space: pre-wrap;
    text-align: center;
    word-wrap: break-word;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 8px;
    transform: translate3d(-50%, -50%, 0);
}
</style>