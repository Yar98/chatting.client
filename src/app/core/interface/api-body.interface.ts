export interface ILogin{
    userName: string;
    password: string;
}

export interface IUser{
    id: string;
    userName: string;
    password: string;
}

export interface IMessage{
    id: string;
    content: string;
    createdTime: Date;
    replyMessage: IMessage | null;
    user: IUser;

}

export interface IRoom {
    id: string;
    name: string;   
}