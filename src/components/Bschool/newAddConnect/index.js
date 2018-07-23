import React, { Component, Fragment } from 'react';
import { connect } from 'dva';

import { Row, Col, Modal, Form, Input, message } from 'antd';

const { TextArea } = Input;
@connect(({ newAddConnect, loading }) => ({
  newAddConnect,
  loading: loading.models.list,
}))
@Form.create()
export default class NewAddConnect extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  addConnectRecordVisible = visible => {
    // 新增沟通
    const payLoad = {
      connectRecordVisible: visible,
    };
    if (!visible) {
      payLoad.writeConnectRecord = '';
    }
    this.props.dispatch({
      type: 'newAddConnect/setState',
      payload: payLoad,
    });
  };

  writeConnectRecord = e => {
    // 输入沟通记录
    if (e.target.value.length > 300) {
      return message.warning('您最多可输入300个字符');
    }
    this.props.dispatch({
      type: 'newAddConnect/setState',
      payload: {
        writeConnectRecord: e.target.value.slice(0, 300),
      },
    });
  };
  render() {
    const { connectRecordVisible, writeConnectRecord } = this.props.newAddConnect;
    return (
      <Fragment>
        <div id="add_connect_record">
          <Modal
            title="新增沟通记录"
            visible={connectRecordVisible}
            onOk={() => {}}
            onCancel={this.addConnectRecordVisible.bind(null, false)}
            okText="提交"
          >
            <Row>
              <Col xs={24} sm={5} md={5} lg={5} xl={5}>
                沟通记录：
              </Col>
              <Col xs={24} sm={19} md={19} lg={19} xl={19}>
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder="沟通记录："
                  rows={6}
                  value={writeConnectRecord}
                  onChange={this.writeConnectRecord}
                />
              </Col>
            </Row>
          </Modal>
        </div>
      </Fragment>
    );
  }
}
