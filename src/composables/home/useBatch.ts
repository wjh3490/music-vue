import { shallowReactive, toRefs, onMounted } from 'vue'
import { fetchPersonalized } from "@/api/recomment";
import { getVideos, getMVs, getDjs, getDjToplist } from "@/api/video";
type mvType = {
    cover: string,
    name: string
}

type mvType1 = {
    picUrl: string,
    name: string
}
export default function useBatch() {
    const apis = [
        getDjs(),
        getDjToplist(),
        fetchPersonalized(),
        getVideos(),
        getMVs(),
    ];
    const state = shallowReactive({
        djs: [],
        djToplist: [],
        personalized: [],
        videos: [],
        mvs: [],
        list: [],
    });
    const feachBatchs = async () => {
        const res = await Promise.all(apis);
        state.djs = res[0]["djRadios"];
        state.djToplist = res[1]["toplist"];
        state.personalized = res[2]["result"];
        state.videos = res[3]["result"];
        state.mvs = res[4]["data"].map(<T extends mvType>(item: T) => ({
            picUrl: item.cover,
            name: item.name,
        }));
        state.list = res[0]["djRadios"];
    };
    onMounted(feachBatchs);
    return toRefs(state)
}