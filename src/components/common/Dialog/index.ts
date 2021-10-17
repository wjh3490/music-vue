import { createVNode, render, ExtractPropTypes, ComponentPublicInstance } from 'vue'
import increase from '@/utils/zIndex'
import Dialog from './index.vue'
import { dialogProps } from './props'

type DialogProps = ExtractPropTypes<typeof dialogProps>
type DialogParams = Partial<Omit<DialogProps, 'zIndex'>>
type DialogFn = (options?: DialogParams) => Promise<any>

let vm;
const dialog: DialogFn = function (options = {}) {
    const zIndex = increase()
    const props: Partial<DialogProps> = {
        ...options,
        zIndex
    }
    if (vm) {
        const { component } = vm
        const { content, icon } = options
        component!.props.zIndex = zIndex
        component!.props.content = content || ''
        component!.props.icon = icon || '';
        (
            component!.proxy as ComponentPublicInstance<{ visible: boolean }>
        ).visible = true
        return component?.proxy?.handleDialog?.()
    }
    const container = document.createElement('div')
    vm = createVNode(
        Dialog,
        props,
    )
    render(vm, container)
    document.body.appendChild(container)
    return vm?.component?.proxy?.handleDialog?.()
}

export default dialog