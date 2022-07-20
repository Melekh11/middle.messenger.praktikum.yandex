import "./profile.less";
import avatar from "../../static/img/ava.png";
import profileTemplate from "./profile.pug";
import Block from "../../utils/core/Block";
import {TProps} from "../../utils/core/Block";
import Input from "../../components/input/input";
import ButtonBack from "../../components/button-back/button-back";

function shortInputInit(textLabel: string, inputName: string, inputValue: string) {
  return new Input({
    textLabel: textLabel,
    inputClass: "inlineText",
    inputType: "text",
    inputName: inputName,
    inputValue: inputValue,
    isDisabled: true,
  });
}

export default class ProfilePage extends Block {
  constructor(props: TProps) {
    super("div", {
      ...props,
      btnBack: new ButtonBack({}),
      inputLogin: shortInputInit("логин", "login", props.login),
      inputShortName: shortInputInit(
        "короткое имя",
        "shortName",
        props.shortName
      ),
      inputFullName: shortInputInit("полное имя", "fullName", props.fullName),
      inputEmail: shortInputInit("эл почта", "email", props.email),
      inputPhone: shortInputInit("телефон", "phone", props.phone),
      urlIm: avatar,
    });
    console.log(avatar);
  }

  render() {
    return this.compile(profileTemplate, {
      urlIm: this.props.urlIm,
      shortName: this.props.shortName,
      fullName: this.props.fullName,
      login: this.props.login,
    });
  }
}
