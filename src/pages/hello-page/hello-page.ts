import Block from "../../utils/core/Block";
import {TProps} from "../../utils/core/Block";
import LinkHelloPage from "../../components/link-hello-page/link-hello-page";
import helloTemplate from "./hello-page.pug";
import "./hello-page.less";
import {routs} from "../../index";
// import connect from "../../utils/core/HOC";


export default class HelloPage extends Block {
    constructor(props: TProps) {
        super("div", {
                ...props,
                linkChats: new LinkHelloPage({urlLink: routs.chatsPage, textLink: "Chat Page"}),
                linkSignUp: new LinkHelloPage({urlLink: routs.signUpPage, textLink: "Sign Up"}),
                linkProfile: new LinkHelloPage({urlLink: routs.changeProfilePage, textLink: "Settings"}),
                linkLogIn: new LinkHelloPage({urlLink: routs.signInPage, textLink: "Login"}),
                linkError: new LinkHelloPage({urlLink: routs.errorPage, textLink: "Error"}),
                linkChangeProfile: new LinkHelloPage({urlLink: routs.profilePage, textLink: "Profile"}),
                linkChangePassword: new LinkHelloPage({urlLink: routs.changePasswordPage, textLink: "Change Password"})
            }
        )
    }

    render() {
        return this.compile(helloTemplate, {});
    }
}