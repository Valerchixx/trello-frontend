import {ICards} from './ICards';

export interface IList{
    title: string;
    cards: ICards;
    id: number;
    position: number;
}
