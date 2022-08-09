import Block from "../../utils/core/Block";
import {TProps} from "../../utils/core/Block";
import "./submit-button.less"
import btnSubTemplate from "./submit-button.pug";
// import Router from "../../utils/core/Router";
// import authController from "../../controllers/auth-controller";
// import login from "../../pages/sing-in/login";

export default class SubmitButton extends Block {
    constructor(props: TProps) {
        super("div", {
            ...props
        });
    }

    render() {
        return this.compile(btnSubTemplate, {
            textSubBtn: this.props.text,
        });
    }
}
