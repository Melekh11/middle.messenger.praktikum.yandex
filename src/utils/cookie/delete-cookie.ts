import {setCookie} from "./set-cookie";

export function deleteCookie(name: string) {
    setCookie(name, "", {
        'max-age': -1
    })
}
