import Vue from 'vue';
import component from './index.vue';
let ShadowConstructor = Vue.extend(component);
let instance;
let instances = [];
let id = 1;
const Shadow = function(options) {
  options = options || {};
  id++;
  if (typeof options.onClose === 'function') {
    let onClose = options.onClose;
    options.onClose = function() {
      Shadow.close(id, onClose);
    };
  }

  instance = new ShadowConstructor({ data: options });
  instance.id = id;
  instance.$mount();
  document.body.appendChild(instance.$el);
  instance.zIndex = options.zIndex;
  instance.background = options.background;
  instance.visible = options.visible;
  instances.push(instance);
  return instance;
};
Shadow.close = function(id, onClose) {
  let len = instances.length;
  for (let i = 0; i < len; i++) {
    if (id === instances[i].id) {
      if (typeof onClose === 'function') {
        onClose();
      }
      instances.splice(i, 1);
      break;
    }
  }
};
export default Shadow;
