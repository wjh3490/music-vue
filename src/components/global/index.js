import GCard from './GCard.vue';
import GHeadNav from './GHeadNav.vue';
import GSwiperItems from './GSwiperItems.vue';
import GTabsNav from './GTabsNav.vue';

function registerGolbal(app) {
    app.component('GCard', GCard);
    app.component('GHeadNav', GHeadNav);
    app.component('GSwiperItems', GSwiperItems);
    app.component('GTabsNav', GTabsNav);
}
export default registerGolbal;