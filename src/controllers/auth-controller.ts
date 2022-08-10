import {authApi,  ISingIn, ISingUp} from "../api/auth-api";
import {MyRouter, routs} from "../index";
import {store} from "../utils/core/Store";
import {chatsController} from "./chats-controller";


class AuthController {

    public async signIn(data: ISingIn) {
        console.log("sign in controller");
        return authApi.signIn(data)
            .then( () => {
                authApi.userInfo()
                    .then( async (data) => {
                        console.log("setting user:", data.response)
                        await store.setState("user", data.response);
                        await chatsController.getAllChats()
                            .then(async (data) => {
                                await store.setState("chats", data.response);
                            })
                        MyRouter.go(routs.chatsPage);
                    })
            })
            .catch(() => {
                console.log("error");
                // authApi.logOut();
                MyRouter.go(routs.errorPage);
            })
    }

    public singUp(data: ISingUp) {
        return authApi.singUp(data)
            .then(() => {
                authApi.userInfo()
                    .then(async (data) => {
                        await store.setState("user", data.response);
                        await chatsController.getAllChats()
                            .then(async (data) => {
                                await store.setState("chats", data.response);
                            })
                        MyRouter.go(routs.chatsPage);
                    })
            })
            .catch(() => {
                console.log("error");
                MyRouter.go(routs.errorPage);
            });
    }

    public singOut() {
        authApi.logOut()
            .then(() => {
                MyRouter.go(routs.signInPage);
                store.setState("user", undefined);
            })
    }

    public checkUser() {
        return authApi.userInfo()
            .then((user) => {
                store.setState("currentUser", user);
            })
            .catch(() => {
                console.log("error")
                MyRouter.go(routs.errorPage);
            })
    }
}

const authController = new AuthController();
export {authController};
