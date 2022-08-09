import "./index.less";
import Router from "./utils/core/Router";
import ErrorPage from "./pages/errors/error";
import ProfilePage from "./pages/profile/profile";
import ChangeProfilePage from "./pages/change-profile/changeProfile";
import ChangePasswordPage from "./pages/change-password/change-password";
import SignInPage from "./pages/sing-in/login";
import SignUpPage from "./pages/sign-up/sing-up";
import ChatsPage from "./pages/chats/chats";
import HelloPage from "./pages/hello-page/hello-page";


enum routs {
    helloPage = "/",
    signUpPage = "/sign-up",
    changeProfilePage = "/settings",
    chatsPage = "/messenger",
    signInPage = "/sign-in",
    changePasswordPage = "/change-password",
    profilePage = "/profile",
    errorPage = "/error"
}

const MyRouter = new Router();
MyRouter
    .use(routs.helloPage, HelloPage)
    .use(routs.signUpPage, SignUpPage)
    .use(routs.changeProfilePage, ChangeProfilePage)
    .use(routs.chatsPage, ChatsPage)
    .use(routs.signInPage, SignInPage)
    .use(routs.changePasswordPage, ChangePasswordPage)
    .use(routs.profilePage, ProfilePage, {
        login: "melekh",
        shortName: "maty",
        fullName: "Матвей",
        email: "melekh@gmail.com",
        phone: "8 (926) 191 43 52",
    })
    .use(routs.errorPage, ErrorPage, {errorNumber: 404})
    .start();

export {MyRouter, routs}