import React, { Component } from 'react';
import { connect } from 'dva';
import RecordList from 'components/bcStudent/recordList';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
@connect(({ connectDetail, loading }) => ({
  connectDetail,
  loading: loading.effects['connectDetail/fetchConnectDetail'],
}))
export default class ConnectDetail extends Component {
  // static defaultProps = {}
  componentDidMount = () => {
    this.props.dispatch({
      type: 'connectDetail/fetchConnectDetail',
    });
  };
  componentWillUnmount = () => {
    this.props.dispatch({
      type: 'connectDetail/clear',
    });
  };
  showMore = () => {
    this.props.dispatch({
      type: 'connectDetail/fetchConnectDetailMore',
    });
  };
  render() {
    const { recordList } = this.props.connectDetail;
    return (
      <PageHeaderLayout title="">
        <RecordList
          title="历史沟通记录"
          showNum={3}
          showMore={{
            content: '点击查看更多历史沟通',
            isHref: false,
            showMoreMethod: this.showMore,
          }}
          recordList={recordList}
          loading={this.props.loading}
        />
      </PageHeaderLayout>
    );
  }
}
