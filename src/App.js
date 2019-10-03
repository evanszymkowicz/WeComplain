import React from "react"
import { Provider } from "mobx-react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import FloorPlanLevel2 from "./Components/floor-plan/FloorPlanLevel2"
import FloorPlanLevel1 from "./Components/floor-plan/FloorPlanLevel1"
import ApiExample from "./Components/ApiExample"
import Main from "./Main"
import RootStore from "./Stores/RootStore"
import "./App.css"
import DashboardLayout from "./Components/DashboardLayout"

const rootStore = new RootStore()

function App() {
	return (
		<Provider {...rootStore}>
			<DashboardLayout>
				<Router>
					<div>
						<Route exact path="/" component={Main} />
						<Route path="/level1" component={FloorPlanLevel1} />
						<Route path="/level2" component={FloorPlanLevel2} />
						<Route path="/api" component={Api} />
					</div>
				</Router>
			</DashboardLayout>
		</Provider>
	)
}

export default App
