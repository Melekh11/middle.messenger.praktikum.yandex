import "./input.less";
// @ts-ignore
import inputTemplate from "./input.pug";
import Block from "../../utils/core/Block";
import { v4 as makeUUID } from "uuid";
import checkError from "../../helpers/handlerError";

export default class Input extends Block {
  public isError;

  constructor(props) {
    super("div", {
      ...props,
      idInput: makeUUID(),
    });
    {
      this._element.querySelector("input").addEventListener("focus", () => {
        const p = this._element.querySelector("p");
        p.style.display = "none";
      });
      console.log(
        "created listener on input",
        this._element.querySelector("input")
      );
      this._element.querySelector("input").addEventListener("blur", () => {
        let { error, errorText } = checkError(
          this.getContent().querySelector("input").value,
          this.props.inputCheckType
        );
        if (error) {
          this.isError = true;
          const p = this._element.querySelector("p");
          p.style.display = "block";
          p.innerText = errorText;
        }
      });
    }
  }

  render() {
    return this.compile(inputTemplate, {
      ...this.props, // все в input.pug
      idInput: this.id,
    });
  }

  constantsActions = () => {
    this._element.querySelector("input").addEventListener("focus", (event) => {
      this.setProps({ isError: false });
      event.target.focus();
    });
  };
}
