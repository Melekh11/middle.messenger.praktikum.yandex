import Block from "../../utils/core/Block";
import Input from "../../components/input/input";
import ButtonBack from "../../components/button-back/button-back";
import SubmitButton from "../../components/submit-button/submit-button";
import "./sign-up.less"
// @ts-ignore
import singUpTemplate from "./sign-up.pug"

function shortInputInit(textLabel, inputName, inputCheckType, inputType="text"){
    return new Input({
        textLabel: textLabel,
        inputClass: "inlineText",
        inputType: inputType,
        inputName: inputName,
        inputCheckType: inputCheckType
    })
}

export default class SignUpPage extends Block{
    constructor(...props) {
        super("div", {...props,
            btnBack: new ButtonBack({}),
            inputFirstName: shortInputInit("короткое имя", "first_name", "name"),
            inputSecondName: shortInputInit("полное имя", "second_name", "name"),
            inputLogin: shortInputInit("логин", "login", "login"),
            inputEmail: shortInputInit("почта", "email", "email"),
            inputPhone: shortInputInit("телефон", "phone", "phone"),
            inputPassword: shortInputInit("пароль", "password", "password", "password"),
            submitBtn: new SubmitButton({text: "создать"})
        });
    }

    render(){
        return this.compile(singUpTemplate, {});
    }
}