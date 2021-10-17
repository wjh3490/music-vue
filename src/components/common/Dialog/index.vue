<template>
    <modal :z-index="zIndex" :modal="visible" @close="handleCancel">
        <transition name="fade-in" :appear="true">
            <div v-show="visible" class="confirm-content">
                <p class="text">{{ content }}</p>
                <div class="operate">
                    <div @click.stop="handleCancel" class="operate-btn left">取消</div>
                    <div @click.stop="handleConfirm" class="operate-btn">确定</div>
                </div>
            </div>
        </transition>
    </modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import store from '@/store'
import Modal from '../Modal.vue'
import { dialogProps } from './props'
export default defineComponent({
    name: 'Dialog',
    components: { Modal },
    props: dialogProps,
    setup() {
        const visible = ref(true)
        const _resolve = ref<any>('')
        const _reject = ref<any>('')

        const handleConfirm = () => {
            store.commit('setlockScroll', -1)
            visible.value = false;
            _resolve.value('confirm');
        }
        const handleCancel = () => {
            store.commit('setlockScroll', -1)
            visible.value = false;
            _reject.value('cancel');
        }
        const handleDialog = () => {
            return new Promise((resolve, reject) => {
                _resolve.value = resolve;
                _reject.value = reject;
            });
        }
        return {
            visible,
            handleDialog,
            handleCancel,
            handleConfirm,
        }
    }
})
</script>
<style scoped lang="less">
.confirm-content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 27rem;
    border-radius: 5px;
    background: #fff;
}
.text {
    padding: 12px 15px;
    line-height: 22px;
    text-align: center;
    font-size: 12px;
}
.operate {
    display: flex;
    align-items: center;
    text-align: center;
    font-size: 12px;
    .operate-btn {
        flex: 1;
        line-height: 22px;
        padding: 12px 0;
        border-top: 1px solid #f5f5f5;
        color: red;
        &.left {
            border-right: 1px solid #f5f5f5;
        }
    }
}
</style>