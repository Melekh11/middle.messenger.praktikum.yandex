let arrayChats = document.querySelectorAll(".inner-user");
let arrayName = document.querySelectorAll(".inner-user .to-user");

let attachCount = 0;

// @ts-ignore
for (let i = 0; i < arrayChats.length; i++) {
    console.log(arrayName[i]);
    arrayChats[i].addEventListener("mouseenter", function () {
        arrayName[i].classList.add("focused-to-user");
        arrayChats[i].classList.add("focused-chat");
        // console.log(chat)
    })

    arrayChats[i].addEventListener("mouseleave", function () {
        console.log("!!!");
        arrayChats[i].classList.remove("focused-chat");
        arrayName[i].classList.remove("focused-to-user");
    })
}

let attach = document.querySelector(".index-attach-btn")
attach.addEventListener("click", function () {
    if (attachCount % 2 === 0) {

    }
})