import "./button-back.less";
import btnBackTemplate from "./button-back.pug";
import Block from "../../utils/core/Block";
import {TProps} from "../../utils/core/Block";
import Router from "../../utils/core/Router";


export default class ButtonBack extends Block {
    constructor(props: TProps) {
        super("div", {
            ...props,
            events: {
                click: () => {new Router().back()}
            }
        });
    }

    render() {
        return this.compile(btnBackTemplate, {});
    }
}
