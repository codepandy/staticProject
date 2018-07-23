import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './route-coach-detail.less';
import HistoryRecordList from '../../components/HistoryRecordList/index';
import AddCommunication from './route-add-communication';

@connect(({ coach, loading }) => ({
  coach,
  loading: loading.models.coach,
}))
export default class CommunicationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      communicationModalVisible: false,
    };
  }

  handleModalVisible = flag => {
    this.setState({
      communicationModalVisible: flag,
    });
  };
  render() {
    const { coach: { communicationData } } = this.props;
    const { communicationModalVisible } = this.state;
    return (
      <PageHeaderLayout title="">
        <HistoryRecordList
          key="communicationList"
          title="沟通记录"
          data={communicationData.list || []}
          showMore
          moreLabel="暂无更多沟通记录"
        >
          <div className={styles.buttonContainer}>
            <Button
              type="primary"
              onClick={e => {
                e.preventDefault();
                this.handleModalVisible(true);
              }}
            >
              新增沟通记录
            </Button>
          </div>
        </HistoryRecordList>
        <AddCommunication
          modalVisible={communicationModalVisible}
          onChangeVisible={flag => {
            this.handleModalVisible(flag);
          }}
        />
      </PageHeaderLayout>
    );
  }
}
