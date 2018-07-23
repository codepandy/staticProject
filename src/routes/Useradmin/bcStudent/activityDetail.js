import React, { Component } from 'react';
import { connect } from 'dva';
import RecordList from 'components/bcStudent/recordList';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

@connect(({ activityDetail, loading }) => ({
  activityDetail,
  loading: loading.effects['activityDetail/fetchActivityRecord'],
}))
export default class activityDetail extends Component {
  static defaultProps = {};
  componentDidMount = () => {
    this.props.dispatch({
      type: 'activityDetail/fetchActivityRecord',
    });
  };
  componentWillUnmount = () => {
    this.props.dispatch({
      type: 'activityDetail/clear',
    });
  };
  showMore = () => {
    this.props.dispatch({
      type: 'activityDetail/fetchActivityRecordMore',
    });
  };
  render() {
    const { recordList } = this.props.activityDetail;
    return (
      <PageHeaderLayout title="">
        <RecordList
          title="历史活动记录"
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
