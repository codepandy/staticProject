import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Col, Table, Select, Input, Button, Card, message } from 'antd';

const { Option } = Select;
// loading 是 dva-loading 这个 dva 的插件内置的 model
@connect(({ bcStudent, editSchool, loading }) => ({
  bcStudent,
  editSchool,
  loading: loading.effects['bcStudent/fetchSearchData'],
}))
export default class BCstudent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.columns = [
      {
        title: 'ID',
        dataIndex: 'studentId',
        key: 'studentId',
      },
      {
        title: '学生名',
        dataIndex: 'studentName',
        key: 'studentName',
      },
      {
        title: '手机号',
        dataIndex: 'studentIphone',
        key: 'studentIphone',
      },
      {
        title: '就读学校',
        dataIndex: 'attendSchool',
        key: 'attendSchool',
      },
      {
        title: '所属学校/机构',
        dataIndex: 'belongTOSchool',
        key: 'belongTOSchool',
      },
      {
        title: '注册时间',
        dataIndex: 'signTime',
        key: 'signTime',
      },
      {
        title: '试用账号',
        dataIndex: 'trialAccount',
        key: 'trialAccount',
      },
      {
        title: '渠道来源',
        dataIndex: 'studentOrigin',
        key: 'studentOrigin',
      },
      {
        title: '最高获奖',
        dataIndex: 'highestAward',
        key: 'highestAward',
      },
      {
        title: '自招',
        dataIndex: 'selfRecruit',
        key: 'selfRecruit',
      },
      {
        title: '毕业去向',
        dataIndex: 'graduatePlace',
        key: 'graduatePlace',
      },
      {
        title: '课程数',
        dataIndex: 'coursesNumber',
        key: 'coursesNumber',
      },
      {
        title: '历史完课率',
        dataIndex: 'historyCourses',
        key: 'historyCourses',
      },
      {
        title: '是否在读',
        dataIndex: 'currentReading',
        key: 'currentReading',
      },
      {
        title: '完课率',
        dataIndex: 'compeleteCoursesRate',
        key: 'compeleteCoursesRate',
      },
      {
        title: '最新登录时间',
        dataIndex: 'latestLoginTime',
        key: 'latestLoginTime',
      },
      {
        title: '状态',
        dataIndex: 'studentStatus',
        key: 'studentStatus',
      },
      {
        title: '操作',
        dataIndex: 'count11',
        key: 'count11',
        render: (opetation, record) => {
          const arr = [];
          arr.push(
            <p key={1}>
              <a onClick={this.forbidOrOpenStudent.bind(null, record.schoolId)}>禁用</a>
            </p>
          );
          arr.push(
            <p key={2}>
              <a onClick={this.jumpSchoolDetail.bind(null, record.schoolId)}>详情</a>
            </p>
          );

          return arr;
        },
      },
    ];
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'bcStudent/fetchSearchData',
    });
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'bcStudent/clear',
    });
  }
  forbidOrOpenStudent = () => {};
  jumpSchoolDetail = schoolId => {
    this.props.dispatch(routerRedux.push(`/useradmin/b-c-student-detail/${schoolId}`));
  };
  searchStudentInfoList = () => {
    const {
      selectProvices,
      selectOrganization,
      selectOrigin,
      selectSignCeremony,
    } = this.props.bcStudent;
    if (selectProvices || selectOrganization || selectOrigin || selectSignCeremony) {
      return message.warning('请选择至少一个查询条件');
    }
    this.props.dispatch({
      type: 'bcStudent/searchStudentInfoList',
    });
  };
  render() {
    const {
      bcStudent: {
        provices,
        querySearchData,
        organization,
        origin,
        signCeremony,
        confirmSearchStudentInfo,
      },
    } = this.props;
    const topColResponsiveProps = {
      xs: 12, // <576px
      sm: 6, // ≥576px
      md: 4, // ≥768px
      lg: 4, // ≥992px
      xl: 4, // ≥1200px
      style: { marginBottom: 24 },
    };
    const bsStudent = (
      <Row gutter={12}>
        <Col {...topColResponsiveProps}>
          <Select
            placeholder="请选择省份"
            style={{ width: '100%' }}
            onChange={value => {
              this.props.dispatch({
                type: 'bcStudent/setState',
                payload: { selectProvices: value },
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
                type: 'bcStudent/setState',
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
              this.props.dispatch({ type: 'bcStudent/setState', payload: { selectOrigin: value } });
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
            placeholder="请选择是否签约"
            style={{ width: '100%' }}
            onChange={value => {
              this.props.dispatch({
                type: 'bcStudent/setState',
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
            <Col span={24}>
              <Input
                placeholder="所属学校/机构/姓名/手机号"
                onChange={e => {
                  this.props.dispatch({
                    type: 'bcStudent/setState',
                    payload: { writeStudentInfo: e.target.value },
                  });
                }}
              />
            </Col>
          </Row>
        </Col>
        <Col {...topColResponsiveProps}>
          <Row>
            <Col span={24}>
              <Button
                type="primary"
                onClick={this.searchStudentInfoList}
                loading={confirmSearchStudentInfo}
              >
                查询
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    );
    return (
      <Fragment>
        <Card title={bsStudent} loading={this.props.loading}>
          <p>共计学生 xxx 人 在读xx人</p>
          <div>
            <Table
              rowKey={record => record.studentId}
              size="small"
              bordered
              columns={this.columns}
              dataSource={querySearchData}
            />
          </div>
        </Card>
      </Fragment>
    );
  }
}
