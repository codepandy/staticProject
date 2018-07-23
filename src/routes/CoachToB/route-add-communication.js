import React, { Component } from 'react';
import { Form, Input, Modal } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

class AddCommunication extends Component {
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

  okHandle = () => {
    const { props } = this;
    let params = null;
    props.form.validateFields((err, values) => {
      if (!err) {
        params = Object.assign({}, { communication: values });
        props.dispatch({
          type: 'coach/updateCommunication',
          payload: params,
        });
      }
    });
  };

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
        title="新增沟通记录"
        maskClosable={false}
        width={width || 620}
        visible={modalVisible}
        onOk={this.okHandle}
        onCancel={() => onChangeVisible(false)}
      >
        <FormItem {...formItemLayout} label="沟通记录">
          {getFieldDecorator('communicationRecord', {
            rules: [
              {
                required: true,
                message: '沟通记录不能为空！',
              },
            ],
          })(<TextArea rows={6} />)}
        </FormItem>
      </Modal>
    );
  }
}
AddCommunication.defaultProps = {
  modalVisible: false,
};
export default Form.create()(AddCommunication);
