import React, { Component } from 'react';
import { Row, Col, Button, Modal, Input, message } from 'antd';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';

import RecordList from 'components/bcStudent/recordList';
import BasicInfo from 'components/bcStudent/basicInfo';
import CourseData from 'components/bcStudent/courseData';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from './basicInfo.less';

const { TextArea } = Input;
const recordList = [
  {
    attendTime: '时间：2017-12-231 ',
    attendPlace: '爱尖子杯夏令营',
    atteddDescrite: '参与情况描述',
  },
  {
    attendTime: '时间：2017-12-232 ',
    attendPlace: '爱尖子杯夏令营',
    atteddDescrite: '参与情况描述',
  },
  {
    attendTime: '时间：2017-12-233 ',
    attendPlace: '爱尖子杯夏令营',
    atteddDescrite: '参与情况描述',
  },
  {
    attendTime: '时间：2017-12-213 ',
    attendPlace: '爱尖子杯夏令营',
    atteddDescrite: '参与情况描述',
  },
];

const chartData = [];
for (let i = 0; i < 20; i += 1) {
  chartData.push({
    x: new Date().getTime() + 1000 * 60 * 30 * i,
    y1: Math.floor(Math.random() * 100) + 1000,
  });
}

@connect(({ bcAllDetail, loading }) => ({
  bcAllDetail,
  loading: loading.effects['chart/fetch'],
}))
export default class StudentDetail extends Component {
  componentDidMount() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  showMore = num => {
    let url = '';
    if (num === 1) {
      url = '/useradmin/b-c-student-class-detail';
    } else if (num === 2) {
      url = '/useradmin/b-c-student-connect-detail';
    } else {
      url = '/useradmin/b-c-student-activity-detail';
    }
    this.props.dispatch(routerRedux.push(url));
  };
  addConnectRecordVisible = visible => {
    // 新增沟通
    const payLoad = {
      connectRecordVisible: visible,
    };
    if (!visible) {
      payLoad.writeConnectRecord = '';
    }
    this.props.dispatch({
      type: 'bcAllDetail/setState',
      payload: payLoad,
    });
  };
  writeConnectRecord = e => {
    // 输入沟通记录
    if (e.target.value.length > 300) {
      return message.warning('您最多可输入300个字符');
    }
    this.props.dispatch({
      type: 'bcAllDetail/setState',
      payload: {
        writeConnectRecord: e.target.value.slice(0, 300),
      },
    });
  };

  render() {
    const classShowMore = {
      content: '点击查看更多历史签约',
      showMoreMethod: this.showMore.bind(null, 1),
    };
    const connectShowMore = {
      content: '点击查看更多沟通记录',
      showMoreMethod: this.showMore.bind(null, 2),
    };
    const activityShowMore = {
      content: '点击查看更多沟通记录',
      showMoreMethod: this.showMore.bind(null, 3),
    };
    const classTitle = (
      <div>
        <Row>
          <Col span={4}>
            <h3>购课记录</h3>
          </Col>
        </Row>
        <Row style={{ marginLeft: 15, marginTop: 10 }}>
          <Col span={24}>
            <a style={{ fontSize: 14, fontWeight: 400 }}>共计课程xx</a>
            <a style={{ marginLeft: 15, fontSize: 14, fontWeight: 400 }}>线下课程xx</a>
          </Col>
        </Row>
      </div>
    );
    const connectTitle = (
      <div>
        <Row>
          <Col span={4}>
            <h3>沟通记录</h3>
          </Col>
        </Row>
        <Row style={{ marginLeft: 15, marginTop: 10 }}>
          <Col span={24}>
            <Button
              type="primary"
              style={{ marginRight: 25 }}
              onClick={this.addConnectRecordVisible.bind(null, true)}
            >
              新增沟通
            </Button>
          </Col>
        </Row>
      </div>
    );
    const { connectRecordVisible, writeConnectRecord } = this.props.bcAllDetail;
    return (
      <PageHeaderLayout title="">
        <BasicInfo />
        <Row gutter={36} className={styles.item_container}>
          <Col span={12}>
            <RecordList
              title={classTitle}
              showNum={3}
              showMore={classShowMore}
              recordList={recordList}
            />
          </Col>
          <Col span={12}>
            <RecordList
              title={connectTitle}
              showNum={3}
              showMore={connectShowMore}
              recordList={recordList}
            />
          </Col>
        </Row>
        <CourseData />
        <Row gutter={36} className={styles.item_container}>
          <Col span={24}>
            <RecordList
              title="活动参与"
              showNum={3}
              showMore={activityShowMore}
              recordList={recordList}
            />
          </Col>
        </Row>
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
      </PageHeaderLayout>
    );
  }
}
