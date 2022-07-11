import EventBus from "./event-bus"
import {ProxyProps} from "./proxyProps";

const pug = require('pug');

enum EVENTS {
    INIT = "init",
    FLOW_CDM = "flow:component-did-mount",
    FLOW_CDU = "flow:component-did-update",
    FLOW_RENDER = "flow:render"
}

export default class Element {

    protected _element;
    protected _meta;
    private eventBus;
    protected props;
    children;

    constructor(tagName: string = "div", propsAndChildren: object = {}) {
        const { children, props } = this._getChildren(propsAndChildren);

        this.children = children;

        this._meta = {
            tagName,
            props
        }

        this.props = ProxyProps(props)
        const eventBus = new EventBus();
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(EVENTS.INIT);
    }

    _registerEvents(eventBus) {
        eventBus.on(EVENTS.INIT, this.init.bind(this));
        eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _createResources() {
        const {tagName} = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    init() {
        this._createResources();
        this.eventBus().emit(EVENTS.FLOW_CDM);
    }

    _componentDidMount() {
        this.componentDidMount();
        this.eventBus().emit(EVENTS.FLOW_RENDER);
    }

    componentDidMount(oldProps: object = {}) {
    }

    dispatchComponentDidMount() {
        this.eventBus().emit(EVENTS.FLOW_CDM);
    }

    _componentDidUpdate(oldProps, newProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }

    componentDidUpdate(oldProps, newProps) {
        return true;
    }

    setProps = nextProps => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
        this.eventBus().emit(EVENTS.FLOW_CDU, this.props)
    };

    get element() {
        return this._element;
    }

    _render() {
        console.log(this.render());
        this._element.innerHTML = this.render();
    }

    render() {
    }

    getContent() {
        return this.element;
    }

    _createDocumentElement(tagName) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }

    show() {
        this.getContent().style.display = "block";
    }

    hide() {
        this.getContent().style.display = "none";
    }

    _getChildren(propsAndChildren) {
        const children = {};
        const props = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Element) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { children, props };
    }

    compile(template, props) {
        const propsAndStubs = { ...props };

        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = pug.render("div(data-id='123')")
        });

        return pug.render(template, propsAndStubs);
    }

}