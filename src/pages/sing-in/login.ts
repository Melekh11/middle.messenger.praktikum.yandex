import { Block } from "../../utils/core/Block";
import { ButtonBack } from "../../components/button-back/button-back";
import { Input } from "../../components/input/input";
import { SubmitButton } from "../../components/submit-button/submit-button";
import "./login.less";
import { template as loginTemplate } from "./login.template";
import { authController } from "../../controllers/auth-controller";
import { Button } from "../../components/button/button";
import { MyRouter, routs } from "../../index";

type SignInProps = {
  buttonBack: ButtonBack;
  loginInput: Input;
  passwordInput: Input;
  submitBtn: SubmitButton;
  createAc: Button;
};

class SignInPage extends Block<SignInProps> {
  constructor() {
    super("div", {
      buttonBack: new ButtonBack(),
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
      submitBtn: new SubmitButton({
        text: "войти",
        events: {
          click: (event: Event) => {
            event.preventDefault();
            const target = event.target as HTMLElement;
            const form = target.closest("form");
            if (!form) {
              return;
            }
            const pInTemplate: NodeListOf<HTMLParagraphElement> =
              form.querySelectorAll(".input-error");
            for (const p of pInTemplate) {
              if (p.style.display !== "none") {
                console.log("не все данные валидны!");
                return;
              }
            }
            const inputsInTemplate: NodeListOf<HTMLInputElement> =
              form.querySelectorAll(".inlineText");
            for (const input of inputsInTemplate) {
              console.log(input.value);
            }
            authController.signIn({
              login: (form.querySelector('[name="login"]') as HTMLInputElement)
                ?.value,
              password: (
                form.querySelector('[name="password"]') as HTMLInputElement
              )?.value,
            });
          },
        },
      }),
      createAc: new Button({
        className: "base-btn secundus",
        btnText: "Sign up",
        events: {
          click: () => {
            MyRouter.go(routs.signUpPage);
          },
        },
      }),
    });
  }

  render(): string {
    return this.compile(loginTemplate, {});
  }
}

export { SignInPage };
