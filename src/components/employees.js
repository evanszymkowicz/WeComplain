import React, { Component } from 'react';
import { List, Avatar, Badge } from 'antd';
import { inject, observer } from "mobx-react";
import Avartar from "./floor-plan/AvartarModal";

class Employees extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      currentEmployee: null
    };
  }

  render() {
    const employees = (this.props.searchValue === undefined) ? this.props.employees : this.props.filteredEmployees;

    return (
      <span>
        <List
          itemLayout="horizontal"
          dataSource={employees}
          renderItem={employee => {
            const aka = (employee.preferredName === undefined) ? "" : `aka ${employee.preferredName}`;

            return <div className="clickable">
              <List.Item onClick={() => this.showModal(employee)}>
                <List.Item.Meta
                  avatar={<Avatar src={employee.photoUrl} />}
                  title={`${employee.firstName} ${employee.lastName} ${aka}`}
                  description={
                    `${employee.workEmail || ""}`
                  }
                />
                {this.props.deskEmployeeIdKeyMap[employee.id] ? null :
                  (<Badge text={"No Desk"} status={"warning"} />)}
              </List.Item>
              <span />
            </div>
          }}
        />
        <AvartarModal employee={this.state.currentEmployee}
          isModalVisible={this.state.isModalVisible}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
        />
      </span>
    );
  }

  showModal = (employee) => {
    this.setState({
      currentEmployee: employee,
      isModalVisible: true,
    });
  };

  handleOk = (e) => {
    this.setState({
      currentEmployee: null,
      isModalVisible: false,
    });
  };

  handleCancel = (e) => {
    this.setState({
      currentEmployee: null,
      isModalVisible: false,
    });
  };
}

export default inject(rootStore => {
  return {
    employees: rootStore.employeeStore.employeeList,
    deskEmployeeIdKeyMap: rootStore.desksStore.deskEmployeeIdKeyMap,
  }
})(observer(Employees));
