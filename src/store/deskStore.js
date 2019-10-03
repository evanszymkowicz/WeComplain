import {decorate, observable, computed, runInAction} from "mobx";
import {constants} from "../constants/constants";
import {fetchDesks as fetchD} from "../data/fetcher";

class DeskStore {
    constructor(initState) {
        this.deskList = initState.deskList;
    }

    fetchDesks = () => {
        return fetchD().then(res => {
            return res.data;
        });
    };

    setDeskList = (data) => {
        runInAction(() => {
            this.deskList = data;
        })
    }

    get groundFloorList () {
        return this.deskList.filter((desk) => {
            return desk.floorLevel === constants.GROUND_FLOOR;
        });
    };

    get firstFloorList () {
        return this.deskList.filter((desk) => {
            return desk.floorLevel === constants.FIRST_FLOOR;
        });
    };

    get deskEmployeeIdKeyMap() {
        const map = {};
        this.deskList.forEach((desk) => {
            desk.employeeIds.forEach((employeeId) => {
                map[employeeId] = desk;
            });
        });

        return map;
    }
}

decorate(DeskStore, {
    deskList: observable,
    groundFloorList: computed,
    firstFloorList: computed,
    deskEmployeeIdKeyMap: computed,
});


export default DeskStore;
