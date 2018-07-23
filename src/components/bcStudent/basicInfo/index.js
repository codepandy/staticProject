import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Modal, Card, Input, Select, DatePicker, message } from 'antd';
import styles from './index.less';

const { Option } = Select;
@connect(({ editStudentInfo }) => ({
  editStudentInfo,
}))
export default class BasicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'editStudentInfo/fetch',
    });
  }
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'editStudentInfo/clear',
    });
  }
  editBasicInfo = () => {
    this.props.dispatch({
      type: 'editStudentInfo/setState',
      payload: {
        basicInfoEditVisible: true,
      },
    });
  };
  submitStudentInfo = () => {
    const {
      writeStudentName,
      writeRegisterTime,
      writeTrialAccount,
      writeStudentConnect,
    } = this.props.editStudentInfo;
    if (!writeStudentName) {
      return message.warning('请输入姓名');
    }
    if (!writeRegisterTime) {
      return message.warning('请填写注册时间');
    }
    if (!writeTrialAccount) {
      return message.warning('请选择是否是试用账号');
    }
    if (!writeStudentConnect) {
      return message.warning('请填写联系方式');
    }
    this.props.dispatch({
      type: 'editStudentInfo/submitStudentInfo',
    });
  };
  render() {
    const rowStyle = {
      margin: '20px 10px',
    };
    const basicInfoStyle = {
      border: '1px solid #333',
      padding: '5px 5px 5px 10px',
    };
    const paddingTOp = {
      paddingTop: 5,
    };
    const {
      basicInfoEditVisible,
      editStudentConfirmLoading,
      basicInfo,
    } = this.props.editStudentInfo;
    return (
      <Fragment>
        <Card title="基本信息" extra={<a onClick={this.editBasicInfo}>编辑</a>}>
          <div>
            <Row gutter={36} style={rowStyle}>
              <Col span={6}>
                <Row>
                  <Col span={8} style={paddingTOp}>
                    姓名：
                  </Col>
                  <Col span={16} style={basicInfoStyle}>
                    {basicInfo.studentName}
                  </Col>
                </Row>
              </Col>
              <Col span={6}>
                <Row>
                  <Col span={8} style={paddingTOp}>
                    联系方式：
                  </Col>
                  <Col span={16} style={basicInfoStyle}>
                    {basicInfo.ContactMode}
                  </Col>
                </Row>
              </Col>
              <Col span={6}>
                <Row>
                  <Col span={8} style={paddingTOp}>
                    注册时间：
                  </Col>
                  <Col span={16} style={basicInfoStyle}>
                    {basicInfo.signTime}
                  </Col>
                </Row>
              </Col>
              <Col span={6}>
                <Row>
                  <Col span={8} style={paddingTOp}>
                    试用账号：
                  </Col>
                  <Col span={16} style={basicInfoStyle}>
                    {basicInfo.trialAccount}
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row gutter={36} style={rowStyle}>
              <Col span={6}>
                <Row>
                  <Col span={8} style={paddingTOp}>
                    渠道来源：
                  </Col>
                  <Col span={16} style={basicInfoStyle}>
                    {basicInfo.studentOrigin}
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row gutter={36} style={rowStyle}>
              <Col span={6}>
                <Row>
                  <Col span={8} style={paddingTOp}>
                    地区：
                  </Col>
                  <Col span={16} style={basicInfoStyle}>
                    {basicInfo.provice}
                  </Col>
                </Row>
              </Col>
              <Col span={4}>
                <Row>
                  <Col span={24} style={basicInfoStyle}>
                    {basicInfo.city}
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row gutter={36} style={rowStyle}>
              <Col span={6}>
                <Row>
                  <Col span={8} style={paddingTOp}>
                    就读：
                  </Col>
                  <Col span={16} style={basicInfoStyle}>
                    {basicInfo.city}
                  </Col>
                </Row>
              </Col>
              <Col span={6}>
                <Row>
                  <Col span={8} style={paddingTOp}>
                    所属：
                  </Col>
                  <Col span={16} style={basicInfoStyle}>
                    向南海南
                  </Col>
                </Row>
              </Col>
              <Col span={4}>
                <Row>
                  <Col span={24} style={basicInfoStyle}>
                    北京四中
                  </Col>
                </Row>
              </Col>
              <Col span={4}>
                <Row>
                  <Col span={24} style={basicInfoStyle}>
                    北京四中
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row gutter={36} style={rowStyle}>
              <Col span={6}>
                <Row>
                  <Col span={8} style={paddingTOp}>
                    最高获奖：
                  </Col>
                  <Col span={16} style={basicInfoStyle}>
                    国家一等奖
                  </Col>
                </Row>
              </Col>
              <Col span={6}>
                <Row>
                  <Col span={8} style={paddingTOp}>
                    自招：
                  </Col>
                  <Col span={16} style={basicInfoStyle}>
                    /
                  </Col>
                </Row>
              </Col>
              <Col span={6}>
                <Row>
                  <Col span={8} style={paddingTOp}>
                    毕业去向：
                  </Col>
                  <Col span={16} style={basicInfoStyle}>
                    /
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          {basicInfoEditVisible ? (
            <div>
              <Modal
                title="学生基本信息编辑"
                visible={basicInfoEditVisible}
                onOk={this.submitStudentInfo}
                confirmLoading={editStudentConfirmLoading}
                width={750}
                onCancel={() => {
                  this.props.dispatch({
                    type: 'editStudentInfo/setState',
                    payload: {
                      basicInfoEditVisible: false,
                    },
                  });
                }}
              >
                <div>
                  <Row gutter={36} style={rowStyle}>
                    <Col span={8}>
                      <Row>
                        <Col span={10} style={paddingTOp}>
                          <span className={styles.edit_student_required}>*</span>姓名：
                        </Col>
                        <Col span={14}>
                          <Input
                            placeholder="请填写"
                            onChange={e => {
                              this.props.dispatch({
                                type: 'editStudentInfo/setState',
                                payload: { writeStudentName: e.target.value },
                              });
                            }}
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col span={8}>
                      <Row>
                        <Col span={10} style={paddingTOp}>
                          <span className={styles.edit_student_required}>*</span>注册时间：
                        </Col>
                        <Col span={14}>
                          <DatePicker
                            onChange={(data, dataString) => {
                              this.props.dispatch({
                                type: 'editStudentInfo/setState',
                                payload: { writeRegisterTime: dataString },
                              });
                            }}
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col span={8}>
                      <Row>
                        <Col span={10} style={paddingTOp}>
                          <span className={styles.edit_student_required}>*</span>试用账号：
                        </Col>
                        <Col span={14}>
                          <Select
                            style={{ width: '100px' }}
                            placeholder="请选择"
                            onChange={value => {
                              this.props.dispatch({
                                type: 'editStudentInfo/setState',
                                payload: { writeTrialAccount: value },
                              });
                            }}
                          >
                            <Option value="1">是</Option>
                            <Option value="0">否</Option>
                          </Select>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row gutter={36} style={rowStyle}>
                    <Col span={8}>
                      <Row>
                        <Col span={10} style={paddingTOp}>
                          <span className={styles.edit_student_required}>*</span>联系方式
                        </Col>
                        <Col span={14}>
                          <Input
                            placeholder="请输入"
                            onChange={e => {
                              this.props.dispatch({
                                type: 'editStudentInfo/setState',
                                payload: { writeStudentConnect: e.target.value },
                              });
                            }}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row gutter={36} style={rowStyle}>
                    <Col span={8}>
                      <Row>
                        <Col span={10} style={paddingTOp}>
                          地区：
                        </Col>
                        <Col span={14} style={basicInfoStyle}>
                          北京四中
                        </Col>
                      </Row>
                    </Col>
                    <Col span={4}>
                      <Row>
                        <Col span={24} style={basicInfoStyle}>
                          北京四中
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row gutter={36} style={rowStyle}>
                    <Col span={8}>
                      <Row>
                        <Col span={10} style={paddingTOp}>
                          就读学校：
                        </Col>
                        <Col span={14}>
                          <Select
                            style={{ width: '100px' }}
                            placeholder="请选择"
                            onChange={value => {
                              this.props.dispatch({
                                type: 'editStudentInfo/setState',
                                payload: { writeStudentAttendSchool: value },
                              });
                            }}
                          >
                            <Option value="1">北京四中</Option>
                          </Select>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row gutter={36} style={rowStyle}>
                    <Col span={8}>
                      <Row>
                        <Col span={10} style={paddingTOp}>
                          所属学校：
                        </Col>
                        <Col span={14}>
                          <Select
                            style={{ width: '100px' }}
                            placeholder="请选择"
                            onChange={value => {
                              this.props.dispatch({
                                type: 'editStudentInfo/setState',
                                payload: { writeStudentForSchool: value },
                              });
                            }}
                          >
                            <Option value="1">北京四中</Option>
                          </Select>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={6}>
                      <Row>
                        <Col span={24}>
                          <Select
                            style={{ width: '100px' }}
                            placeholder="请选择"
                            onChange={value => {
                              this.props.dispatch({
                                type: 'editStudentInfo/setState',
                                payload: { writeStudentForOrigination: value },
                              });
                            }}
                          >
                            <Option value="1">北京四中</Option>
                          </Select>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={6}>
                      <Row>
                        <Col span={24}>
                          <Select
                            style={{ width: '100px' }}
                            placeholder="请选择"
                            onChange={value => {
                              this.props.dispatch({
                                type: 'editStudentInfo/setState',
                                payload: { writeStudentIsSign: value },
                              });
                            }}
                          >
                            <Option value="1">北京四中</Option>
                          </Select>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row gutter={36} style={rowStyle}>
                    <Col span={8}>
                      <Row>
                        <Col span={10} style={paddingTOp}>
                          最高获奖：
                        </Col>
                        <Col span={14}>
                          <Input
                            placeholder="请填写"
                            onChange={e => {
                              this.props.dispatch({
                                type: 'editStudentInfo/setState',
                                payload: { highestAward: e.target.value },
                              });
                            }}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row gutter={36} style={rowStyle}>
                    <Col span={8}>
                      <Row>
                        <Col span={10} style={paddingTOp}>
                          自招：
                        </Col>
                        <Col span={14}>
                          <Input
                            placeholder="请填写"
                            onChange={e => {
                              this.props.dispatch({
                                type: 'editStudentInfo/setState',
                                payload: { selfConfess: e.target.value },
                              });
                            }}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row gutter={36} style={rowStyle}>
                    <Col span={8}>
                      <Row>
                        <Col span={10} style={paddingTOp}>
                          毕业去向：
                        </Col>
                        <Col span={14}>
                          <Input
                            placeholder="请填写"
                            onChange={e => {
                              this.props.dispatch({
                                type: 'editStudentInfo/setState',
                                payload: { graduateForPlace: e.target.value },
                              });
                            }}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </Modal>
            </div>
          ) : null}
        </Card>
      </Fragment>
    );
  }
}
