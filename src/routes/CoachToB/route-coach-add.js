import React, { Component } from 'react';
import { Form, Select, Modal, Input, Col } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;

class RouteCoachAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      modalVisible: nextProps.modalVisible,
    });
  }

  handleSubmit = () => {};
  okHandle = () => {};

  render() {
    const { getFieldDecorator } = this.props.form;
    const { modalVisible } = this.state;
    const { width, onChangeVisible } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <Modal
        title="添加/编辑教练"
        maskClosable={false}
        width={width || 620}
        visible={modalVisible}
        onOk={this.okHandle}
        onCancel={() => onChangeVisible(false)}
      >
        <FormItem {...formItemLayout} label="教练名">
          {getFieldDecorator('coachName', {
            rules: [
              {
                required: true,
                message: '请输入名称！',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="电话">
          {getFieldDecorator('phoneNumber', {
            rules: [
              {
                required: true,
                message: '请输入电话号码！',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="地区">
          <Col span={8}>
            <FormItem>
              {getFieldDecorator('province')(
                <Select
                  showSearch
                  style={{ width: 100 }}
                  placeholder="省份"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="1">北京市</Option>
                  <Option value="2">河北省</Option>
                  <Option value="3">河南省</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={16}>
            <FormItem>
              {getFieldDecorator('city')(
                <Select
                  showSearch
                  style={{ width: 100 }}
                  placeholder="市"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="1">北京市</Option>
                  <Option value="2">河北省</Option>
                  <Option value="3">河南省</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </FormItem>
        <FormItem {...formItemLayout} label="所属学校">
          <Col span={8}>
            <FormItem>
              {getFieldDecorator('schoolAddress')(
                <Select
                  showSearch
                  style={{ width: 120 }}
                  placeholder="北京四中"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="1">北京三中</Option>
                  <Option value="2">河北一中</Option>
                  <Option value="3">河南二中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem>
              {getFieldDecorator('school')(
                <Select style={{ width: 120 }} placeholder="学校阶段">
                  <Option value="1">学校-高中</Option>
                  <Option value="2">学校-初中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem>
              {getFieldDecorator('isSigned')(
                <Select style={{ width: 120 }} placeholder="是否签约">
                  <Option value="1">是</Option>
                  <Option value="2">否</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </FormItem>
      </Modal>
    );
  }
}
RouteCoachAdd.defaultProps = {
  modalVisible: false,
};
export default Form.create({
  mapPropsToFields(props) {
    if (!props.data) {
      return {};
    }
    return {
      coachName: Form.createFormField({
        value: props.data.coachName,
      }),
      phoneNumber: Form.createFormField({
        value: props.data.phoneNumber,
      }),
      province: Form.createFormField({
        value: props.data.province,
      }),
      city: Form.createFormField({
        value: props.data.city,
      }),
      schoolAddress: Form.createFormField({
        value: props.data.schoolAddress,
      }),
      school: Form.createFormField({
        value: props.data.school,
      }),
      isSigned: Form.createFormField({
        value: props.data.isSigned,
      }),
    };
  },
})(RouteCoachAdd);
