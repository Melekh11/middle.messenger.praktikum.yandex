import BaseApi from "./base-api";

// import HTTPTransport from "../utils/core/HTTPTransport";

interface ISingUp {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
}

interface ISingIn {
    login: string,
    password: string
}

class AuthAPI extends BaseApi {
    constructor() {
        super({path: "/auth"});
    }

    public singUp(data: ISingUp) {
        return this.post("/signup", {
            data: JSON.stringify(data)
        });
    }

    public signIn(data: ISingIn) {
        return this.post("/signin", {
            data: JSON.stringify(data)
        });
    }

    public logOut() {
        return this.post("/logout");
    }

    public userInfo() {
        return this.get("/user");
    }
}


export default new AuthAPI()
export {ISingIn, ISingUp}
