import Block, {TProps} from "../../utils/core/Block";
import linkTemplate from "./routed-link.pug"
import Router from "../../utils/core/Router";

export default class RoutedLink extends Block {
    constructor(props: TProps) {
        super("div", {
            ...props,
            events: props.events ?? {
                click: () => {new Router().go(props.url);}
            }
        });
        console.log(this.props.events);
    }

    render(){
        return this.compile(linkTemplate, this.props);
    }
}