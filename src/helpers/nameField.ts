export default function isValidName(value: string) {
    if (value === "") {
        return {error: true, errorText: "поле не должно быть пустое!"};
    }
    const regExp = /[A-ZА-Я][a-zа-я\-]+/;
    if (/[0-9]/.test(value)){
        return {error: true, errorText: "не должно быть цифр"};
    } else if (/[[:punct:]^\-]/.test(value)){
        return {error: true, errorText: "не должно быть спец символов"};
    }
    if (/[^a-zA-Zа-яА-Я\-]+/.test(value)){
        return {error: true, errorText: "должны быть только буквы"};
    }
    const ans = regExp.exec(value);
    if (!ans) {
        return {error: true, errorText: "первая буква должна быть заглавной, остальное - нет"}
    }
    if (ans[0] !== value) {
        return {error: true, errorText: "первая буква должна быть заглавной, остальное - нет"}
    } else {
        return {error: false, errorText: ""};
    }
}
