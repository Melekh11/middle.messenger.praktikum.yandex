import { render } from "./render";
import { TProps } from "./Block";

function isEqual(lo: unknown, ro: unknown): boolean {
  return lo === ro;
}

export class Route {
  public pathname: string;
  private _props: TProps;
  private _block: any;
  private _blockClass: any;

  constructor(pathname: string, view: any, props: TProps) {
    this.pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this.pathname);
  }

  render() {
    if (!this._block) {
      const { rootQuery, ...props } = this._props;
      console.log(props, rootQuery);
      this._block = new this._blockClass(props);
      render(rootQuery, this._block);
      return;
    }
    this._block.show();
    render(this._props.rootQuery, this._block);
  }
}
