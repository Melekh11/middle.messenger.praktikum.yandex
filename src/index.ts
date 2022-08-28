import "./index.less";
import { Router } from "./utils/core/Router";
import { ErrorPage } from "./pages/errors/error";
import { ProfilePage } from "./pages/profile/profile";
import { ChangeProfilePage } from "./pages/change-profile/changeProfile";
import { ChangePasswordPage } from "./pages/change-password/change-password";
import { SignInPage } from "./pages/sing-in/login";
import { SignUpPage } from "./pages/sign-up/sing-up";
import { ChatsPage } from "./pages/chats/chats";
import { checkAuth } from "./helpers/checkers/authCheck";

export enum routs {
  signUpPage = "/sign-up",
  changeProfilePage = "/settings",
  chatsPage = "/messenger",
  signInPage = "/sign-in",
  changePasswordPage = "/change-password",
  profilePage = "/profile",
  errorPage = "/error",
}

console.log("starting app");

// @ts-ignore какая-то странная ошибка Cannot redeclare exported variable 'MyRouter', в гугле ничего толкового не нашёл
export const MyRouter = new Router();
MyRouter.use(routs.signUpPage, SignUpPage, false)
  .use(routs.profilePage, ProfilePage, true, {
    login: "unknown",
    shortName: "unknown",
    fullName: "unknown",
    email: "unknown",
    phone: "unknown",
  })
  .use(routs.changeProfilePage, ChangeProfilePage, true)
  .use(routs.chatsPage, ChatsPage, true)
  .use(routs.signInPage, SignInPage, false)
  .use(routs.changePasswordPage, ChangePasswordPage, true)
  .use(routs.errorPage, ErrorPage, false, { errorNumber: 404 })
  .start();
checkAuth();
