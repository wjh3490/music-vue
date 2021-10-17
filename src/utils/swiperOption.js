// basic
export const basicSwiperOptions = {
  loop: false,
  watchSlidesVisibility: true,
}

export const playListSwiperOption = {
  effect: 'coverflow',
  slidesPerView: '3',
  spaceBetween: '-20%',
  centeredSlides: true,
  
  loop: true,
  loopSlides: 2,
  coverflowEffect: {
    rotate: 0, // 旋转的角度
    stretch: 0, // 拉伸   图片间左右的间距和密集度
    depth: 130, // 深度   切换图片间上下的间距和密集度
    modifier: 4, // 修正值 该值越大前面的效果越明显
    slideShadows: false,
  }
}

export const playerSwiperOptions = {
  observer: true,
  observeParents: true,
  ...basicSwiperOptions
}

export const topListSwiperOptions = {
  watchSlidesVisibility: true,
  slidesPerView: "auto",
  centeredSlides: true,
  observer: true,
  observeParents: true,
}

export const homeSwiperOptions = {
  pagination: {
    clickable: true,
  },
  loop: true,
  watchSlidesVisibility: true,
  centeredSlides: true,
  slidesPerView: "auto",
  loopedSlides: "2",
  lazy: {
    preloaderClass: "my-lazy-preloader",
  },
  autoplay: {
    delay: 2000,
    stopOnLastSlide: false,
    disableOnInteraction: false,
  },
};

export const mallSwiperOptions = {
  watchSlidesVisibility: true,
  centeredSlides: true,
  slidesPerView: 'auto',
}