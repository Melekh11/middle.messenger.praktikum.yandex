import Block from "../../utils/core/Block";
import {TProps} from "../../utils/core/Block";
import "./link-hello-page.less";
import linkTemplate from "./link-hello-page.pug";
import {MyRouter} from "../../index"

export default class LinkHelloPage extends Block {
    constructor(props: TProps) {
        super("div", {
            ...props,
            events: {
                click: function () {MyRouter.go(props.urlLink)}
            }
        });
    }

    render() {
        return this.compile(linkTemplate, {textLink: this.props.textLink});
    }

}
