import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Table, Card, Modal } from 'antd';
import styles from './index.less';

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
        title: '等级',
        dataIndex: 'grade',
        key: 'grade',
        children: [
          {
            title: '类别',
            dataIndex: 'sort',
            key: 'sort',
            width: 200,
          },
        ],
      },
      {
        title: 'A',
        dataIndex: 'A',
        key: 'A',
        children: [
          {
            title: '国家一等奖',
            dataIndex: 'firstPrize',
            key: 'firstPrize',
            width: 200,
          },
          {
            title: '国家二等奖',
            dataIndex: 'secondPrize',
            key: 'secondPrize',
            width: 200,
          },
          {
            title: '国家三等奖',
            dataIndex: 'thirdPrize',
            key: 'thirdPrize',
            width: 200,
          },
        ],
      },
      {
        title: 'B',
        dataIndex: 'B',
        key: 'B',
        children: [
          {
            title: '自招人数',
            dataIndex: 'selfPeople',
            key: 'selfPeople',
            width: 200,
          },
        ],
      },
      {
        title: 'C',
        dataIndex: 'C',
        key: 'C',
        children: [
          {
            title: '清华',
            dataIndex: 'school',
            key: 'school',
            width: 200,
          },
          {
            title: '北大',
            dataIndex: 'remarks',
            key: 'remarks',
            width: 200,
          },
        ],
      },
    ];
    this.dataSource = [
      {
        grade: 1,
        key: 1,
        sort: '2018',
        firstPrize: '2人',
        secondPrize: '2人',
        thirdPrize: '2人',
        selfPeople: 20,
        school: '清华',
        remarks: '北大',
      },
      {
        grade: 1,
        key: 2,
        sort: '2018',
        firstPrize: '2人',
        secondPrize: '2人',
        thirdPrize: '2人',
        selfPeople: 20,
        school: '清华',
        remarks: '北大',
      },
    ];
  }
  editStudentSituationVisible = visible => {
    this.props.dispatch({
      type: 'allDetail/setState',
      payload: { editStudentSituationVisible: visible },
    });
  };
  render() {
    const { editStudentSituationVisible } = this.props.allDetail;
    const studentSituation = (
      <div>
        <Row>
          <Col span={24}>学员情况</Col>
        </Row>
        <Row style={{ marginLeft: 10, marginTop: 15, fontSize: 14 }}>
          <Col span={24}>
            <a>在读学员：xx人</a> <a style={{ marginLeft: 15 }}>历史学员人数：xx人</a>
          </Col>
        </Row>
      </div>
    );
    return (
      <Fragment>
        <Card title={studentSituation}>
          <Row gutter={36}>
            <Col span={24}>
              <Row>
                <Col span={24}>
                  <Table
                    // rowKey={record => record.teacherId}
                    columns={this.columns}
                    dataSource={this.dataSource}
                    bordered
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                  <a
                    className={styles.item_title}
                    onClick={this.editStudentSituationVisible.bind(null, true)}
                  >
                    编辑
                  </a>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
        <div>
          <Modal
            title="编辑学员情况"
            visible={editStudentSituationVisible}
            onOk={() => {}}
            onCancel={this.editStudentSituationVisible.bind(null, false)}
            style={{ width: 800 }}
          >
            <Table
              rowKey={record => record.teacherId}
              columns={this.columns}
              dataSource={this.dataSource}
              bordered
            />
          </Modal>
        </div>
      </Fragment>
    );
  }
}
