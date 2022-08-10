import {Block} from "../../utils/core/Block";
import {Input} from "../../components/input/input";
import {ButtonBack} from "../../components/button-back/button-back";
import {SubmitButton} from "../../components/submit-button/submit-button";
import "./sign-up.less";
import singUpTemplate from "./sign-up.pug";
import {authController} from "../../controllers/auth-controller";

function shortInputInit(
    textLabel: string,
    inputName: string,
    inputCheckType: string,
    inputType: string = "text"
): Input {
    return new Input({
        textLabel: textLabel,
        inputClass: "inlineText",
        inputType: inputType,
        inputName: inputName,
        inputCheckType: inputCheckType,
    });
}

type SignUpProps = {
    btnBack: ButtonBack;
    inputFirstName: Input;
    inputSecondName: Input;
    inputLogin: Input;
    inputEmail: Input;
    inputPhone: Input;
    inputPassword: Input;
    submitBtn: SubmitButton;
}

export class SignUpPage extends Block<SignUpProps> {
    constructor() {
        super("div", {
            btnBack: new ButtonBack(),
            inputFirstName: shortInputInit("короткое имя", "first_name", "name"),
            inputSecondName: shortInputInit("полное имя", "second_name", "name"),
            inputLogin: shortInputInit("логин", "login", "login"),
            inputEmail: shortInputInit("почта", "email", "email"),
            inputPhone: shortInputInit("телефон", "phone", "phone"),
            inputPassword: shortInputInit(
                "пароль",
                "password",
                "password",
                "password"
            ),
            submitBtn: new SubmitButton({
                text: "создать",
                events: {
                    click: (event: Event) => {
                        event.preventDefault();
                        const target = event.target as HTMLElement;
                        const form = target.closest("form");
                        if (!form){
                            return;
                        }
                        const pInTemplate: NodeListOf<HTMLParagraphElement> = form.querySelectorAll(".input-error");
                        for (const p of pInTemplate) {
                            if (p.style.display !== "none") {
                                console.log("не все данные валидны!");
                                return;
                            }
                        }
                        const inputsInTemplate: NodeListOf<HTMLInputElement> = form.querySelectorAll(".inlineText");
                        for (const input of inputsInTemplate) {
                            console.log(input.value);
                        }
                        authController.singUp({
                            first_name: (form.querySelector("[name=\"first_name\"]") as HTMLInputElement)?.value,
                            second_name: (form.querySelector("[name=\"second_name\"]") as HTMLInputElement)?.value,
                            login: (form.querySelector("[name=\"login\"]") as HTMLInputElement)?.value,
                            email: (form.querySelector("[name=\"email\"]") as HTMLInputElement)?.value,
                            phone: (form.querySelector("[name=\"phone\"]") as HTMLInputElement)?.value,
                            password: (form.querySelector("[name=\"password\"]") as HTMLInputElement)?.value
                        })
                    }
                }
            })
        });
    }

    render() {
        return this.compile(singUpTemplate, {});
    }
}
