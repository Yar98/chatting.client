import { IMessage } from "../interface/api-body.interface";

export const MESSAGES: IMessage[] = [
    {
        id: '1',
        content: 'helloworld 1',
        createdTime: new Date(Date.now.toString()),
        replyMessage: null,
        user: {
          id: '1',
          userName: 'yarito',
          password: 'yarito'
        }
      },
      {
        id: '2',
        content: 'helloworld 2',
        createdTime: new Date(Date.now.toString()),
        replyMessage: null,
        user: {
          id: '2',
          userName: 'yaritu',
          password: 'yaritu'
        }
      }
]