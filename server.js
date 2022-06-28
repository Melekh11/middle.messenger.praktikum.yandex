const path = require("path");
const express = require("express");

const PORT = 3000;
const app = express();

app.use(express.static(path.join(__dirname, "dist")));

app.get("/", function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).sendFile(__dirname + 'index.html')
    // но почему-то не проходит один из тестов программы, помогите пожалуйста :(

    // а ещё не все страницы переносятся в дист, переносятся только те, на которые есть
    // прямые ссылки их index.html, а все остальные отмирают, даже если на них окольными путями через
    // другие страницы но можно переходить, из-за этого и netlify и npm run start работают криво, тк
    // берут данные из dist, который помимо того что не содержит в себе нужную информацию, так ещё и ко всем
    // ссылкам добавляет лишний слеш который иногда ломает подключение к css :((((

    // помогите  :(((
});

app.listen(PORT, () => console.log(`App is ready on port ${PORT}`));