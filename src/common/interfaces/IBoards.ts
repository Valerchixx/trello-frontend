import {IUser} from './IUser';
import {ILists} from './ILists';

export interface IBoards{
    title: string;
    lists: ILists;
    users: IUser[];
}
