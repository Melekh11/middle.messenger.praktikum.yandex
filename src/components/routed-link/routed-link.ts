import { Block } from "../../utils/core/Block";
import {template as linkTemplate} from "./routed-link.template";
import { Router } from "../../utils/core/Router";

type RoutedLinkProps = {
  events?: Record<string, any>;
  url: string;
  className: string;
  linkText: string;
};

export class RoutedLink extends Block<RoutedLinkProps> {
  constructor(props: RoutedLinkProps) {
    super("div", {
      ...props,
      events: props.events ?? {
        click: () => {
          new Router().go(props.url);
        },
      },
    });
  }

  render() {
    return this.compile(linkTemplate, this.props);
  }
}
