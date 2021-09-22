export interface Privilege {
    pl: number,
    fee: number,
    flag: number,
    maxbr: number,
}

export interface Song {
    id: number,
    name: string,
    album: string,
    alia?: '',
    artists: string,
    publishTime?: number,
    picUrl: string,
    privilege: Privilege
}

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