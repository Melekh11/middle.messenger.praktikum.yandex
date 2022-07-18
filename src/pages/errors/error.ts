import "./error.less"
// @ts-ignore
import errorTemplate from "./error.pug"
import Block from "../../utils/core/Block";
import ButtonBack from "../../components/button-back/button-back"


export default class ErrorPage extends Block{
    constructor(props) {
        let errorName;
        if (props.errorNumber === 404){
            errorName = "Ошибка 404";
        } else {
            errorName = "Ошибка 505";
        }
        super("div", {...props, errorName: errorName, buttonBack: new ButtonBack({})})
    }

    render() {
        return this.compile(errorTemplate, {
            errorName: this.props.errorName
        });
    }
}