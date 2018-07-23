import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './route-coach-detail.less';
import HistoryRecordList from '../../components/HistoryRecordList/index';
import SetAuthority from './route-set-authority';

@connect(({ coach, loading }) => ({
  coach,
  loading: loading.models.coach,
}))
export default class AuthorityList extends Component {
  state = {
    setModalVisible: false,
  };

  handleModalVisible = flag => {
    this.setState({ setModalVisible: flag });
  };
  render() {
    const { setModalVisible } = this.state;
    const { coach: { authorityData } } = this.props;
    return (
      <PageHeaderLayout title="">
        <HistoryRecordList
          key="couriseAuthority"
          title="课程使用权限"
          data={authorityData.list || []}
          showMore
          moreLabel="暂无更多签约记录"
        >
          <div className={styles.buttonContainer}>
            <Button
              type="primary"
              onClick={() => {
                this.setState({
                  setModalVisible: true,
                });
              }}
            >
              设置
            </Button>&nbsp;
            <Button
              type="primary"
              onClick={e => {
                e.preventDefault();
                this.props.dispatch({
                  type: 'coach/fetchQRCode',
                });
              }}
            >
              生成二维码
            </Button>
          </div>
        </HistoryRecordList>
        <SetAuthority
          width={900}
          modalVisible={setModalVisible}
          onChangeVisible={flag => {
            this.handleModalVisible(flag);
          }}
        />
      </PageHeaderLayout>
    );
  }
}
