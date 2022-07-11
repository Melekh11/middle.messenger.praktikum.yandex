import {ProxyProps} from "./proxyProps";

(function () {
    class Tooltip {

        public readonly el: HTMLElement;
        protected  listeners;

        readonly _cssClassName = "tooltip";
        readonly _indent: number = 5;

        constructor() {
            this.el = document.createElement('div');
            this.el.style.position = "absolute";
            this.el.classList.add(this.name)
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

        onShow = (event) => {
            const sourceEl = event.target;
            this.el.innerHTML = sourceEl.getAttribute('data-tooltip');
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
        }

        onHide() {
            this.el.classList.remove(`${this.name}_active`);
        }

        delegate(eventName, element, cssSelector, callback){
            const fn = event => {
                if (!event.target.matches(cssSelector)) {
                    return;
                }
                callback(event);
            };

            element.addEventListener(eventName, fn);
            this.listeners.push({ fn, element, eventName });
            return this;
        }

        attach(root) {
            this
                .delegate('mouseover', root, '[data-tooltip]', this.onShow)
                .delegate('mouseout', root, '[data-tooltip]', this.onHide);

        }

        detach() {
            for (const {fn, element, eventName} of this.listeners) {
                element.removeEventListener(eventName, fn);
            }

            this.listeners = [];
        }
    }

    // @ts-ignore
    window.Tooltip = ProxyProps(Tooltip);

})();

// @ts-ignore
const tooltip = new Tooltip();
tooltip.attach(document.body);