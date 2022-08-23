import { Route } from "./Route";
import { TProps } from "./Block";
import { store } from "./Store";
import { routs } from "../../index";
import { deleteCookie } from "../cookie/delete-cookie";
import { setCookie } from "../cookie/set-cookie";
// import {setCookie} from "../cookie/set-cookie";

export class Router {
  private static __instance: Router;
  private routes: Route[] | undefined;
  public history: History | undefined;
  public currentRoute: Route | null | undefined;

  constructor() {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this.currentRoute = null;
    Router.__instance = this;
  }

  use(pathname: string, block: any, props?: TProps) {
    const route = new Route(pathname, block, { ...props, rootQuery: "body" });
    (this.routes as Route[]).push(route);
    return this;
  }

  start() {
    // Реагируем на изменения в адресной строке и вызываем перерисовку
    window.onpopstate = () => {
      this._onRoute(window.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route: Route | undefined = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this.currentRoute) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    deleteCookie("lastRoute");
    setCookie("lastRoute", pathname);
    if (
      store.getState().user ||
      pathname === routs.signUpPage ||
      pathname === routs.errorPage
    ) {
      (this.history as History).pushState({}, "", pathname);
      this._onRoute(pathname);
    } else {
      (this.history as History).pushState({}, "", routs.signInPage);
      this._onRoute(routs.signInPage);
    }
  }

  back() {
    this.history?.back();
  }

  forward() {
    this.history?.forward();
  }

  getRoute(pathname: string) {
    return (this.routes as Route[]).find((route) => route.match(pathname));
  }
}
