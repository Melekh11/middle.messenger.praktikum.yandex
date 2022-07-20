import "./input.less";
// @ts-ignore
import inputTemplate from "./input.pug";
import Block from "../../utils/core/Block";
// @ts-ignore
import { v4 as makeUUID } from "uuid";
import checkError from "../../helpers/handlerError";
import {TProps} from "../../utils/core/Block";

export default class Input extends Block {
  public isError: boolean;

  constructor(props: TProps) {
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
        // @ts-ignore
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
}
