import "./button-back.less";
import btnBackTemplate from "./button-back.pug";
import { Block } from "../../utils/core/Block";
import { Router } from "../../utils/core/Router";

type ButtonBackProps = {
  events: Record<string, any>;
};

export class ButtonBack extends Block<ButtonBackProps> {
  constructor() {
    super("div", {
      events: {
        click: () => {
          new Router().back();
        },
      },
    });
  }

  render() {
    return this.compile(btnBackTemplate, {});
  }
}
