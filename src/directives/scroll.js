/*eslint-disable */
let touchstart, touchmove, touchend;
export default {
  inserted(el, binding, vnode) {
    const parentNode = document.querySelector('.layout-container');
    let startX;
    touchstart = e => {
      e.stopPropagation();
      startX = e.touches[0].clientX;
    };

    touchmove = e => {
      const deltaX = Math.abs(e.touches[0].clientX - startX);
    };

    touchend = e => {
      e.stopPropagation();
      const deltaX = e.changedTouches[0].clientX;
    };

    eventListener('addEventListener', el);
  },

  unbind(el) {
    eventListener('removeEventListener', el);
  }
};

function eventListener(name, el) {
  window[name]('touchstart', touchstart, false);
  window[name]('touchmove', touchmove, false);
  window[name]('touchend', touchend, false);
}
