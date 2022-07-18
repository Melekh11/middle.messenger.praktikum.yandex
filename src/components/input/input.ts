import "./input.less"
// @ts-ignore
import inputTemplate from "./input.pug"
import Block from "../../utils/core/Block";
import {v4 as makeUUID} from 'uuid';
import checkError from "../../helpers/handlerError";

export default class Input extends Block {
    public isError;

    constructor(props) {
        super("div", {
            ...props,
            idInput: makeUUID(),
            // events: {
            // input: event => {
            //     this.props.inputValue = this.getContent().querySelector("input").value; // сохраняем значение
            // },
            // focusin: event => {
            //     if (event.target.tagName !== "INPUT"){
            //         return;
            //     }
            //     this.setProps({isError: false, isAutofocus: true}); // убрать ошибку и наводить автоматически
            //     event.target.autofocus = true; // даже так попробуем...
            // },
            // focusout: event => {
            //     event.target.autofocus = false; // убрать автофокус
            //     this.setProps({isAutofocus: false}) // и вот так
            //     let {error, textError} = this.checkData(
            //         this.getContent().querySelector("input").value,
            //         "simple string"
            //     )
            //     if (error) {
            //         this.setProps({ // проверяем есть ли ошибка
            //             isError: true,
            //             errorText: textError,
            //         })
            //     }
            // }
            // }
        })
        {

            this._element.querySelector("input").addEventListener("focus", () => {
                const p = this._element.querySelector("p");
                p.style.display = "none";
            })
            console.log("created listener on input", this._element.querySelector("input"));
            this._element.querySelector("input").addEventListener("blur", () => {
                console.log("value:", this.getContent().querySelector("input").value);
                let {error, errorText} = checkError(
                    this.getContent().querySelector("input").value,
                    this.props.inputCheckType
                )
                if (error) {
                    this.isError = true;
                    const p = this._element.querySelector("p");
                    // @ts-ignore
                    p.style.display = "block"
                    // @ts-ignore
                    p.innerText = errorText;
                }
            })
        }
    }

    render() {
        return this.compile(inputTemplate, {
            ...this.props,  // все в input.pug
            idInput: this.id,
        });
    }

    constantsActions = () => {
        this._element.querySelector("input").addEventListener("focus", (event) => {
            console.log(101);
            this.setProps({isError: false});
            event.target.focus();
        })
    }

}