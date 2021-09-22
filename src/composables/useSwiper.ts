import { ref } from 'vue'
import type { SwiperEvents } from "swiper/types";
export default function useSwiper() {
    const swiper = ref<any>(null);
    const active = ref(0);
    const valueKey = ref<string | number>('');
    const onSwiper = (sw: SwiperEvents) => {
        swiper.value = sw
    };
    const onSlideChange = () => {
        active.value = swiper.value.activeIndex;
    };
    const handleSlide = (index, value?, speed?: number = 0) => {
        if (active.value == index) return;
        valueKey.value = value;
        swiper.value.slideTo(index, speed, false);
    };

    return {
        active,
        valueKey,
        onSwiper,
        handleSlide,
        onSlideChange,
    }
}