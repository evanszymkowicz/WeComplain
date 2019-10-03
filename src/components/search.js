import React, { Component } from "react"
import { Form, Icon, Input } from "antd"

class SearchForm extends Component {
  componentDidMount() {
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSearchSubmit(values);
      }
    });
  }

  render() {
    const {
      getFieldDecorator, getFieldError, isFieldTouched,
    } = this.props.form;

    // Only show error after a field is touched.
    const userNameError = isFieldTouched("search") && getFieldError("search");
    return (
      <Form layout="vertical" onSubmit={this.handleSubmit} onChange={this.handleSubmit}>
        <Form.Item
          validateStatus={userNameError ? "error" : ""}
          help={userNameError || ""}
        >
          {getFieldDecorator("search", {
            rules: [{ required: false, message: "Please input employee name!" }],
          })(
            <Input prefix={<Icon type="search" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="Employee" />
          )}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: "horizontal_login" })(SearchForm);
