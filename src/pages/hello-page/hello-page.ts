import Block from "../../utils/core/Block";
import "./hello-page.less";
// @ts-ignore
import helloTemplate from "./hello-page.pug";

export default class HelloPage extends Block {
  constructor(props) {
    super("div", props);
  }
  render() {
    return this.compile(helloTemplate, {});
  }
}
