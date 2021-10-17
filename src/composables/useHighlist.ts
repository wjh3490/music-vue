
import { computed } from 'vue'
export default function useHighlight() {
    const highlight = computed(() => (val: string, keyword: string) => {
        const reg = new RegExp(keyword, 'gi');
        return val.replace(reg, `<span class='highlight'>${keyword}</span>`);
    })
    return { highlight }
}