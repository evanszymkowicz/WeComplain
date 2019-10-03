import React from 'react';
import { Avatar } from 'antd';
import UserProfile from "./userProfile";

class Desk extends React.Component {

  constructor(props) {
    super(props);
    this.position = props.position || [1, 1];

    if (this.props.horizontal) {
      this.tableWidth = 2;
      this.tableHeight = 4;
    } else {
      this.tableWidth = 4;
      this.tableHeight = 2;
    }

    this.style = {
      'gridColumn': `${this.position[0]} / span ${this.tableHeight}`,
      'gridRow': `${this.position[1]} / span ${this.tableWidth}`,
    };

    this.state = {
      isModalVisible: false,
      currentEmployee: null
    };
  }

  render() {
    const employees = this.props.employees;
    const employeesImage = employees.map(employee => {
      if (employee === undefined) {
        return [];
      }

      return <Avatar
        key={`avatar_${employee.id}`}
        onClick={() => this.showModal(employee)}
        src={employee.photoUrl} />
    });

    const className = ['desk'];
    if (this.props.markedDesks.includes(this.props.id)) {
      className.push('highlighted');
    }

    return <div className={className.join(' ')} id={`desk-${this.props.id}`} style={this.style} >
      <div className="clickable">{employeesImage}</div>
      <AvartarModal employee={this.state.currentEmployee}
        isModalVisible={this.state.isModalVisible}
        handleOk={this.handleOk}
        handleCancel={this.handleCancel}
      />
    </div>;
  }

  showModal = (em) => {
    this.setState({
      currentEmployee: em,
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

export default Desk;
