import {chatsApi} from "../api/chats-api";
import {IChatUsers} from "../api/chats-api";

class ChatsController{
    public createChat(title: string){
        return chatsApi.createChat({title: title});
            // .then((chat) => {return chat.response.id})
    }

    public addUsers(data: IChatUsers){
        chatsApi.addUsers(data);
    }

    public deleteUser(data: IChatUsers){
        chatsApi.deleteUsers(data);
    }

    public addChatAva(data: FormData){
        chatsApi.addChatAva(data);
    }

    public getChatToken(id: number){
        return chatsApi.getToken(id);
    }

    public getAllChats(){
        return chatsApi.getAllChats();
    }

}

const chatsController = new ChatsController();
export {chatsController};
