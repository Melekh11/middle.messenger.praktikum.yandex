import Block from "../../utils/core/Block";
import {TProps} from "../../utils/core/Block";
import "./hello-page.less";
import helloTemplate from "./hello-page.pug";


export default class HelloPage extends Block {
  constructor(props: TProps) {
    super("div", props);
  }
  render() {
    return this.compile(helloTemplate, {});
  }
}
