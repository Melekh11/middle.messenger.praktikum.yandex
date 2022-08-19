import "./input.less";
import inputTemplate from "./input.pug";
import { v4 as makeUUID } from "uuid";
import { checkError } from "../../helpers/checkers/handlerError";
import { Block } from "../../utils/core/Block";

type InputProps = {
  inputPlaceholder?: string;
  textLabel?: string;
  idInput?: string;
  inputCheckType: string;
  inputClass: string;
  inputType: string;
  inputName: string;
};

export class Input extends Block<InputProps> {
  public isError: boolean;

  constructor(props: InputProps) {
    super("div", {
      ...props,
      idInput: makeUUID(),
    });
    {
      const el = this._element?.querySelector("input");
      if (!el) {
        return;
      }
      el.addEventListener("focus", () => {
        const errorElement = this._element?.querySelector("p");
        if (!errorElement) {
          return;
        }
        errorElement.style.display = "none";
      });

      el.addEventListener("blur", () => {
        if (!this.getContent()) {
          return;
        }
        const content = this.getContent().querySelector("input");
        if (!content) {
          return;
        }
        let ans: { errorText: string; error: boolean } = checkError(
          content.value,
          this.props.inputCheckType
        );
        const error = ans.error;
        const errorText = ans.errorText;
        if (error) {
          this.isError = true;
          const p = this._element?.querySelector("p");
          if (!p) {
            return;
          }
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
