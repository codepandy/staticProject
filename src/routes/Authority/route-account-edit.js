import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Input, Modal, Checkbox, Select } from 'antd';
import utilStyles from '../../utils/utils.less';

const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

@connect(({ authority, loading }) => ({
  authority,
  loading: loading.models.authority,
}))
class AccountEdit extends Component {
  handleOK = () => {
    const { form, onCancel, dispatch } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'authority/editAcount',
          ...values,
        });
        onCancel();
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { modalTitle, modalVisible, onCancel } = this.props;
    return (
      <Modal
        title={modalTitle}
        visible={modalVisible}
        width={800}
        maskClosable={false}
        onOk={this.handleOK}
        onCancel={() => {
          onCancel();
        }}
      >
        <Form>
          <Row>
            <Col span={8}>
              <FormItem {...formItemLayout} label="用户ID">
                {getFieldDecorator('id')(<Input disabled className={utilStyles.disableInput} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem {...formItemLayout} label="创建时间">
                {getFieldDecorator('createTime')(
                  <Input disabled className={utilStyles.disableInput} />
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem {...formItemLayout} label="最新登录">
                {getFieldDecorator('lastLoginTime')(
                  <Input disabled className={utilStyles.disableInput} />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem {...formItemLayout} label="用户名">
                {getFieldDecorator('name', {
                  rules: [
                    {
                      required: true,
                      message: '请输入用户名',
                    },
                  ],
                })(<Input placeholder="请输入用户名" />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem {...formItemLayout} label="手机号">
                {getFieldDecorator('mobile', {
                  rules: [
                    {
                      required: true,
                      message: '请输入手机号',
                    },
                  ],
                })(<Input placeholder="请输入手机号" />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem {...formItemLayout} label="所属部门">
                {getFieldDecorator('department', {
                  rules: [
                    {
                      required: true,
                      message: '请选择所属部门',
                    },
                  ],
                })(
                  <Select placeholder="所属部门">
                    <Option key="1">产品研发部</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={15}>
              <FormItem
                labelCol={{ sm: { span: 4 } }}
                wrapperCol={{ sm: { span: 20 } }}
                label="角色分配"
              >
                {getFieldDecorator('roleIds')(
                  <CheckboxGroup style={{ width: '100%' }}>
                    <Row>
                      <Col span={6}>
                        <Checkbox value="1">管理员</Checkbox>
                      </Col>
                      <Col span={6}>
                        <Checkbox value="2">录分员</Checkbox>
                      </Col>
                      <Col span={6}>
                        <Checkbox value="3">主讲老师</Checkbox>
                      </Col>
                    </Row>
                  </CheckboxGroup>
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}
export default Form.create({
  mapPropsToFields(props) {
    if (!props.data) {
      return {};
    }
    return {
      id: Form.createFormField({
        value: props.data.id,
      }),
      createTime: Form.createFormField({
        value: props.data.createTime,
      }),
      lastLoginTime: Form.createFormField({
        value: props.data.lastLoginTime,
      }),
      name: Form.createFormField({
        value: props.data.name,
      }),
      mobile: Form.createFormField({
        value: props.data.mobile,
      }),
      department: Form.createFormField({
        value: props.data.department,
      }),
      roleIds: Form.createFormField({
        value: props.data.roleIds,
      }),
    };
  },
})(AccountEdit);
