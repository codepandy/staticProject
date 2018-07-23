import React, { Component } from 'react';
import { Row, Col, Card, Select } from 'antd';
import { TimelineChart } from 'components/Charts';
import { connect } from 'dva';
import Trend from 'components/Trend';
import styles from './index.less';

const { Option } = Select;
const chartData = [];
for (let i = 0; i < 20; i += 1) {
  chartData.push({
    x: new Date().getTime() + 1000 * 60 * 30 * i,
    y1: Math.floor(Math.random() * 100) + 1000,
  });
}
// loading 是 dva-loading 这个 dva 的插件内置的 model
@connect(({ allDetail, loading }) => ({
  allDetail,
  loading: loading.effects['chart/fetch'],
}))
export default class StudentDetail extends Component {
  componentDidMount() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }

  render() {
    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 8,
      style: { marginBottom: 24 },
    };
    const { loading } = this.props;
    return (
      <Card title="课程数据">
        <div>
          <Select style={{ width: '150px' }} placeholder="已开课正价课">
            <Option value="1">已开课正价课</Option>
          </Select>
          <Select
            placeholder="省级竞赛班 春季班"
            className={styles.marginLeft}
            style={{ width: '200px', marginLeft: 40 }}
          >
            <Option value="1">省级竞赛班 春季班</Option>
            <Option value="2">省级竞赛班 夏季班</Option>
          </Select>
        </div>
        <div style={{ margin: '20px 0px' }}>
          <a>主讲老师：xx</a>
          <a>教练：xxx</a>
        </div>
        <div>
          <Row gutter={24}>
            <Col {...topColResponsiveProps}>
              <Card title="出勤">
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                  <Trend flag="up" style={{ marginRight: 16 }}>
                    <span className={styles.trendText}>80%</span>
                  </Trend>
                  <Trend flag="down">
                    全国平均<span className={styles.trendText}>90%</span>
                  </Trend>
                </div>
              </Card>
            </Col>
            <Col {...topColResponsiveProps}>
              <Card title="上课平均时长">
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                  <Trend flag="up" style={{ marginRight: 16 }}>
                    <span className={styles.trendText}>100min</span>
                  </Trend>
                  <Trend>
                    全国平均<span className={styles.trendText}>100mim</span>
                  </Trend>
                </div>
              </Card>
            </Col>
            <Col {...topColResponsiveProps}>
              <Card title="课后作业">
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                  <Trend flag="up" style={{ marginRight: 16 }}>
                    <span className={styles.trendText}>80%</span>
                  </Trend>
                  <Trend>
                    全国平均<span className={styles.trendText}>20%</span>
                  </Trend>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
        <div>
          <Card
            loading={loading}
            className={styles.offlineCard}
            bordered={false}
            bodyStyle={{ padding: '0 0 32px 0' }}
            style={{ marginTop: 32 }}
          >
            <div style={{ padding: '0 24px' }}>
              <TimelineChart height={400} data={chartData} titleMap={{ y1: '直播出勤/时长' }} />
            </div>
          </Card>
          <Card
            loading={loading}
            className={styles.offlineCard}
            bordered={false}
            bodyStyle={{ padding: '0 0 32px 0' }}
            style={{ marginTop: 32 }}
          >
            <div style={{ padding: '0 24px' }}>
              <TimelineChart height={400} data={chartData} titleMap={{ y1: '回放时长' }} />
            </div>
          </Card>
          <Card
            loading={loading}
            className={styles.offlineCard}
            bordered={false}
            bodyStyle={{ padding: '0 0 32px 0' }}
            style={{ marginTop: 32 }}
          >
            <div style={{ padding: '0 24px' }}>
              <TimelineChart height={400} data={chartData} titleMap={{ y1: '作业数据' }} />
            </div>
          </Card>
          <Card
            loading={loading}
            className={styles.offlineCard}
            bordered={false}
            bodyStyle={{ padding: '0 0 32px 0' }}
            style={{ marginTop: 32 }}
          >
            <div style={{ padding: '0 24px' }}>
              <TimelineChart height={400} data={chartData} titleMap={{ y1: '考试数据' }} />
            </div>
          </Card>
        </div>
      </Card>
    );
  }
}
