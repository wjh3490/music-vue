export interface Privilege {
    pl: number,
    fee: number,
    flag: number,
    maxbr: number,
}

export interface SongParams {
    id: number,
    name: string,
    album: string,
    alia: '',
    artists: string,
    publishTime: number,
    picUrl: string,
    privilege: Privilege
}
 export type Song = Partial<SongParams>
export interface Singer {
    id: number,
    name: string,
    singerPic: string,

} 
export interface Tab {
    init: (time: number) => void
}
export type StrKeys<T> = {
    [key: string]: number | T
}

export type NumKeys<T> = {
    [key: number]: string | T
}