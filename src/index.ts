import "./index.less";
import { Router } from "./utils/core/Router";
import { ErrorPage } from "./pages/errors/error";
import { ProfilePage } from "./pages/profile/profile";
import { ChangeProfilePage } from "./pages/change-profile/changeProfile";
import { ChangePasswordPage } from "./pages/change-password/change-password";
import { SignInPage } from "./pages/sing-in/login";
import { SignUpPage } from "./pages/sign-up/sing-up";
import { ChatsPage } from "./pages/chats/chats";
import { store } from "./utils/core/Store";
import { authController } from "./controllers/auth-controller";

enum routs {
  signUpPage = "/sign-up",
  changeProfilePage = "/settings",
  chatsPage = "/messenger",
  signInPage = "/sing-in",
  changePasswordPage = "/change-password",
  profilePage = "/profile",
  errorPage = "/error",
}

const MyRouter = new Router();
MyRouter.use(routs.signUpPage, SignUpPage)
  .use(routs.profilePage, ProfilePage, {
    login: "unknown",
    shortName: "unknown",
    fullName: "unknown",
    email: "unknown",
    phone: "unknown",
  })
  .use(routs.changeProfilePage, ChangeProfilePage)
  .use(routs.chatsPage, ChatsPage)
  .use(routs.signInPage, SignInPage)
  .use(routs.changePasswordPage, ChangePasswordPage)
  .use(routs.errorPage, ErrorPage, { errorNumber: 404 })
  .start();

if (store.getState().user) {
  MyRouter.go(routs.profilePage);
} else {
  authController.singOut();
  MyRouter.go(routs.signInPage);
}

export { MyRouter, routs };
