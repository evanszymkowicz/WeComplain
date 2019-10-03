import React from "react"

function Stairs(props) {
	const numberOfStairs = 13
	const stairs = []

	for (let index = 0; index < numberOfStairs; index++) {
		stairs.push(<div key={`stair_${index}`}
			className={(props.inverted) ? "step inverted" : "step"} />)
	}

	return <div className="stairs clickable" onClick={props.onClick}>
		{stairs}
	</div>
}

export default Stairs
