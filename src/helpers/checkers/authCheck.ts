import { store } from "../../utils/core/Store";
import { chatsController } from "../../controllers/chats-controller";
import { authApi } from "../../api/auth-api";
import { MyRouter, routs } from "../../index";
import {getCookie} from "../../utils/cookie/get-cookie";


// aboba

export function checkAuth() {
    authApi
        .userInfo()
        .then(async (data) => {
            await store.setState("user", data.response);
            await chatsController.getAllChats().then(async (data) => {
                await store.setState("chats", data.response);
            });
            const lastRoute = getCookie("lastRoute");
            if (lastRoute){
                MyRouter.go(lastRoute);
            } else {
                MyRouter.go(routs.chatsPage);
            }
            MyRouter.start();
        })
        .catch(() => {
            MyRouter.go(routs.signInPage);
        });
}
