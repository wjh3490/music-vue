import { ref, onMounted, shallowRef } from 'vue'
import { splitList } from "@/utils";
import { Song } from "@/utils/config";
import { fetchNewAlbumset, fetchAlbumList } from "@/api/album";
import { fetchNewsong } from "@/api/recomment.js";
type multipleType = {
    list: [];
    type: string;
};

export type songType = {
    id: string;
    name: string;
    picUrl: string;
    artists: string;
    album?: string;
    alia?: string;
    publishTime?: number;
    privilege?: {
        pl: string;
        fee: string;
        flag: string;
        maxbr: string;
    };
};

export default function useMultiple() {
    const activeTab = ref<any>("song");
    const multipleList = ref<multipleType[]>([]);
    const getNewAlbum = async () => {
        const { albums } = await fetchNewAlbumset({ limit: 6 });
        const list = albums.slice(0, 6).reduce((acc: Array<songType>, cur: any) => {
            const { id, name, picUrl, artists } = cur;
            acc.push(
                new Song({
                    id,
                    name,
                    picUrl,
                    artists,
                })
            );
            return acc;
        }, []);
        const multiple: multipleType = {
            list: splitList(list, 3),
            type: "album",
        };
        multipleList.value.push(multiple);
    };
    const getAlbumList = async () => {
        const { products } = await fetchAlbumList({ limit: 9 });
        const list = products.reduce((acc: Array<songType>, cur: any) => {
            const { albumId, albumName, coverUrl, artistName } = cur;
            acc.push(
                new Song({
                    id: albumId,
                    name: albumName,
                    picUrl: coverUrl,
                    artists: [{ name: artistName }],
                })
            );
            return acc;
        }, []);
        const multiple: multipleType = {
            list: splitList(list, 3),
            type: "digitalbum",
        };
        multipleList.value.push(multiple);
    };
    const getNewsong = async () => {
        const { result } = await fetchNewsong({ limit: 30, offset: 1 });
        const list = result.reduce((acc: Array<songType>, cur: any) => {
            const { id, name, picUrl, song } = cur;
            acc.push(
                new Song({
                    id,
                    name,
                    picUrl,
                    artists: song["artists"],
                    album: song.album.name,
                    privilege: {
                        pl: song.privilege["pl"],
                        fee: song.privilege["fee"],
                        flag: song.privilege["flag"],
                        maxbr: song.privilege["maxbr"],
                    },
                })
            );
            return acc;
        }, []);
        const multiple: multipleType = {
            list: splitList(list, 3),
            type: "song",
        };
        multipleList.value.push(multiple);
    };
    const handleTabChange = (e: Event): void => {
        const {
            type
        }  = (e.target as HTMLDivElement).dataset
        activeTab.value = type;
    };

    onMounted(getNewAlbum);
    onMounted(getAlbumList);
    onMounted(getNewsong);

    return {
        activeTab,
        multipleList,
        handleTabChange
    }
};
