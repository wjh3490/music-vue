/*eslint-disable */
let touchstart, touchmove, touchend, click, ball;
export default {
  inserted(el, binding, vnode) {
    ball = vnode.context.$refs.progressBall;

    const context = vnode.context;
    const progress = el.children[0];
    const parentClientWidth = document.body.clientWidth * 0.7;

    ball = context.$refs.progressBall;
    let touch = {
      startX: 0,
      left: 0
    };

    const getPercent = deltaX => {
      const offsetWidth = Math.min(
        parentClientWidth,
        Math.max(0, touch.left + deltaX)
      );
      return offsetWidth / parentClientWidth;
    };

    const handleLyric = currentTime => {
      const filterLyric = context.lyricKeys.filter(
        item => item <= Math.floor(currentTime)
      );
      context.$listeners.progressBar(currentTime);
      context.$listeners['update:LyricScrollY'](filterLyric.length);
      context.$listeners['update:debounce'](true);
    };

    touchstart = e => {
      e.stopPropagation();
      touch.startX = e.touches[0].clientX;
      touch.left = progress.clientWidth;
    };

    touchmove = e => {
      e.stopPropagation();
      context.isMove = true;
      context.visible = true;

      const deltaX = e.touches[0].clientX - touch.startX;
      const percent = getPercent(deltaX);

      progress.style.width = percent * 100 + '%';
      context.tip = percent * context.duration;
    };

    touchend = e => {
      e.stopPropagation();
      const deltaX = e.changedTouches[0].clientX - touch.startX;
      const percent = getPercent(deltaX);
      const currentTime = percent * context.duration;
      
      handleLyric(currentTime);

      context.visible = false;
      setTimeout(() => (context.isMove = false), 50);
    };

    click = e => {
      e.preventDefault();
      e.stopPropagation();
      const offsetX = el.getBoundingClientRect().left;
      const percent = (e.clientX - offsetX) / parentClientWidth;
      const currentTime = percent * context.duration;
      handleLyric(currentTime);
    };

    eventListener('addEventListener', el);
  },

  unbind(el) {
    eventListener('removeEventListener', el);
  }
};

function eventListener(name, el) {
  ball[name]('touchstart', touchstart, false);
  ball[name]('touchmove', touchmove, false);
  ball[name]('touchend', touchend, false);
  el[name]('click', click, false);
}
