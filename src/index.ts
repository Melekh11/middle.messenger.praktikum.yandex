import "./index.less";
import render from "./utils/core/render";
import ErrorPage from "./pages/errors/error";
import ProfilePage from "./pages/profile/profile";
import ChangeProfilePage from "./pages/change-profile/changeProfile";
import ChangeProfilePasswordPage from "./pages/change-password/change-password";
import LoginPage from "./pages/log-in/login";
import SignUpPage from "./pages/sign-up/sing-up";
import ChatsPage from "./pages/chats/chats";
import HelloPage from "./pages/hello-page/hello-page";

render("#root", new HelloPage({}));
// @ts-ignore
window.renderPage = function (pageName) {
  switch (pageName) {
    case "profilePage": {
      render(
        "#root",
        new ProfilePage({
          login: "melekh",
          shortName: "maty",
          fullName: "Матвей",
          email: "melekh@gmail.com",
          phone: "8 (926) 191 43 52",
        })
      );
      break;
    }
    case "error-404": {
      render("#root", new ErrorPage({ errorNumber: 404 }));
      break;
    }
    case "error-500": {
      render("#root", new ErrorPage({ errorNumber: 500 }));
      break;
    }
    case "changeProfile": {
      render("#root", new ChangeProfilePage({}));
      break;
    }
    case "changePassword": {
      render("#root", new ChangeProfilePasswordPage({}));
      break;
    }
    case "login": {
      render("#root", new LoginPage({}));
      break;
    }
    case "sign up": {
      render("#root", new SignUpPage({}));
      break;
    }
    case "chats": {
      render("#root", new ChatsPage({}));
      break;
    }
    case "back": {
      render("#root", new HelloPage({}));
      break;
    }
  }
};
