import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Button, Card, Divider, Row, Col, Select, Input, Table } from 'antd';
import QRCode from 'qrcode.react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './route-coach-detail.less';

const { Option } = Select;
const columns = [
  {
    title: '课程名',
    dataIndex: 'courseName',
  },
  {
    title: '成单量',
    dataIndex: 'orders',
  },
  {
    title: '目标设定',
    dataIndex: 'goal',
  },
];

@connect(({ coach, loading }) => ({
  coach,
  loading: loading.models.coach,
}))
export default class QRCodeSet extends Component {
  state = {
    qrCodeUrl: '',
    qrCodeVal: '',
  };
  renderSimpleForm = () => {
    return (
      <Fragment>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} align="middle">
          <Col md={10} sm={24}>
            <Input
              placeholder="请输入原始链接"
              onChange={e => {
                this.setState({ qrCodeUrl: e.target.value });
              }}
            />
          </Col>
          <Col md={2} sm={24}>
            <QRCode level="M" size={50} value={this.state.qrCodeVal} />,
          </Col>
          <Col md={10} />
          <Col md={1} sm={24}>
            <span className={styles.submitButtons}>
              <Button
                type="primary"
                onClick={e => {
                  e.preventDefault();
                  this.setState({
                    qrCodeVal: this.state.qrCodeUrl,
                  });
                }}
              >
                生成
              </Button>
            </span>
          </Col>
          <Col md={1} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                复制
              </Button>
            </span>
          </Col>
        </Row>
        <Divider />
      </Fragment>
    );
  };
  render() {
    const { coach: { qrCodeData } } = this.props;
    return (
      <PageHeaderLayout title="">
        <Card bordered={false} style={{ height: '100%' }}>
          <div>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <div>
              <Select style={{ width: 200 }}>
                <Option key="1">时间筛选</Option>
              </Select>
              <Button>查询</Button>
            </div>
            <Table rowKey="id" dataSource={qrCodeData.list} columns={columns} />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
