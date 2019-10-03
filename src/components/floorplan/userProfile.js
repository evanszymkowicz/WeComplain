import React from "react"
import { Modal } from "antd"

class UserProfile extends React.Component {

	render() {
		const employee = this.props.employee
		return employee ? <Modal
			title={employee.displayName}
			visible={this.props.isModalVisible}
			onOk={this.props.handleOk}
			onCancel={this.props.handleCancel}
			footer={null}
		>
			<div className="modal-grid">
				<div className="headshot">
					<img src={employee.photoUrl} alt=""></img>
				</div>
				<div className="details">
					{
						employee.preferredName && <p> <span className = "bold" > Preffered Name: </span> {employee.preferredName}</p>
					}
					<p><span className="bold">Title: </span>{employee.jobTitle}</p>
					<p><span className="bold">Department: </span>{employee.department}</p>
					<p><span className="bold">Email: </span>{employee.workEmail}</p>
					<p><span className="bold">Phone: </span>{employee.mobilePhone}</p>
				</div>
			</div>

		</Modal> : null
	}
}

export default UserProfile
