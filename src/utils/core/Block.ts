import EventBus from "./EventBus";
import ProxyProps from "./ProxyProps";
import {v4 as makeUUID} from "uuid";
import {compile} from "pug";

interface IChildren {
    [key: string]: Block;
}

export type TProps = Record<string, any>;

enum Events {
    INIT = "init",
    FLOW_CDM = "flow:component-did-mount",
    FLOW_CDU = "flow:component-did-update",
    FLOW_RENDER = "flow:render",
}

export default class Block {
    protected _element: HTMLElement | undefined;
    protected _meta;
    protected eventBus: Function;
    public props: TProps;
    protected children: IChildren;
    public id: string | null = null;

    // создаём детей, пропсы, запускаем событие INIT
    constructor(tagName: string = "div", propsAndChildren: TProps = {}) {
        const eventBus = new EventBus();

        const {children, props} = this._getChildren(propsAndChildren);

        this.children = children;

        this._meta = {
            tagName,
            props,
        };

        this.id = makeUUID();
        this.props = ProxyProps({...props, id: this.id});

        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Events.INIT, {});
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Events.INIT, this.init.bind(this));
        eventBus.on(Events.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Events.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Events.FLOW_RENDER, this._render.bind(this));
    }

    // создаём _element и объявляем FLOW_RENDER
    init() {
        const {tagName} = this._meta;
        this._element = this._createDocumentElement(tagName) as HTMLElement;
        this.eventBus().emit(Events.FLOW_RENDER);
    }

    // поднимаем себя и всех детей
    _componentDidMount() {
        this.componentDidMount();

        Object.values(this.children).forEach((child) => {
            child.dispatchComponentDidMount();
        });

        this.eventBus().emit(Events.FLOW_RENDER);
    }

    componentDidMount() {
    }

    dispatchComponentDidMount() {
        this.eventBus().emit(Events.FLOW_CDM);
    }

    _componentDidUpdate(oldProps: TProps, newProps: TProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }

    componentDidUpdate(oldProps: TProps, newProps: TProps) {
        return oldProps !== newProps;

    }

    setProps = (nextProps: TProps) => {
        if (!nextProps) {
            return;
        }
        Object.assign(this.props, nextProps);
        this.eventBus().emit(Events.FLOW_CDM, {});
        this.constantsActions();
    };

    constantsActions() {
    }

    get element() {
        return this._element;
    }

    // обновляем события + рендерим элемент заново
    _render() {
        const block = this.render(); // render теперь возвращает DocumentFragment
        this._delEvents();

        const newElement = (block as unknown as HTMLElement).firstElementChild;
        if (!newElement) {
            return;
        }
        this.getContent().replaceWith(newElement);
        (this._element as Element) = newElement;
        this._addEvents();
    }

    // переопределить у детей
    render() {
        return "";
    }

    getContent() {
        return this.element as HTMLElement;
    }

    _createDocumentElement(tagName: string) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        const element = document.createElement(tagName);
        if (this.props["withInternalID"] === true) {
            if (!this.id) {
                return;
            }
            element.setAttribute("data-id", this.id);
        }
        return element;
    }

    show(): void {
        this.getContent().style.display = "flex"; // block по умолчанию
    }

    hide(): void {
        this.getContent().style.display = "none";
    }

    // работа с событиями
    _addEvents() {
        const {events = {}} = this.props;

        Object.keys(events).forEach((eventName) => {
            this.getContent().addEventListener(eventName, events[eventName]);
        });
    }

    _delEvents() {
        const {events = {}} = this.props;

        Object.keys(events).forEach((eventName) => {
            this.getContent().removeEventListener(eventName, events[eventName]);
        });
    }

    _getChildren(propsAndChildren: TProps) {
        const children: Record<string, any> = {};
        const props: Record<string, any> = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return {children, props};
    }

    compile(template: string, props: TProps) {

        const propsAndStubs = {...props};

        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = compile(`div(data-id="${child.id}")`)();
        });

        const fragment = this._createDocumentElement("template");

        if (!fragment) {
            console.log("return with nothing")
            return;
        }
        fragment.innerHTML = compile(template)(propsAndStubs);

        Object.values(this.children).forEach((child) => {
            const stub = (fragment as any).content.querySelector(`[data-id="${child.id}"]`);

            stub.replaceWith(child.getContent());
        });
        return (fragment as any).content;
    }
}
