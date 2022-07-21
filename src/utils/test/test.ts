import Block, {TProps} from "../core/Block";
// import { compile } from "pug";
import "./style.less";
import "../../index.less";
// @ts-ignore
import profileTemplate from "./template.pug";
// @ts-ignore
import render from "../../utils/core/render";
// import ErrorPage from "../../pages/errors/error";
import Input from "../../components/input/input";

const input = new Input({
  textLabel: "введите строку",
  inputClass: "inlineText",
  inputType: "text",
  inputName: "str",
  isError: true,
  errorText: "ошибочка!",
  inputPlaceholder: "пишите",
  inputValue: "luyg",
});

render("#root", input);

class UserProfile extends Block {
  constructor(props: TProps) {
    super("div", {
      ...props,
      chatList: ["<div>kfjf</div>", "<div>kfjf</div>", "<div>kfjf</div>"],
    });
  }

  // Создание кнопки лучше вынести в конструктор, чтобы не делать это при каждом рендере

  render() {
    return this.compile(profileTemplate, {
      chatList: this.props.chatList,
    });
  }
}

function render(query: string, block: Block) {
  const root = document.querySelector(query);
  if (!root){
    return
  }
  root.appendChild(block.getContent());
  return root;
}

render("body", new UserProfile({}));
