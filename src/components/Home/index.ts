import { ref } from 'vue'
const modules = import.meta.glob('./*.vue')
let components = ref({});
Object.keys(modules).forEach(async (path) => {
    const component = await modules[path]()
    components[component.default.name] = component.default;
});
export default components