import "./button-back.less";
// @ts-ignore
import btnBackTemplate from "./button-back.pug";
import Block from "../../utils/core/Block";
import {TProps} from "../../utils/core/Block";

export default class ButtonBack extends Block {
  constructor(props: TProps) {
    super("div", props);
  }

  render() {
    return this.compile(btnBackTemplate, {});
  }
}
