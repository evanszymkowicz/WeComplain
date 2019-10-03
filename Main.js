import React, { Component } from "react"
import Floor1 from "./Components/floor-plan/FloorPlanLevel1"
import Floor2 from "./Components/floor-plan/FloorPlanLevel2"
import SearchForm from "./Components/SearchForm"
import EmployeeList from "./Components/EmployeeList"
import "antd/dist/antd.css"
import {inject, observer} from "mobx-react"

class Main extends Component {
	constructor() {
		super()
		this.state = {
			tab: "floor1",
			searchValue: undefined,
			markedDesks: [],
			filteredEmployees: [],
		}

		this.onTabClick = this.onTabClick.bind(this)
		this.onSearchSubmit = this.onSearchSubmit.bind(this)
	}

	onTabClick(floor) {
		this.setState({tab: floor})
	}

	onSearchSubmit(values) {
		if(values.search === undefined || values.search === "") {
			this.setState({
				filteredEmployees: this.props.employees,
				markedDesks: [],
			})
			return
		}

		const matchedEmployees = []
		const markedDesks = []
		const markedFloors = []

		this.props.employees.forEach(employee => {
			const nameMatching = `${employee.firstName} ${employee.lastName} ${employee.preferredName}`.toLowerCase().includes(values.search.toLowerCase())
			const emailMatching = employee.workEmail && employee.workEmail.toLowerCase().includes(values.search.toLowerCase())

			if(nameMatching || emailMatching) {
				matchedEmployees.push(employee)
				if(this.props.deskEmployeeIdKeyMap[employee.id] && this.props.deskEmployeeIdKeyMap[employee.id].deskId) {
					markedDesks.push(this.props.deskEmployeeIdKeyMap[employee.id].deskId)

					if(!markedFloors.includes(this.props.deskEmployeeIdKeyMap[employee.id].floorLevel)) {
						markedFloors.push(this.props.deskEmployeeIdKeyMap[employee.id].floorLevel)
					}
				}
			}
		})

		let newState = {
			filteredEmployees: matchedEmployees,
			markedDesks,
			searchValue: values.search,
		}

		if(markedFloors.length === 1) {
			let newFloor = "floor2"

			if(markedFloors[0] === 0) {
				newFloor = "floor1"
			}

			newState.tab = newFloor
		}

		this.setState(newState)
	}

	render() {
		return (
			<div className="main-screen">
				<div className="search-bar">
					<SearchForm onSearchSubmit={this.onSearchSubmit} />
					<EmployeeList searchValue={this.state.searchValue}
						filteredEmployees={this.state.filteredEmployees} />
				</div>
				<div className="tabs">
					<span
						className={this.state.tab === "floor1" ? "tab highlighted" : "tab"}
						onClick={() => this.onTabClick("floor1")}>Ground Floor</span>
					<span
						className={this.state.tab === "floor2" ? "tab highlighted" : "tab"}
						onClick={() => this.onTabClick("floor2")}>1st Floor</span>
				</div>
				<div className={this.state.tab === "floor1" ? "floor-1" : "floor-1 hidden"}><Floor1 onFloorChangeClick={() => this.onTabClick("floor2")} markedDesks={this.state.markedDesks} /></div>
				<div className={this.state.tab === "floor2" ? "floor-2" : "floor-2 hidden"}><Floor2 onFloorChangeClick={() => this.onTabClick("floor1")} markedDesks={this.state.markedDesks} /></div>
			</div>
		)}
}

export default inject(rootStore => {
	return {
		employees: rootStore.employeeStore.employeeList,
		deskEmployeeIdKeyMap: rootStore.desksStore.deskEmployeeIdKeyMap,
	}
})(observer(Main))
