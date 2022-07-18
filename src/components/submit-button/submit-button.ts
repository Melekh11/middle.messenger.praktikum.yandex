import Block from "../../utils/core/Block";
import "./submit-button.less"
// @ts-ignore
import btnSubTemplate from "./submit-button.pug"

export default class SubmitButton extends Block {
    constructor(props) {
        super("div", {
            ...props,
            events: {
                click: event => {
                    console.log("!!!");
                    const form = event.target.closest("form");
                    const pAll = form.querySelectorAll(".input-error");
                    for (const p of pAll) {
                        if (p.style.display !== "none") {
                            console.log("не все данные валидны!");
                            return
                        }
                    }
                    const inputAll = form.querySelectorAll(".inlineText");
                    for (const input of inputAll) {
                        console.log(input.value);
                    }
                    // @ts-ignore
                    window.renderPage('profilePage');
                }
            }
        });
    }

    render() {
        return this.compile(btnSubTemplate, {
            textSubBtn: this.props.text
        });
    }
}