export const toastProps = {
    content: {
        type: String,
        default: '',
    },
    icon: {
        type: String,
        default: '',
    },
    duration: {
        type: Number,
        default: 500
    },
    zIndex: Number
} as const