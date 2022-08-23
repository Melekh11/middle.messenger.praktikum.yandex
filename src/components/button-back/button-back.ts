import "./button-back.less";
import {template as btnBackTemplate} from "./button-back.template";
import { Block } from "../../utils/core/Block";
import { authController } from "../../controllers/auth-controller";
import { MyRouter, routs } from "../../index";

type ButtonBackProps = {
  events: Record<string, any>;
};

export class ButtonBack extends Block<ButtonBackProps> {
  constructor() {
    super("div", {
      events: {
        click: () => {
          authController
            .isLogin()
            .then(() => {
              MyRouter.go(routs.chatsPage);
            })
            .catch(() => {
              MyRouter.go(routs.signInPage);
            });
        },
      },
    });
  }

  render() {
    return this.compile(btnBackTemplate, {});
  }
}
