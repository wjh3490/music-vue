import { ref, onMounted } from 'vue'
import { fetchNewAlbumset, fetchAlbumList } from "@/api/album";
import { fetchNewsong } from "@/api/recomment";
import { splitList, arrayToString } from "@/utils";
interface multipleType {
    list: Array<{ [key: string]: string | number }>;
    type: string;
};
interface Item {
    id: number;
    name: string;
    picUrl: string;
    artists: string;
    album?: string;
};

export default function useMultiple() {
    const activeTab = ref<any>("song");
    const multipleList = ref<multipleType[]>([]);
    const getItem = (
        id: number,
        name: string,
        picUrl: string,
        artists: string,
        album: string
    ): Item =>
    ({
        id,
        name,
        picUrl,
        artists: Array.isArray(artists) ? arrayToString(artists) : artists,
        album
    })
    const getNewAlbum = async () => {
        const { albums } = await fetchNewAlbumset({ limit: 6 });
        const list = albums.slice(0, 6).reduce((acc: Array<Item>, cur: any) => {
            const { id, name, picUrl, artists } = cur;
            acc.push(getItem(id, name, picUrl, artists, ''))
            return acc;
        }, []);
        multipleList.value.push({ list: splitList(list, 3), type: "album", });
    };
    const getAlbumList = async () => {
        const { products } = await fetchAlbumList({ limit: 9 });
        const list = products.reduce((acc: Array<Item>, cur: any) => {
            const { albumId, albumName, coverUrl, artistName } = cur;
            acc.push(getItem(albumId, albumName, coverUrl, artistName, ''));
            return acc;
        }, []);
        multipleList.value.push({ list: splitList(list, 3), type: "digitalbum", });
    };
    const getNewsong = async () => {
        const { result } = await fetchNewsong({ limit: 12, offset: 1 });
        const list = result.reduce((acc: Array<Item>, cur: any) => {
            const { id, name, picUrl, song } = cur;
            acc.push(getItem(id, name, picUrl, song.artists, song?.album?.name));
            return acc;
        }, []);
        multipleList.value.push({ list: splitList(list, 3), type: "song", });
    };
    const handleTabChange = (id: string): void => {
        activeTab.value = id;
    };

    onMounted(() => {
        getNewAlbum()
        getAlbumList()
        getNewsong()
    });
    return {
        activeTab,
        multipleList,
        handleTabChange
    }
};
