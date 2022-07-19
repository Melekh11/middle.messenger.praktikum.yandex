import Block from "../../utils/core/Block";
import ButtonBack from "../../components/button-back/button-back";
import Input from "../../components/input/input";
import SubmitButton from "../../components/submit-button/submit-button";
import "./login.less";
// @ts-ignore
import loginTemplate from "./login.pug";

export default class LoginPage extends Block {
  constructor(props) {
    super("div", {
      ...props,
      buttonBack: new ButtonBack({}),
      loginInput: new Input({
        textLabel: "логин",
        inputClass: "inlineText",
        inputType: "text",
        inputName: "login",
        inputPlaceholder: "ваш логин",
        inputCheckType: "login",
      }),
      passwordInput: new Input({
        textLabel: "пароль",
        inputClass: "inlineText",
        inputType: "password",
        inputName: "password",
        inputPlaceholder: "ваш пароль",
        inputCheckType: "password",
      }),
      submitBtn: new SubmitButton({ text: "войти" }),
    });
  }

  render(): string {
    return this.compile(loginTemplate, {});
  }
}
