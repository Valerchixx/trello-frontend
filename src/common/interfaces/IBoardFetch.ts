import ICard from './ICard';

interface user{
    id:number,
    username:string
}

export interface list{
    cards: ICard[],
    id:number,
    title:string,
    position:number
}

export interface IBoardFetch{
    users: user[],
    lists: list[],
    title:string
}

export interface BoardState{
    board: IBoardFetch,
    inputText:string
}
