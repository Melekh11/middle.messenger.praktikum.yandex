import Element from "../element";
const pug =  require("pug");


const profileTemplate = `
div #{userName}
#{button}`;

class UserProfile extends Element {
    render() {
        return pug.render(profileTemplate, { userName: this.props.userName});
    }
}

class Button extends Element {
    constructor(props) {
        // Создаём враппер дом-элемент button
        super("button", props);
    }

    render() {
        // В проекте должен быть ваш собственный шаблонизатор

        return pug.render("div #{text}", this.props);
    }
}

function render(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
}

const button = new Button({
    text: 'Click me',
});


const profile = new UserProfile("div", {
    button:  new Button({text: "change me!"}),
    userName: 'John Doe',
});

render("body", profile); // npm run build-test покажет что получается криво


// наглядный пример, вместо любого значения на месте #{button} pug для себя найдёт название тега
const profileTemplate1 = `
biv
    p(class="123") #{username}
    #{button}`;


let a = pug.render(profileTemplate1, {className: "123", button: 789});
console.log(a); // <biv> <p class="123"> 456 </p> <789> </789> </biv>

