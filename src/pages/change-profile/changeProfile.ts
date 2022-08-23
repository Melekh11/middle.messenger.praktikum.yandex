import "./change-profile.less";
import {template as changeProfTemplate} from "./change-profile.template";
import { Block } from "../../utils/core/Block";
import { Input } from "../../components/input/input";
import { SubmitButton } from "../../components/submit-button/submit-button";
import { ButtonBack } from "../../components/button-back/button-back";
import { userController } from "../../controllers/user-controller";
import { connect } from "../../utils/core/HOC";
import avatarDefault from "../../static/img/ava.png";

type ChangeProfileProps = {
  avatar: string;
  btnBack: ButtonBack;
  inputFirstName: Input;
  inputSecondName: Input;
  inputLogin: Input;
  inputEmail: Input;
  inputPhone: Input;
  sbmButtonData: SubmitButton;
  sbmButtonImage: SubmitButton;
};

function fastInputInit(
  textLabel: string,
  inputName: string,
  inputCheckType: string
) {
  return new Input({
    textLabel: textLabel,
    inputClass: "inlineText",
    inputType: "text",
    inputName: inputName,
    inputCheckType: inputCheckType,
  });
}

class ChangeProfilePage extends Block<ChangeProfileProps> {
  constructor(props: ChangeProfileProps) {
    super("div", {
      ...props,
      btnBack: new ButtonBack(),
      inputFirstName: fastInputInit("короткое имя", "first_name", "name"),
      inputSecondName: fastInputInit("полное имя", "second_name", "name"),
      inputLogin: fastInputInit("логин", "login", "login"),
      inputEmail: fastInputInit("почта", "email", "email"),
      inputPhone: fastInputInit("телефон", "phone", "phone"),
      sbmButtonData: new SubmitButton({
        text: "внести изменения",
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
            userController.changeProfile({
              first_name: (
                form.querySelector('[name="first_name"]') as HTMLInputElement
              )?.value,
              second_name: (
                form.querySelector('[name="second_name"]') as HTMLInputElement
              )?.value,
              login: (form.querySelector('[name="login"]') as HTMLInputElement)
                ?.value,
              email: (form.querySelector('[name="email"]') as HTMLInputElement)
                ?.value,
              phone: (form.querySelector('[name="phone"]') as HTMLInputElement)
                ?.value,
              display_name: (
                form.querySelector('[name="first_name"]') as HTMLInputElement
              )?.value,
            });
          },
        },
      }),
      sbmButtonImage: new SubmitButton({
        text: "сохранить аватар",
        events: {
          click: (event: Event) => {
            event.preventDefault();
            const formAvatar = document.querySelector(
              ".max-height-form-ava"
            ) as HTMLFormElement;
            const form = new FormData(formAvatar);
            userController.changeAvatar(form);
          },
        },
      }),
    });
  }

  render() {
    return super.compile(changeProfTemplate, { urlAva: this.props.avatar });
  }
}

function mapChangeProfile(store: any) {
  let ava: string;
  if (store.user.avatar) {
    ava = "https://ya-praktikum.tech/api/v2/resources/" + store.user.avatar;
  } else {
    ava = avatarDefault;
  }
  return {
    avatar: ava,
  };
}

const con = connect(mapChangeProfile);
const changeProfile = con(ChangeProfilePage);
export { changeProfile as ChangeProfilePage };
