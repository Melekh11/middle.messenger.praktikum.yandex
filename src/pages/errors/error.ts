import "./error.less";
import {template as errorTemplate} from "./error.template";
import { Block } from "../../utils/core/Block";
import { ButtonBack } from "../../components/button-back/button-back";

type ErrorProps = {
  errorNumber: number;
  errorName: string;
  buttonBack: ButtonBack;
};

export class ErrorPage extends Block<ErrorProps> {
  constructor(props: ErrorProps) {
    let errorName;
    if (props.errorNumber === 404) {
      errorName = "Ошибка 404";
    } else {
      errorName = "Ошибка 505";
    }
    super("div", {
      ...props,
      errorName: errorName,
      buttonBack: new ButtonBack(),
    });
  }

  render() {
    return this.compile(errorTemplate, {
      errorName: this.props.errorName,
    });
  }
}
