import "./profile.less";
import avatarDefault from "../../static/img/ava.png";
import profileTemplate from "./profile.pug";
import Block from "../../utils/core/Block";
import {TProps} from "../../utils/core/Block";
import ButtonBack from "../../components/button-back/button-back";
import RoutedLink from "../../components/routed-link/routed-link";
import connect from "../../utils/core/HOC";
import authController from "../../controllers/auth-controller";

class ProfilePage extends Block {
    constructor(props: TProps) {

        super("div", {
            ...props,
            btnBack: new ButtonBack({}),
            changeProfile: new RoutedLink({url: "/settings", className: "blue", linkText: "изменить данные профиля"}),
            changePassword: new RoutedLink({url: "/change-password", className: "blue", linkText: "изменить пароль"}),
            out: new RoutedLink({
                className: "red", linkText: "выйти",
                events: {
                    click: () => {
                        authController.singOut();
                    }
                }
            })
        });
    }

    render() {
        console.log("url avatar:", this.props.avatar);
        return this.compile(profileTemplate, {
            urlIm: this.props.avatar,
            shortName: this.props.shortName,
            fullName: this.props.fullName,
            login: this.props.login,
            phone: this.props.phone,
            email: this.props.email
        });
    }
}


function mapProfile(store: any) {
    let ava: string;
    if (store.user.avatar){
        ava = "https://ya-praktikum.tech/api/v2/resources/" + store.user.avatar;
    } else {
        ava = avatarDefault;
    }
    return {
        fullName: store.user.first_name,
        shortName: store.user.second_name,
        login: store.user.login,
        email: store.user.email,
        phone: store.user.phone,
        avatar: ava
    };
}


const con = connect(mapProfile);
export default con(ProfilePage);
