const path = require("path");
const express = require("express");

const PORT = 3000;
const app = express();

app.use(express.static(path.join(__dirname, "dist")));

app.get("/", function (req, res) {

    // сделал всё что было посоветовано, однако тест с роутингом всё равно не проходит, помогите :((

    // куратор написал, мол, на http://localhost:3000 после npm run start должен быть index.html
    // он есть, но только если до этого запустить npm run build (а папка dist в гит игноре по правилам)

    // :((((((((((((

    res.status(200).sendFile(path.resolve(__dirname, "./index.html"));
});

app.listen(PORT, () => console.log(`App is ready on port ${PORT}`));