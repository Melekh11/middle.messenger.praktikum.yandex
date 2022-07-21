import Block from "../../utils/core/Block";
import Input from "../input/input";
import "./dialog-field.less";
import dialogTemplate from "./dialog-field.pug";
import {TProps} from "../../utils/core/Block";

export default class DialogField extends Block {
  constructor(props: TProps) {
    super("div", {
      ...props,
      dialogChosen: props.dialogChosen,
      inputMessage: new Input({
        inputClass: "index-input-message",
        inputType: "text",
        inputName: "message",
        inputCheckType: "chat",
      }),
    });
  }

  render() {
    return this.compile(dialogTemplate, this.props);
  }
}
