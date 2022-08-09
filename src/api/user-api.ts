import BaseApi from "./base-api";

interface IUserData {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
}

interface IChangePassword {
    newPassword: string,
    oldPassword: string
}

interface IChangeData{
    "first_name": string,
    "second_name": string,
    "display_name": string | null,
    "login": string,
    "email": string,
    "phone": string
}


class UserApi extends BaseApi {
    constructor() {
        super({path: "/user"});
    }

    public changeProfile(data: IChangeData) {
        return this.put("/profile", {
            data: JSON.stringify(data)
        });
    }

    public changeAva(data: FormData) {
        console.log(data);
        return this.put("/profile/avatar", {
            headers: {},
            data: data
        })
    }

    public changePassword(data: IChangePassword){
        return this.put("/password", {
            data: JSON.stringify(data)
        });
    }

    public getByLogin(login: string){
        return this.post(`/search`, {
            data: JSON.stringify({login: login})
        });
    }
}

export default new UserApi();
export {IUserData, IChangePassword, IChangeData}
