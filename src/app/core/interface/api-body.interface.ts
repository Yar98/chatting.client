export interface ILogin {
    userName: string;
    password: string;
}

export interface IUser_Create {
    id: string;
    userName: string;
    password: string;
}

export interface IUser_Get {
    id: string;
    userName: string;
}


export interface IMessage_Create {
    content: string;
    replyMessageId: string | null;
    userId: string;
    roomId: string;
    socketId: string;
}

export interface IMessage_Get {
    id: string;
    content: string;
    replyMessage: {
        id: string;
        content: string;
    };
    user: IUser_OfRoom_Get;
    roomId: string;
}

export interface IRoom_Create {
    name: string;
    category: Number;
    socketId: string;
    users: Array<IUser_OfRoom_Get>;
}

export interface IUser_OfRoom_Get{
    id: string;
    userName: string;
    status: Number;
}

export interface IRoom_Get {
    id: string;
    name: string;
    category: Number;
    users: Array<IUser_OfRoom_Get>;
}

export interface IRoom {
    id: string;
    name: string;
    category: Number;
    isVirtual: boolean;
    users: Array<IUser_OfRoom>;
}

export interface IUser_OfRoom{
    id: string;
    userName: string;
    status: Number;
}

export interface IUser {
    id: string;
    userName: string;
}

export interface IMessage{
    id: string;
    content: string;
    replyMessage: {
        id: string;
        content: string;
    };
    user: IUser_OfRoom;
    roomId: string;
}