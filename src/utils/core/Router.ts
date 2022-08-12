import { Route } from "./Route";
import { TProps } from "./Block";
import { store } from "./Store";
import { routs } from "../../index";

export class Router {
  private static __instance: Router;
  private routes: Route[] | undefined;
  private history: History | undefined;
  private _currentRoute: Route | null | undefined;

  constructor() {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    Router.__instance = this;
  }

  use(pathname: string, block: any, props?: TProps) {
    console.log("create route", pathname);
    const route = new Route(pathname, block, { ...props, rootQuery: "#root" });
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

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
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
