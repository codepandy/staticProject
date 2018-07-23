import React, { Component } from 'react';
import { connect } from 'dva';
import RecordList from 'components/bcStudent/recordList';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

@connect(({ classDetail, loading }) => ({
  classDetail,
  loading: loading.effects['activityDetail/fetchclassDetail'],
}))
export default class activityDetail extends Component {
  // static defaultProps = {}
  componentDidMount = () => {
    this.props.dispatch({
      type: 'classDetail/fetchclassDetail',
    });
  };
  componentWillUnmount = () => {
    this.props.dispatch({
      type: 'classDetail/clear',
    });
  };
  showMore = () => {
    this.props.dispatch({
      type: 'classDetail/fetchclassDetailMore',
    });
  };
  render() {
    const { recordList } = this.props.classDetail;
    return (
      <PageHeaderLayout title="">
        <RecordList
          title="历史购课记录"
          showNum={3}
          showMore={{
            content: '点击查看更多历史签约',
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
