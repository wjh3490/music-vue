import { createVNode, render, ExtractPropTypes } from 'vue'
import increase from '@/utils/zIndex'
import Toast from './index.vue'
import { toastProps } from './props'

type ToastProps = ExtractPropTypes<typeof toastProps>
type ToastParams = Partial<Omit<ToastProps, 'zIndex'>>
type ToastFn = (options?: ToastParams) => void

let vm: any;
const toast: ToastFn = function (options = {}) {
    const zIndex = increase()
    const props: Partial<ToastProps> = {
        ...options,
        zIndex
    }
    if (vm) {
        const { component } = vm
        const { content, icon, duration } = options
        component!.props.zIndex = zIndex
        component!.props.content = content || ''
        component!.props.icon = icon || ''
        component!.props.duration = duration || 500
        component?.proxy?.clearTimer?.()
        component?.proxy?.startTimer?.()
        return
    }
    const container = document.createElement('div')
    vm = createVNode(
        Toast,
        props,
    )
    render(vm, container)
    document.body.appendChild(container)
}

export default toast