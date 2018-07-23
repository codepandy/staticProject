import React, { PureComponent, Fragment } from 'react';
import { Card, Timeline } from 'antd';
import styles from './index.less';

export default class RecordList extends PureComponent {
  static defaultProps = {
    title: '',
    showNum: 0,
    recordList: [],
  };
  renderShowMore = () => {
    const { showNum, recordList, showMore } = this.props;
    if (recordList.length <= showNum) {
      return <a>暂无更多数据</a>;
    } else {
      return <a onClick={showMore.showMoreMethod}>{showMore.content}</a>;
    }
  };
  render() {
    const { showNum, recordList, title, isHref } = this.props;
    let recordData = [];
    if (typeof recordList === 'object' && recordList.length) {
      if (isHref) {
        recordData = showNum
          ? recordList.slice(0, showNum > recordList.length ? recordList.length : showNum)
          : recordList;
      } else {
        recordData = recordList;
      }
    }
    return (
      <Fragment>
        <Card title={title} loading={this.props.loading}>
          <Timeline>
            {recordData.map(item => {
              return (
                <Timeline.Item color={item.color} key={item.attendTime}>
                  <div style={{ marginBottom: 15 }}>
                    <span>{item.attendTime}</span>
                    <span className={styles.marginLeft} style={{ color: item.color }}>
                      {item.attendPlace}
                    </span>
                  </div>
                  <Card style={{ width: 450 }}>{item.atteddDescrite}</Card>
                </Timeline.Item>
              );
            })}
            <Timeline.Item color="green">{this.renderShowMore()}</Timeline.Item>
          </Timeline>
        </Card>
      </Fragment>
    );
  }
}
