import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Button } from 'antd';
import RecordList from 'components/bcStudent/recordList';
import SignAgainGive from 'components/Bschool/signAgainGive';
@connect(({ signDetail, signAgainGive, loading }) => ({
  signDetail,
  signAgainGive,
  loading: loading.effects['signDetail/fetchclassDetail'],
}))
export default class SignDetail extends Component {
  // static defaultProps = {}
  componentDidMount = () => {
    this.props.dispatch({
      type: 'signDetail/fetchclassDetail',
    });
  };
  componentWillUnmount = () => {
    this.props.dispatch({
      type: 'signDetail/clear',
    });
  };
  showMore = () => {
    this.props.dispatch({
      type: 'signDetail/fetchclassDetailMore',
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
  render() {
    const signTitle = (
      <div>
        <Row>
          <Col span={24}>
            <Button
              type="primary"
              style={{ marginRight: 25 }}
              onClick={this.signAgainGive.bind(null, true, 1)}
            >
              续约
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
        <Row style={{ marginTop: 25 }}>
          <Col span={4}>
            <h3>历史签约数据</h3>
          </Col>
        </Row>
      </div>
    );
    const { recordList } = this.props.signDetail;
    const {
      signAgainGiveTitle,
      signAgainGiveShowSign,
      signAgainGiveVisible,
    } = this.props.signAgainGive;
    return (
      <Fragment>
        <RecordList
          title={signTitle}
          showNum={3}
          showMore={{
            content: '点击查看更多历史签约',
            isHref: false,
            showMoreMethod: this.showMore,
          }}
          recordList={recordList}
          loading={this.props.loading}
        />
        {signAgainGiveVisible ? (
          <SignAgainGive title={signAgainGiveTitle} showSign={signAgainGiveShowSign} />
        ) : null}
      </Fragment>
    );
  }
}
