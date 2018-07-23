import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Col, Table, Select, Input, Button, Modal, message, Card } from 'antd';
import SubmitAddSchoolInfo from 'components/Bschool/submitAddSchoolInfo';
import styles from './BSchool.less';

const { Option } = Select;
// loading 是 dva-loading 这个 dva 的插件内置的 model
@connect(({ bschool, editSchool, loading }) => ({
  bschool,
  editSchool,
  loading: loading.effects['bschool/fetchSearchData'],
}))
export default class BSchool extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'bschool/fetchSearchData',
    });
  }

  componentWillUnmount() {
    // this.props.dispatch({
    //   type: 'bschool/clear',
    // });
  }
  showAddSchool = () => {
    this.props.dispatch({
      type: 'bschool/setState',
      payload: {
        addSchoolVisible: true,
      },
    });
  };
  submitAddSchoolInfo = () => {
    const { editSchool: { writeSchoolName, writeOrganization, writeProvice } } = this.props;
    if (!writeSchoolName) {
      return message.warning('请输入学校/机构名');
    }
    if (!writeOrganization) {
      return message.warning('请输入学校/机构类型');
    }
    if (!writeProvice) {
      return message.warning('请输入地区');
    }
    this.props.dispatch({
      type: 'editSchool/submitAddSchoolInfo',
    });
  };
  jumpSchoolDetail = schoolId => {
    this.props.dispatch(
      routerRedux.push(`/useradmin/b-school/all-detail/${schoolId}?schoolId=${schoolId}`)
    );
  };
  render() {
    const {
      bschool: {
        provices,
        querySearchData,
        querySearchDataError,
        organization,
        origin,
        competitionGrade,
        selfGrade,
        signCeremony,
        addSchoolVisible,
      },
    } = this.props;
    const columns = [
      {
        title: 'ID',
        dataIndex: 'schoolId',
        key: 'schoolId',
      },
      {
        title: '名称',
        dataIndex: 'schoolName',
        key: 'schoolName',
      },
      {
        title: '类型',
        dataIndex: 'schoolType',
        key: 'schoolType',
      },
      {
        title: '渠道来源',
        dataIndex: 'schoolOrigin',
        key: 'schoolOrigin',
      },
      {
        title: '看课模式',
        dataIndex: 'schoolModel',
        key: 'schoolModel',
      },
      {
        title: '管理员',
        dataIndex: 'schoolAdmin',
        key: 'schoolAdmin',
      },
      {
        title: '手机号',
        dataIndex: 'shoolIphone',
        key: 'shoolIphone',
      },
      {
        title: '入驻时间',
        dataIndex: 'schoolEnterTime',
        key: 'schoolEnterTime',
      },
      {
        title: '历史签约',
        dataIndex: 'schoolHistory',
        key: 'schoolHistory',
      },
      {
        title: '当前签约',
        dataIndex: 'schoolCurrent',
        key: 'schoolCurrent',
      },
      {
        title: '到期时间',
        dataIndex: 'schoolExpireTime',
        key: 'schoolExpireTime',
      },
      {
        title: '当前教练数',
        dataIndex: 'schoolCurrentTeacher',
        key: 'schoolCurrentTeacher',
      },
      {
        title: '在读学生数',
        dataIndex: 'schoolCurrentStudent',
        key: 'schoolCurrentStudent',
      },
      {
        title: '最近联系',
        dataIndex: 'schoolRecentlyConnect',
        key: 'schoolRecentlyConnect',
      },
      {
        title: '操作',
        dataIndex: 'count11',
        key: 'count11',
        render: (opetation, record) => {
          return <a onClick={this.jumpSchoolDetail.bind(null, record.schoolId)}>详情</a>;
        },
      },
    ];
    const topColResponsiveProps = {
      xs: 12, // <576px
      sm: 6, // ≥576px
      md: 5, // ≥768px
      lg: 4, // ≥992px
      xl: 3, // ≥1200px
      style: { marginBottom: 24 },
    };
    const bSchool = (
      <div className={styles.bSchoolLine}>
        <Row gutter={12}>
          <Col {...topColResponsiveProps}>
            <Select
              placeholder="请选择省份"
              style={{ width: '100%' }}
              onChange={value => {
                this.props.dispatch({
                  type: 'bschool/setState',
                  payload: { selectSchoolName: value },
                });
              }}
            >
              {provices.map(item => {
                return (
                  <Option value={item.resultKey} key={item.resultKey}>
                    {item.resultValue}
                  </Option>
                );
              })}
            </Select>
          </Col>
          <Col {...topColResponsiveProps}>
            <Select
              placeholder="全部"
              style={{ width: '100%' }}
              onChange={value => {
                this.props.dispatch({
                  type: 'bschool/setState',
                  payload: { selectOrganization: value },
                });
              }}
            >
              {organization.map(item => {
                return (
                  <Option value={item.resultKey} key={item.resultKey}>
                    {item.resultValue}
                  </Option>
                );
              })}
            </Select>
          </Col>
          <Col {...topColResponsiveProps}>
            <Select
              placeholder="渠道来源"
              style={{ width: '100%' }}
              onChange={value => {
                this.props.dispatch({ type: 'bschool/setState', payload: { selectOrigin: value } });
              }}
            >
              {origin.map(item => {
                return (
                  <Option value={item.resultKey} key={item.resultKey}>
                    {item.resultValue}
                  </Option>
                );
              })}
            </Select>
          </Col>
          <Col {...topColResponsiveProps}>
            <Select
              placeholder="竞赛等级"
              style={{ width: '100%' }}
              onChange={value => {
                this.props.dispatch({
                  type: 'bschool/setState',
                  payload: { selectCompetitionGrade: value },
                });
              }}
            >
              {competitionGrade.map(item => {
                return (
                  <Option value={item.resultKey} key={item.resultKey}>
                    {item.resultValue}
                  </Option>
                );
              })}
            </Select>
          </Col>
          <Col {...topColResponsiveProps}>
            <Select
              placeholder="自招等级"
              style={{ width: '100%' }}
              onChange={value => {
                this.props.dispatch({
                  type: 'bschool/setState',
                  payload: { selectSelfGrade: value },
                });
              }}
            >
              {selfGrade.map(item => {
                return (
                  <Option value={item.resultKey} key={item.resultKey}>
                    {item.resultValue}
                  </Option>
                );
              })}
            </Select>
          </Col>
          <Col {...topColResponsiveProps}>
            <Select
              placeholder="高考等级"
              style={{ width: '100%' }}
              onChange={value => {
                this.props.dispatch({
                  type: 'bschool/setState',
                  payload: { selectExamGrade: value },
                });
              }}
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" disabled>
                Disabled
              </Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
          <Col {...topColResponsiveProps}>
            <Select
              placeholder="请选择是否签约"
              style={{ width: '100%' }}
              onChange={value => {
                this.props.dispatch({
                  type: 'bschool/setState',
                  payload: { selectSignCeremony: value },
                });
              }}
            >
              {signCeremony.map(item => {
                return (
                  <Option value={item.resultKey} key={item.resultKey}>
                    {item.resultValue}
                  </Option>
                );
              })}
            </Select>
          </Col>
          <Col {...topColResponsiveProps}>
            <Row>
              <Col span={12}>
                <Input
                  placeholder="名称 / ID"
                  onChange={e => {
                    this.props.dispatch({
                      type: 'bschool/setState',
                      payload: { writeStudentInfo: e.target.value },
                    });
                  }}
                />
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <Button>查询</Button>
              </Col>
            </Row>
          </Col>
          <Col xl={1} lg={2} md={2} sm={3} xs={6} style={{ textAlign: 'right' }}>
            <Button onClick={this.showAddSchool}>添加</Button>
          </Col>
        </Row>
      </div>
    );
    return (
      <Fragment>
        <Card title={bSchool} loading={this.props.loading}>
          <div>共计入驻 1000 家 当前签约990家</div>
          <div>
            <Table
              rowKey={record => record.schoolId}
              size="small"
              bordered
              columns={columns}
              dataSource={querySearchData}
              locale={{ emptyText: querySearchDataError }}
            />
          </div>
          <div>
            <Modal
              title="学校/机构添加编辑"
              visible={addSchoolVisible}
              onOk={this.submitAddSchoolInfo}
              onCancel={() => {
                this.props.dispatch({
                  type: 'bschool/setState',
                  payload: {
                    addSchoolVisible: false,
                  },
                });
              }}
            >
              <SubmitAddSchoolInfo />
            </Modal>
          </div>
        </Card>
      </Fragment>
    );
  }
}
