let touchstart, touchmove, touchend;
export default {
  inserted(el) {
    const imgEl = el.children[0];
    const imgHeight = el.clientHeight;
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
        imgEl.style.transform = `translate(-50%, -50%) scale(${scale})`;
      }
    };

    touchend = () => {
      startY = null;
      el.style.height = imgHeight + 'px';
      imgEl.style.transform = 'translate(-50%, -50%)';
      el.classList.add('rebound');
      imgEl.classList.add('rebound');
    };
    window.addEventListener('touchstart', touchstart);
    window.addEventListener('touchmove', touchmove);
    window.addEventListener('touchend', touchend);
  },
  unbind() {
    window.removeEventListener('touchstart', touchstart);
    window.removeEventListener('touchmove', touchmove);
    window.removeEventListener('touchend', touchend);
  }
};
