import template from "./test.pug";
import { compile } from "pug";

const div = document.createElement("div");
div.innerHTML = compile(template)({ testArray: [1, 2, 3] });
document.querySelector("body")?.append(div);
