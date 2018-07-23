import React, { Component } from 'react';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import HistoryRecordList from '../../components/HistoryRecordList/index';

@connect(({ coach, loading }) => ({
  coach,
  loading: loading.models.coach,
}))
export default class ActivityList extends Component {
  render() {
    const { coach: { activityData } } = this.props;
    return (
      <PageHeaderLayout title="">
        <HistoryRecordList
          key="activityList"
          title="活动参与"
          data={activityData.list || []}
          showMore
          moreLabel="暂无更多活动记录"
        />
      </PageHeaderLayout>
    );
  }
}
