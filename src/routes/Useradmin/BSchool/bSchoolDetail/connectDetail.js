import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Button } from 'antd';
import RecordList from 'components/bcStudent/recordList';
import NewAddConnect from 'components/Bschool/newAddConnect';

@connect(({ connectDetail, loading }) => ({
  connectDetail,
  loading: loading.effects['connectDetail/fetchclassDetail'],
}))
export default class ConnectDetail extends Component {
  // static defaultProps = {}
  componentDidMount = () => {
    this.props.dispatch({
      type: 'connectDetail/fetchclassDetail',
    });
  };
  componentWillUnmount = () => {
    this.props.dispatch({
      type: 'connectDetail/clear',
    });
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
      type: 'newAddConnect/setState',
      payload: payLoad,
    });
  };
  showMore = () => {
    this.props.dispatch({
      type: 'connectDetail/fetchclassDetailMore',
    });
  };
  render() {
    const signTitle = (
      <div>
        <Row>
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
        <Row style={{ marginTop: 25 }}>
          <Col span={4}>
            <h3>历史沟通记录</h3>
          </Col>
        </Row>
      </div>
    );
    const { recordList } = this.props.connectDetail;
    return (
      <Fragment>
        <RecordList
          title={signTitle}
          showNum={3}
          showMore={{
            content: '点击查看更多沟通记录',
            isHref: false,
            showMoreMethod: this.showMore,
          }}
          recordList={recordList}
          loading={this.props.loading}
        />
        <NewAddConnect />
      </Fragment>
    );
  }
}
