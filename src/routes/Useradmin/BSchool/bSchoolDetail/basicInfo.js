import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Col, Button, Form } from 'antd';
import BasicInfo from 'components/Bschool/basicInfo';

import RecordList from 'components/bcStudent/recordList';
import TeacherList from 'components/Bschool/teacherLists';
import NewAddConnect from 'components/Bschool/newAddConnect';
import SignAgainGive from 'components/Bschool/signAgainGive';
import StudentSituation from 'components/Bschool/studentSituation';
import { parseSearch } from '../../../../utils/utils';

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

@connect(({ allDetail, newAddConnect, signAgainGive, loading }) => ({
  allDetail,
  newAddConnect,
  signAgainGive,
  loading: loading.models.list,
}))
@Form.create()
export default class BSchoolBasicInfo extends Component {
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
  signAgainGive = (visible, signFlag) => {
    // 签约 和赠课
    const title = signFlag === 1 ? '签约' : '赠课';
    const showSign = signFlag === 1;
    this.props.dispatch({
      type: 'signAgainGive/setState',
      payload: {
        signAgainGiveVisible: visible,
        signAgainGiveTitle: title,
        signAgainGiveShowSign: showSign,
      },
    });
  };
  showMore = num => {
    let url = '';
    const searchObj = parseSearch();
    if (num === 1) {
      url = `/useradmin/b-school/detail/sign-detail/${searchObj.schoolId}`;
    } else if (num === 2) {
      url = `/useradmin/b-school/detail/connect-detail/${searchObj.schoolId}`;
    } else {
      url = `/useradmin/b-school/detail/activity-detail/${searchObj.schoolId}`;
    }
    this.props.dispatch(routerRedux.push(url));
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
      content: '点击查看更多',
      showMoreMethod: this.showMore.bind(null, 3),
    };
    const classTitle = (
      <div>
        <Row>
          <Col span={4}>
            <h3>签约数据</h3>
          </Col>
        </Row>
        <Row style={{ marginLeft: 15, marginTop: 10 }}>
          <Col span={24}>
            <Button
              type="primary"
              style={{ marginRight: 25 }}
              onClick={this.signAgainGive.bind(null, true, 1)}
            >
              签约
            </Button>
            <Button
              type="primary"
              style={{ marginRight: 25 }}
              onClick={this.signAgainGive.bind(null, true, 2)}
            >
              赠课
            </Button>
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
    const {
      signAgainGiveTitle,
      signAgainGiveShowSign,
      signAgainGiveVisible,
    } = this.props.signAgainGive;
    return (
      <Fragment>
        <div style={{ marginBottom: 30 }}>
          <BasicInfo />
          <Row gutter={36} style={{ marginTop: 25 }}>
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
          <div style={{ marginTop: 25 }}>
            <TeacherList />
          </div>
          <div style={{ marginTop: 25 }}>
            <StudentSituation />
          </div>
          <div style={{ marginTop: 25 }}>
            <Row gutter={36}>
              <Col span={24}>
                <RecordList
                  title="活动参与"
                  showNum={3}
                  showMore={activityShowMore}
                  recordList={recordList}
                />
              </Col>
            </Row>
          </div>
        </div>
        <NewAddConnect />
        {signAgainGiveVisible ? (
          <SignAgainGive title={signAgainGiveTitle} showSign={signAgainGiveShowSign} />
        ) : null}
      </Fragment>
    );
  }
}
