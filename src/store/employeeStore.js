import {fetchEmployees as fetchE} from "../data/fetcher";
import { decorate, observable, computed, runInAction} from "mobx";

export default class EmployeeStore {
    constructor(initState) {
        this.employeeList = initState.employeeList;
    }

    fetchEmployees = () => {
        return fetchE().then((res) => {
            return res.data;
        });
    };

    setEmployeeList = (data) => {
        runInAction(() => {
            this.employeeList = data;
        })
    };

    get employeesIdKeyMap() {
        const map = {};
        this.employeeList.forEach((employee) => {
           map[employee.id] = employee;
        });

        return map;
    }
}

decorate(EmployeeStore, {
    employeeList: observable,
    employeesIdKeyMap: computed
});
