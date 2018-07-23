import React, { Component } from 'react';
import { connect } from 'dva';
import RecordList from 'components/bcStudent/recordList';

@connect(({ activityDetail, loading }) => ({
  activityDetail,
  loading: loading.effects['activityDetail/fetchclassDetail'],
}))
export default class ActivityDetail extends Component {
  // static defaultProps = {}
  componentDidMount = () => {
    this.props.dispatch({
      type: 'activityDetail/fetchclassDetail',
    });
  };
  componentWillUnmount = () => {
    this.props.dispatch({
      type: 'activityDetail/clear',
    });
  };
  showMore = () => {
    this.props.dispatch({
      type: 'activityDetail/fetchclassDetailMore',
    });
  };
  render() {
    const { recordList } = this.props.activityDetail;
    return (
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
    );
  }
}
