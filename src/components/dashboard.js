import * as React from "react"
import { inject } from "mobx-react"

const { children } = this.props

class Dashboard extends React.Component {
	render() {
		return (
			<div className="page page-dashboard">
				{this.props.children}
			</div>
		)
	}

	componentDidMount() {
		this.props.rootStore.init()
	}
}

export default inject(rootStore => {
	return {rootStore: rootStore}
})(Dashboard)
