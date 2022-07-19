import "./change-profile.less";
// @ts-ignore
import changeProfTemplate from "./change-profile.pug";
import Block from "../../utils/core/Block";
import Input from "../../components/input/input";
import SubmitButton from "../../components/submit-button/submit-button";
import ButtonBack from "../../components/button-back/button-back";
// @ts-ignore
import avatar from "../../static/img/ava.png";

function fastInputInit(textLabel, inputName, inputCheckType) {
  return new Input({
    textLabel: textLabel,
    inputClass: "inlineText",
    inputType: "text",
    inputName: inputName,
    inputCheckType: inputCheckType,
  });
}

export default class ChangeProfilePage extends Block {
  constructor(props) {
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
