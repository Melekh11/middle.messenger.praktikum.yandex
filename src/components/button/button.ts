import btnTemplate from "./button.pug";
import Block from "../../utils/core/Block";
import {TProps} from "../../utils/core/Block"


export default class Button extends Block {
    constructor(props: TProps) {
        super("div", props);
    }

    render() {
        return this.compile(btnTemplate, {className: this.props.className, btnText: this.props.btnText});
    }
}
