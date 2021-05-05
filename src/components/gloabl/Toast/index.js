import Vue from 'vue';
import component from './index.vue';

let Instance;
let time;
function Toast({ message, duration = 3000 }) {
  if (Instance) {
    Instance.message = message;
    Instance.visible = true;
    clearTimeout(time);
    time = setTimeout(() => {
      Instance.visible = false;
    }, duration);
    return Instance;
  }
  const Constructor = Vue.extend(component);
  Instance = new Constructor({
    data: { time },
  });

  Instance.$mount();
  Instance.visible = true;
  Instance.message = message;
  time = setTimeout(() => {
    Instance.visible = false;
  }, duration);
  document.body.appendChild(Instance.$el);
}
export default Toast;
