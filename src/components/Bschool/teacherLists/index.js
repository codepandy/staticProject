import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Table, Modal, Input, message, Card } from 'antd';
import styles from './index.less';

const { Search } = Input;

@connect(({ allDetail, loading }) => ({
  allDetail,
  loading: loading.models.list,
}))
export default class TeacherList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.columns = [
      {
        title: '教练名',
        dataIndex: 'teacherName',
        key: 'teacherName',
      },
      {
        title: '年级学科',
        dataIndex: 'gradeSubject',
        key: 'gradeSubject',
      },
      {
        title: '联系方式',
        dataIndex: 'connect',
        key: 'connect',
      },
      {
        title: '行政身份',
        dataIndex: 'idCard',
        key: 'idCard',
      },
      {
        title: '当前课程使用权限',
        dataIndex: 'permissions',
        key: 'permissions',
      },
      {
        title: '备注',
        dataIndex: 'remarks',
        key: 'remarks',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: () => {
          return (
            <a
              className={styles.item_title}
              onClick={this.editTeacherRemarksVisible.bind(null, true)}
            >
              编辑备注
            </a>
          );
        },
      },
    ];
    this.dataSource = [
      {
        teacherId: 1,
        key: 1,
        teacherName: 'xxx',
        gradeSubject: '高一数学',
        connect: '18334774476',
        idCard: '1426777212314412412',
        permissions: '高一数学竞赛课程',
        remarks: '固定联系人',
      },
    ];
  }
  searchTearcherAccount = value => {
    this.props.dispatch({
      type: 'allDetail/setState',
      payload: { teacherAccount: value },
    });
  };
  addTeacherAccountVisible = visible => {
    this.props.dispatch({
      type: 'allDetail/setState',
      payload: { addTeacherAccountVisible: visible },
    });
  };
  editTeacherRemarksVisible = visible => {
    this.props.dispatch({
      type: 'allDetail/setState',
      payload: { editTeacherRemarksVisible: visible },
    });
  };
  editTeacherRemarks = e => {
    if (e.target.value.length > 200) {
      return message.warning('您最多可输入20个字符!');
    }
    this.props.dispatch({
      type: 'allDetail/setState',
      payload: { editTeacherRemarks: e.target.value.slice(0, 20) },
    });
  };
  render() {
    const {
      teacherAccount,
      addTeacherAccountVisible,
      editTeacherRemarksVisible,
      editTeacherRemarks,
    } = this.props.allDetail;
    const teacherTitle = (
      <div>
        <Row>
          <Col span={24}>教练列表</Col>
        </Row>
        <Row style={{ marginLeft: 10, marginTop: 20 }}>
          <Col span={24} style={{ fontSize: 14 }}>
            <a>共计教练xx人</a> <a style={{ marginLeft: 15 }}>当前教练：xx人</a>
          </Col>
        </Row>
      </div>
    );
    return (
      <Fragment>
        <Card title={teacherTitle}>
          <Row gutter={36}>
            <Col span={24}>
              <Row>
                <Col span={24}>
                  <Table
                    rowKey={record => record.teacherId}
                    columns={this.columns}
                    dataSource={this.dataSource}
                    bordered
                    footer={() => (
                      <div style={{ textAlign: 'center' }}>
                        <a
                          className={styles.item_title}
                          onClick={this.addTeacherAccountVisible.bind(null, true)}
                        >
                          新绑定教练
                        </a>
                      </div>
                    )}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                  <a className={styles.item_title}>编辑</a>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
        <div>
          <Modal
            title="新绑定教练"
            visible={addTeacherAccountVisible}
            onOk={() => {}}
            onCancel={this.addTeacherAccountVisible.bind(null, false)}
          >
            <Row gutter={36}>
              <Col xs={24} sm={6} md={6} lg={6} xl={6} style={{ textAlign: 'right' }}>
                教练账号：
              </Col>
              <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                <Search
                  placeholder="请输入教练账号"
                  value={teacherAccount}
                  onSearch={this.searchTearcherAccount}
                  style={{ width: '90%' }}
                />
              </Col>
            </Row>
          </Modal>
        </div>
        <div>
          <Modal
            title="编辑教练备注信息"
            visible={editTeacherRemarksVisible}
            onOk={() => {}}
            onCancel={this.editTeacherRemarksVisible.bind(null, false)}
          >
            <Row gutter={36}>
              <Col xs={24} sm={6} md={6} lg={6} xl={6} style={{ textAlign: 'right' }}>
                备注信息：
              </Col>
              <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                <Input
                  placeholder="请输入备注信息"
                  value={editTeacherRemarks}
                  onChange={this.editTeacherRemarks}
                />
              </Col>
            </Row>
          </Modal>
        </div>
      </Fragment>
    );
  }
}
