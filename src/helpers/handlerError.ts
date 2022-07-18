import isValidName from "./nameField";
import isValidLogin from "./loginField";
import isValidEmail from "./emailField";
import isValidPhone from "./phoneField";
import isValidPassword from "./passwordField";

export default function checkError(val: string, typeInput: string): {error: boolean, errorText: string} {
    if (typeInput === "name") {
        return isValidName(val);
    } else if (typeInput === "login"){
        return isValidLogin(val);
    } else if (typeInput === "email"){
        return isValidEmail(val);
    } else if (typeInput === "phone"){
        return isValidPhone(val);
    } else if (typeInput === "password"){
        return isValidPassword(val);
    } else if (typeInput === "chat") {
        if (val === ""){
            return {error: true, errorText: "пустое поле"}
        } else return {error: false, errorText: ""}
    } return {error: false, errorText: ""};
}