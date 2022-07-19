import EventBus from "./EventBus";
import ProxyProps from "./ProxyProps";
import { v4 as makeUUID } from "uuid";
import { compile } from "pug";

interface IChildren {
  [key: string]: Block;
}

export type TProps = Record<string, any>;

enum EVENTS {
  INIT = "init",
  FLOW_CDM = "flow:component-did-mount",
  FLOW_CDU = "flow:component-did-update",
  FLOW_RENDER = "flow:render",
}

export default abstract class Block {
  protected _element;
  protected _meta;
  protected eventBus: Function;
  protected props: TProps;
  protected children: IChildren;
  public id: string | null = null;

  // создаём детей, пропсы, запускаем событие INIT
  constructor(tagName: string = "div", propsAndChildren: TProps = {}) {
    const eventBus = new EventBus();

    const { children, props } = this._getChildren(propsAndChildren);

    this.children = children;

    this._meta = {
      tagName,
      props,
    };

    this.id = makeUUID();
    this.props = ProxyProps({ ...props, id: this.id });

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

  // создаём _element и объявляем FLOW_RENDER
  init() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
    this.eventBus().emit(EVENTS.FLOW_RENDER);
  }

  // поднимаем себя и всех детей
  _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });

    this.eventBus().emit(EVENTS.FLOW_RENDER);
  }

  componentDidMount(oldProps: object = {}) {}

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

  setProps = (nextProps) => {
    console.log(1);
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
    this.eventBus().emit(EVENTS.FLOW_CDM);
    this.constantsActions();
  };

  constantsActions() {}

  get element() {
    return this._element;
  }

  // обновляем события + рендерим элемент заново
  _render() {
    const block = this.render(); // render теперь возвращает DocumentFragment
    this._delEvents();

    // @ts-ignore
    const newElement = block.firstElementChild as HTMLElement;
    this._element.replaceWith(newElement);
    this._element = newElement;
    this._addEvents();
  }

  // переопределить у детей
  render() {
    return "";
  }

  getContent() {
    return this.element;
  }

  _createDocumentElement(tagName) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    const element = document.createElement(tagName);
    if (this.props["withInternalID"] === true) {
      element.setAttribute("data-id", this.id);
    }
    return element;
  }

  show() {
    this.getContent().style.display = "flex"; // block по умолчанию
  }

  hide() {
    this.getContent().style.display = "none";
  }

  // работа с событиями
  _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  _delEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element.removeEventListener(eventName, events[eventName]);
    });
  }

  _getChildren(propsAndChildren) {
    const children = {};
    const props = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
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
      propsAndStubs[key] = compile(`div(data-id="${child.id}")`)();
    });

    const fragment = this._createDocumentElement("template");

    fragment.innerHTML = compile(template)(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
      stub.replaceWith(child.getContent());
    });
    return fragment.content;
  }
}
