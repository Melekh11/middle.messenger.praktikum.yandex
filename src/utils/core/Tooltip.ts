import ProxyProps from "./ProxyProps";

(function () {
  class Tooltip {
    public readonly el: HTMLElement;
    protected listeners: Record<string, string | HTMLElement | Function>[];

    readonly _cssClassName = "tooltip";
    readonly _indent: number = 5;

    constructor() {
      this.el = document.createElement("div");
      this.el.style.position = "absolute";
      this.el.classList.add(this.name);
      document.body.appendChild(this.el);
      this.onHide = this.onHide.bind(this);

      this.listeners = [];
    }

    get name(): string {
      return this._cssClassName;
    }

    get indent() {
      return this._indent;
    }

    onShow = (event: Event) => {
      const sourceEl = event.target as HTMLElement;
      if (!sourceEl){
        return;
      }
      this.el.innerHTML = sourceEl.getAttribute("data-tooltip") || "";
      this.el.classList.add(`${this.name}_active`);

      const sourceElRect = sourceEl.getBoundingClientRect();
      const elRect = this.el.getBoundingClientRect();

      let top = sourceElRect.bottom + this.indent;
      const left = sourceElRect.left;

      if (top + elRect.height > document.documentElement.clientHeight) {
        top = sourceElRect.top - elRect.height - this.indent;
      }

      this.el.style.top = `${top + window.scrollY}px`;
      this.el.style.left = `${left + window.scrollX}px`;
    };

    onHide() {
      this.el.classList.remove(`${this.name}_active`);
    }

    delegate(eventName: string, element: HTMLElement, cssSelector: string, callback: Function) {
      const fn = (event: Event) => {
        let target = event.target ;
        if (!target){
          return;
        }
        let targetHTML = target as HTMLElement;

        if (!targetHTML.matches(cssSelector)) {
          return;
        }
        callback(event);
      };

      element.addEventListener(eventName, fn);
      this.listeners.push({ fn, element, eventName });
      return this;
    }

    attach(root: HTMLElement) {
      this.delegate("mouseover", root, "[data-tooltip]", this.onShow).delegate(
        "mouseout",
        root,
        "[data-tooltip]",
        this.onHide
      );
    }

    detach() {
      for (const { fn, element, eventName } of this.listeners) {
        (element as HTMLElement).removeEventListener((eventName as keyof HTMLElementEventMap), (fn as EventListenerOrEventListenerObject));
      }

      this.listeners = [];
    }
  }

  window["Tooltip"] = ProxyProps(Tooltip);
  const tooltip = new Tooltip();
  tooltip.attach(document.body);
})();


