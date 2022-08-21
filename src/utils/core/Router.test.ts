import {expect} from "chai"
import {Router} from "./Router";
import {SignInPage} from "../../pages/sing-in/login";
import {ErrorPage} from "../../pages/errors/error";
import '@types/mocha'


describe("Router", () => {
    console.log("testing router")
    const router = new Router();
    router
        .use("/sign-in", SignInPage)
        .use("/error", ErrorPage)
        .start()


    it("Check adding", () => {
        router.go("/sign-in");
        router.go("/error");
        expect(router.history?.length).to.eq(2);
    })

    it("Check current route", () => {
        router.go("/sign-in");
        expect(router.currentRoute?.pathname).to.eq("/sign-in")
    })

    it("Check router.back", () => {
        router.go("/error");
        router.go("/sign-in");
        router.back();
        expect(router.currentRoute?.pathname).to.eq("/error")
    })

})

