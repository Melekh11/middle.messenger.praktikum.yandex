import "./change-profile.less";
import changeProfTemplate from "./change-profile.pug";
import {TProps} from "../../utils/core/Block";
import Block from "../../utils/core/Block";
import Input from "../../components/input/input";
import SubmitButton from "../../components/submit-button/submit-button";
import ButtonBack from "../../components/button-back/button-back";
import avatar from "../../static/img/ava.png";

function fastInputInit(textLabel: string, inputName: string, inputCheckType: string) {
  return new Input({
    textLabel: textLabel,
    inputClass: "inlineText",
    inputType: "text",
    inputName: inputName,
    inputCheckType: inputCheckType,
  });
}

export default class ChangeProfilePage extends Block {
  constructor(props: TProps) {
    super("div", {
      ...props,
      btnBack: new ButtonBack({}),
      inputFirstName: fastInputInit("короткое имя", "first_name", "name"),
      inputSecondName: fastInputInit("полное имя", "second_name", "name"),
      inputLogin: fastInputInit("логин", "login", "login"),
      inputEmail: fastInputInit("почта", "email", "email"),
      inputPhone: fastInputInit("телефон", "phone", "phone"),
      sbmButtonData: new SubmitButton({ text: "внести изменения" }),
      sbmButtonImage: new SubmitButton({ text: "сохранить аватар" }),
      urlIm: avatar,
    });
  }

  render() {
    return super.compile(changeProfTemplate, { urlAva: this.props.urlIm });
  }
}
