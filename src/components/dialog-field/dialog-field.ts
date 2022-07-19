import Block from "../../utils/core/Block";
import Input from "../input/input";
import "./dialog-field.less";
// @ts-ignore
import dialogTemplate from "./dialog-field.pug";

export default class DialogField extends Block {
  constructor(props) {
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
