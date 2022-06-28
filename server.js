const path = require("path");
const express = require("express");

const PORT = 3000;
const app = express();

app.use(express.static(path.join(__dirname, "dist")));

app.get("/", function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).sendFile(__dirname + 'index.html')
    // но почему-то не проходит один из тестов программы, помогите пожалуйста :(
});

app.listen(PORT, () => console.log(`App is ready on port ${PORT}`));