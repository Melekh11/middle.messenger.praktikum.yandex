import {BaseApi} from "./base-api";

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


const authApi = new AuthAPI();
export {authApi, ISingIn, ISingUp}
