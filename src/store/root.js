import { runInAction} from "mobx"
import EmployeeStore from "./employeeStore"
import DesksStore from "./deskStore"

export default class Root {
    constructor(initState={}) {

        const defaultState = {
            employeesState: {
                employeeList: []
            },
            desksState: {
                deskList: []
            }
        };

        initState = Object.assign({}, defaultState, initState);
        this.employeeStore = new EmployeeStore(initState.employeesState);
        this.desksStore = new DeskStore(initState.desksState);
    }

    init = () => {
        Promise.all([this.employeeStore.fetchEmployees(),this.desksStore.fetchDesks()])
            .then((res) => {
                runInAction(() => {
                    this.employeeStore.setEmployeeList(res[0]);
                    this.desksStore.setDeskList(res[1]);
                });
            });
    }
}
