import React, { Component } from "react"

class Api extends Component {
	constructor() {
		super()
		this.state = {
			response: undefined,
		}
	}

	componentDidMount() {
		let url = ""

		fetch(url)
			.then(response => response.json())
			.then(function (data) {
				console.log(JSON.parse(JSON.stringify(data)))
			})
			.catch(function (error) {
				console.log("Request failed", error)
			})

	}

	render() {
		return (
			<div>
        Api
			</div>
		)
	}
}

export default Api
