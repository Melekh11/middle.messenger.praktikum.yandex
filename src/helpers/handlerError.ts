import isValidName from "./nameField";
import isValidLogin from "./loginField";
import isValidEmail from "./emailField";
import isValidPhone from "./phoneField";
import isValidPassword from "./passwordField";

export default function checkError(
    val: string,
    typeInput: string
) {
    switch (typeInput) {
        case "name": {
            return isValidName(val);
        }
        case "login": {
            return isValidLogin(val);
        }
        case "email": {
            return isValidEmail(val);
        }
        case "phone": {
            return isValidPhone(val);
        }
        case "password": {
            return isValidPassword(val);
        }
        case "chat": {
            if (!val) {
                return {error: true, errorText: "пустое поле"};
            } else return {error: false, errorText: ""};
        } default: {
            return {error: false, errorText: ""};
        }
    }

}

