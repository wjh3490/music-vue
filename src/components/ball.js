import component from './Base/BaseBall.vue';

export default function(Vue) {
  const Constructor = Vue.extend(component);
  const Instance = new Constructor();
  Instance.$mount();

  document.body.appendChild(Instance.$el);
  Vue.prototype.$drop = (ele) => {
    Instance.drop(ele);
  };
}
