import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Button, Table } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './route-coach-detail.less';
import HistoryRecordList from '../../components/HistoryRecordList/index';
import RouteCoachAdd from './route-coach-add';
import SetAuthority from './route-set-authority';
import AddCommunication from './route-add-communication';

const { Option } = Select;
const huoDongCanYu = [
  {
    id: '0001',
    signInfo: '签约：2017-12-23 xx学校 返点：123',
    courseName: '初一数学(课程名) 有效期：2018-01-02',
    overDue: '未过期',
    color: 'green',
  },
  {
    id: '0002',
    signInfo: '签约：2017-12-23 xx学校 231',
    courseName: '初二数学(课程名) 有效期：2018-01-02',
    overDue: '已过期',
    color: 'red',
  },
  {
    id: '0003',
    signInfo: '签约：2017-12-23 xx学校 432',
    courseName: '初三数学(课程名) 有效期：2018-01-02',
    overDue: '已过期',
    color: 'red',
  },
];
const baseInfo = {
  coachName: '张无忌',
  phoneNumber: '15801115002',
  province: '北京市',
  city: '2',
  schoolAddress: '1',
  school: '1',
  isSigned: '1',
};

const CONST_SIGN = ['已签约', '未签约'];

const modalType = {
  editInfo: 'editInfo',
  setQRCode: 'setQRCode',
  addCommunication: 'addCommunication',
};

@connect(({ coach, loading }) => ({
  coach,
  loading: loading.models.coach,
}))
class CoachDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addModalVisible: false,
      setModalVisible: false,
      communicationModalVisible: false,
    };
  }

  handleModalVisible = (type, flag) => {
    if (type === modalType.editInfo) {
      this.setState({
        addModalVisible: !!flag,
      });
    } else if (type === modalType.setQRCode) {
      this.setState({
        setModalVisible: !!flag,
      });
    } else if (type === modalType.addCommunication) {
      this.setState({
        communicationModalVisible: !!flag,
      });
    }
  };

  handleShowMore = type => {
    if (type === 'authority') {
      this.props.dispatch({
        type: 'coach/fetchAuthrotys',
        callback: () => {},
      });
    } else if (type === 'communication') {
      this.props.dispatch({
        type: 'coach/fetchCommunications',
      });
    } else if (type === 'activity') {
      this.props.dispatch({
        type: 'coach/fetchaActivity',
      });
    } else if (type === 'qrcode') {
      this.props.dispatch({
        type: 'coach/fetchQRCode',
      });
    }
  };
  render() {
    const { addModalVisible, setModalVisible, communicationModalVisible } = this.state;
    const { coach: { currentData } } = this.props;
    const currentCoach = currentData.list.length
      ? currentData.list[0]
      : {
          id: '',
          registerTime: '',
          name: '',
          mobile: '',
          Province: '',
          City: '',
          area: '',
          school: '',
          isSigned: '',
          administrative: '',
        };

    const goodsColumns = [
      { title: '学生ID', dataIndex: 'id', key: 'id' },
      { title: '学生名', dataIndex: 'name', key: 'name' },
      { title: '手机号', dataIndex: 'mobile', key: 'mobile' },
      { title: '渠道来源', dataIndex: 'source', key: 'source', align: 'center' },
      { title: '课程数', dataIndex: 'num', key: 'num', align: 'center' },
      { title: '历史完课率', dataIndex: 'amount', key: 'amount', align: 'center' },
      { title: '当前在读数', dataIndex: 'readingCount', key: 'readingCount', align: 'center' },
      {
        title: '该老师下所学课',
        dataIndex: 'studiedAmount',
        key: 'studiedAmount',
        align: 'center',
      },
      { title: '班级', dataIndex: 'grade', key: 'grade', align: 'center' },
      { title: '完课率', dataIndex: 'classRate', key: 'classRate', align: 'center' },
    ];
    const goodsData = [];
    const breadcrumb = [
      {
        title: '首页',
        href: '/useradmin/coach-to-B',
      },
      {
        title: '用户管理',
        href: '/useradmin/coach-to-B',
      },
      {
        title: 'B端教练',
        href: '/useradmin/coach-to-B',
      },
      {
        title: 'B端教练详情',
        href: '/useradmin/coach-detail',
      },
    ];
    return (
      <PageHeaderLayout title="" breadcrumbList={breadcrumb}>
        <Card
          title="基本信息"
          extra={
            <a
              href=""
              onClick={e => {
                e.preventDefault();
                this.handleModalVisible(modalType.editInfo, true);
              }}
            >
              编辑
            </a>
          }
        >
          <Row className={styles.rowMargin}>
            <Col span={3}>
              <Input
                addonBefore="ID"
                className={styles.disableInput}
                disabled
                value={currentCoach.id}
              />
            </Col>
            <Col span={1} />
            <Col span={3}>
              <Input
                addonBefore="注册时间"
                className={styles.disableInput}
                disabled
                value={currentCoach.registerTime}
              />
            </Col>
          </Row>
          <Row className={styles.rowMargin}>
            <Col span={3}>
              <Input
                addonBefore="姓名"
                className={styles.disableInput}
                disabled
                value={currentCoach.name}
              />
            </Col>
            <Col span={1} />
            <Col span={3}>
              <Input
                addonBefore="联系方式"
                className={styles.disableInput}
                disabled
                value={currentCoach.mobile}
              />
            </Col>
          </Row>
          <Row className={styles.rowMargin}>
            <Col span={3}>
              <Input
                addonBefore="地区"
                className={styles.disableInput}
                disabled
                value={currentCoach.Province}
              />
            </Col>
            <Col span={1} />
            <Col span={3}>
              <Input className={styles.disableInput} disabled value={currentCoach.City} />
            </Col>
          </Row>
          <Row className={styles.rowMargin}>
            <Col span={3}>
              <Input
                addonBefore="所属"
                className={styles.disableInput}
                disabled
                value={currentCoach.area}
              />
            </Col>
            <Col span={1} />
            <Col span={3}>
              <Input className={styles.disableInput} disabled value={currentCoach.school} />
            </Col>
            <Col span={1} />
            <Col span={3}>
              <Input
                className={styles.disableInput}
                disabled
                value={CONST_SIGN[+currentCoach.isSigned]}
              />
            </Col>
            <Col span={1} />
            <Col span={3}>
              <Input
                addonBefore="行政身份"
                className={styles.disableInput}
                disabled
                value={currentCoach.administrative}
              />
            </Col>
          </Row>
        </Card>
        <Row>
          <Col span={12}>
            <HistoryRecordList
              key="couriseAuthority"
              title="课程使用权限"
              maxCount={3}
              showMore
              moreLabel="点击查看更多历史签约"
              data={huoDongCanYu}
              showMoreHandler={() => {
                this.handleShowMore('authority');
              }}
            >
              <div className={styles.buttonContainer}>
                <Button
                  type="primary"
                  onClick={e => {
                    e.preventDefault();
                    this.handleModalVisible(modalType.setQRCode, true);
                  }}
                >
                  设置
                </Button>&nbsp;
                <Button
                  type="primary"
                  onClick={e => {
                    e.preventDefault();
                    this.handleShowMore('qrcode');
                  }}
                >
                  生成二维码
                </Button>
              </div>
            </HistoryRecordList>
          </Col>
          <Col span={12}>
            <HistoryRecordList
              key="CommunicationRecord"
              title="沟通记录"
              maxCount={3}
              showMore
              moreLabel="点击查看更多沟通记录"
              data={huoDongCanYu}
              showMoreHandler={() => {
                this.handleShowMore('communication');
              }}
            >
              <div className={styles.buttonContainer}>
                <Button
                  type="primary"
                  onClick={e => {
                    e.preventDefault();
                    this.handleModalVisible(modalType.addCommunication, true);
                  }}
                >
                  新增沟通记录
                </Button>
              </div>
            </HistoryRecordList>
          </Col>
        </Row>
        <Card title="学生列表">
          <div>
            <a>在读学员：125人</a>
            <a className={styles.marginLeft}>历史学员人次：3432人</a>
          </div>
          <div className={styles.marginTopBottom}>
            <Select style={{ width: '100px' }}>
              <Option value="1">已开课正价课</Option>
            </Select>
            <Select
              placeholder="省级竞赛班 春季班"
              className={styles.marginLeft}
              style={{ width: '200px' }}
            >
              <Option value="1">省级竞赛班 春季班</Option>
              <Option value="2">省级竞赛班 夏季班</Option>
            </Select>
            <Select placeholder="班级" className={styles.marginLeft} style={{ width: '100px' }}>
              <Option value="1">1班</Option>
              <Option value="2">2班</Option>
            </Select>
          </div>
          <Table
            style={{ marginBottom: 24 }}
            pagination={false}
            dataSource={goodsData}
            columns={goodsColumns}
            rowKey="id"
          />
        </Card>
        <HistoryRecordList
          key="activity"
          title="活动参与"
          isExtra
          maxCount={3}
          showMore
          moreLabel="点击查看更多历史签约"
          data={huoDongCanYu}
          showMoreHandler={() => {
            this.handleShowMore('activity');
          }}
        />
        <RouteCoachAdd
          data={baseInfo}
          modalVisible={addModalVisible}
          onChangeVisible={flag => {
            this.handleModalVisible(modalType.editInfo, flag);
          }}
        />
        <SetAuthority
          width={900}
          modalVisible={setModalVisible}
          onChangeVisible={flag => {
            this.handleModalVisible(modalType.setQRCode, flag);
          }}
        />
        <AddCommunication
          modalVisible={communicationModalVisible}
          onChangeVisible={flag => {
            this.handleModalVisible(modalType.addCommunication, flag);
          }}
        />
      </PageHeaderLayout>
    );
  }
}
export default Form.create()(CoachDetail);
