let touchstart, touchmove, touchend, parentNode;
/*eslint-disable */
export default {
  inserted(el) {
    const imgEl = el.children[0];
    const imgHeight = el.clientHeight; 
    parentNode = el.parentNode; 
    let startY;
    const easeOutCubic = (t, b, c, d) => c * ((t = t / d - 1) * t * t + 1) + b;

    touchstart = e => {
      const y = e.targetTouches[0].clientY;
      if (y < imgHeight) {
        return;
      }
      startY = y;
      el.classList.remove('rebound');
      imgEl.classList.remove('rebound');
    };

    touchmove = e => {
      if (!startY) {
        return;
      }
      const y = e.targetTouches[0].clientY;
      const moveDis = y - startY;
      if (window.scrollY <= 0 && moveDis > 0) {
        const height = easeOutCubic(moveDis, imgHeight, 100, 300);
        el.style.height = height + 'px';
        const scale = easeOutCubic(moveDis, 1, 0.2, 300);
        imgEl.style.transform = `translate(0%, 0%) scale(${scale})`;
      }
    };

    touchend = () => {
      startY = null;
      el.style.height = imgHeight + 'px';
      imgEl.style.transform = 'translate(0%, 0%)';
      el.classList.add('rebound');
      imgEl.classList.add('rebound');
    };

    removeEventListener('addEventListener');
  },
  unbind() {
    removeEventListener('removeEventListener');
  }
};
function removeEventListener(name) {
  parentNode[name]('touchstart', touchstart);
  parentNode[name]('touchmove', touchmove);
  parentNode[name]('touchend', touchend);
}
