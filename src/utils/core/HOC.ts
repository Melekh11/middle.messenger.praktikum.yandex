import {TProps} from "./Block";
import {StoreEvents, store} from "./Store";
import {isEqual} from "../../helpers/mydash/isEqual";

function connect(mapStateToProps: (state: TProps) => any){
    return function(Component: any) {
        return class extends Component {
            constructor(props: TProps) {
                let state = mapStateToProps(store.getState());
                // не забываем передать все аргументы конструктора
                super({...props, ...state});

                // подписываемся на событие
                store.on(StoreEvents.Updated, () => {
                    const newState = mapStateToProps(store.getState());
                    if (!isEqual(newState, state)) {
                        // вызываем обновление компонента, передав данные из хранилища
                        this.setProps({...mapStateToProps(store.getState())});
                    }
                    state = newState;
                });
            }
        }
    }
}

export {connect};
