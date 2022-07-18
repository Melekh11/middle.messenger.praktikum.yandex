import Block from "../../utils/core/Block";
import Input from "../../components/input/input";
import SubmitButton from "../../components/submit-button/submit-button";
import ButtonBack from "../../components/button-back/button-back";
// @ts-ignore
import changeProfTemplate from "./change-password.pug"
import "./change-password.less"
// @ts-ignore
import avatar from "../../static/img/ava.png"


export default class ChangeProfilePasswordPage extends Block{
    constructor(props) {
        super("div", {...props,
            btnBack: new ButtonBack({}),
            btnSubmit: new SubmitButton({text: "изменить"}),
            urlIm: avatar,
            inputOldPassword: new Input({
                textLabel: "старый пароль",
                inputClass: "inlineText",
                inputType: "password",
                inputName: "oldPassword",
                inputCheckType: "password"
            }),
            inputNewPassword: new Input({
                textLabel: "новый пароль",
                inputClass: "inlineText",
                inputType: "password",
                inputName: "oldPassword",
                inputCheckType: "password"
            })
        });
    }

    render() {
        return this.compile(changeProfTemplate, {urlIm: this.props.urlIm});
    }
}