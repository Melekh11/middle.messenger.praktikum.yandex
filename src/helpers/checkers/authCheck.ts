import {store} from "../../utils/core/Store";
import {chatsController} from "../../controllers/chats-controller";
import {authApi} from "../../api/auth-api";
import {MyRouter, routs} from "../../index";

export function checkAuth() {
    authApi.userInfo()
        .then(async (data) => {
            console.log("setting user:", data.response);
            await store.setState("user", data.response);
            await chatsController.getAllChats().then(async (data) => {
                await store.setState("chats", data.response);
            });
            MyRouter.go(routs.chatsPage);
        })
        .catch(() => {
            MyRouter.go(routs.signInPage);
        })
}
