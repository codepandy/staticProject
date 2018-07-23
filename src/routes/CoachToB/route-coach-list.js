import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Form, Input, Select, Button, message, Badge, Divider, Upload } from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './route-coach-list.less';
import RouteCoachAdd from './route-coach-add';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['启用', '禁用'];
const sign = ['是', '否'];

@connect(({ coach, loading }) => ({
  coach,
  loading: loading.models.coach,
}))
@Form.create()
export default class RoteCoachList extends PureComponent {
  state = {
    modalVisible: false,
    selectedRows: [],
    formValues: {},
    pageSize: 15,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'coach/fetch',
      payload: { pageSize: this.state.pageSize },
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'coach/fetch',
      payload: params,
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'coach/fetch',
        payload: { pageSize: this.state.pageSize, ...values },
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleAdd = fields => {
    this.props.dispatch({
      type: 'coach/add',
      payload: {
        description: fields.desc,
      },
    });

    message.success('添加成功');
    this.setState({
      modalVisible: false,
    });
  };

  handleSetStatus = (id, _status) => {
    this.props.dispatch({
      type: 'coach/setStatus',
      payload: { id, status: _status },
      callback: () => {},
    });
  };

  handleViewDetail = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'coach/viewDetail',
      payload: { id },
    });
  };

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={2} sm={24}>
            <FormItem>
              {getFieldDecorator('province')(
                <Select placeholder="省份" style={{ width: '100%' }}>
                  <Option value="0">北京市</Option>
                  <Option value="1">河南省</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={2} sm={24}>
            <FormItem label="">
              {getFieldDecorator('schoolType')(
                <Select placeholder="学校-高中" style={{ width: '100%' }}>
                  <Option value="0">学校-高中</Option>
                  <Option value="1">学校-初中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={2} sm={24}>
            <FormItem label="">
              {getFieldDecorator('organization')(
                <Select placeholder="渠道来源" style={{ width: '100%' }}>
                  <Option value="0">湘南海岸-1</Option>
                  <Option value="1">湘南海岸-2</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={2} sm={24}>
            <FormItem label="">
              {getFieldDecorator('isSigned')(
                <Select placeholder="当前签约" style={{ width: '100%' }}>
                  <Option value="1">是</Option>
                  <Option value="-1">否</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={3} sm={24}>
            <FormItem label="">
              {getFieldDecorator('fuzzySearch')(<Input placeholder="所属学校/机构/姓名/手机号" />)}
            </FormItem>
          </Col>

          <Col md={2} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit" onClick={this.handleSearch}>
                查询
              </Button>
            </span>
          </Col>
          <Col md={9} />
          <Col md={1} sm={24}>
            <span className={styles.submitButtons}>
              <Upload accept=".xlsx" action="">
                <Button type="primary" htmlType="submit">
                  批量设置
                </Button>
              </Upload>
            </span>
          </Col>
          <Col md={1} sm={24}>
            <span className={styles.submitButtons}>
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => {
                  this.handleModalVisible(true);
                }}
              >
                添加
              </Button>
            </span>
          </Col>
        </Row>
        <Divider />
      </Form>
    );
  }

  render() {
    const that = this;
    const { coach: { data }, loading } = that.props;
    const { selectedRows, modalVisible } = this.state;
    const columnHeaders = {
      id: 'ID',
      name: '姓名',
      mobile: '手机号',
      organization: '所属学校/机构',
      schoolType: '类型',
      userType: '行政身份',
      isSigned: '学校是否签约',
      createTime: '注册时间',
      takedLessons: '历史带课',
      takingLessons: '当前带课',
      rebates: '返点',
      endTime: '到期时间',
      readingStudents: '在读学生数',
      lastLoginTime: '最新登录时间',
      status: '状态',
      op: '操作',
    };
    const columns = [
      {
        title: columnHeaders.id,
        dataIndex: 'id',
      },
      {
        title: columnHeaders.name,
        dataIndex: 'name',
      },
      {
        title: columnHeaders.mobile,
        dataIndex: 'mobile',
        align: 'center',
      },
      {
        title: columnHeaders.organization,
        dataIndex: 'organization',
      },
      {
        title: columnHeaders.schoolType,
        dataIndex: 'schoolType',
      },
      {
        title: columnHeaders.userType,
        dataIndex: 'userType',
      },
      {
        title: columnHeaders.isSigned,
        dataIndex: 'isSigned',
        align: 'center',
        render(val) {
          return <Badge status={statusMap[val]} text={sign[val]} />;
        },
      },
      {
        title: columnHeaders.createTime,
        dataIndex: 'createTime',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: columnHeaders.takedLessons,
        dataIndex: 'takedLessons',
      },
      {
        title: columnHeaders.takingLessons,
        dataIndex: 'takingLessons',
      },
      {
        title: columnHeaders.rebates,
        dataIndex: 'rebates',
      },
      {
        title: columnHeaders.endTime,
        dataIndex: 'endTime',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: columnHeaders.readingStudents,
        dataIndex: 'readingStudents',
      },
      {
        title: columnHeaders.lastLoginTime,
        dataIndex: 'lastLoginTime',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: columnHeaders.status,
        dataIndex: 'status',
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
        },
      },
      {
        title: '操作',
        render: (val, record) => (
          <Fragment>
            <a
              href=""
              onClick={e => {
                e.preventDefault();
                alert('设置成功！');
              }}
            >
              {status[record.status === 0 ? 1 : 0]}
            </a>
            <Divider type="vertical" />
            <a
              href=""
              onClick={e => {
                e.preventDefault();
                that.handleViewDetail(record.id);
              }}
            >
              详情
            </a>
          </Fragment>
        ),
      },
    ];

    return (
      <PageHeaderLayout title="">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{that.renderSimpleForm()}</div>
            <div>共计教练129人,当前带课530人</div>
            <StandardTable
              isRowSelection={false}
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={columns}
              onSelectRow={that.handleSelectRows}
              onChange={that.handleStandardTableChange}
            />
          </div>
        </Card>
        <RouteCoachAdd
          modalVisible={modalVisible}
          onChangeVisible={() => {
            that.handleModalVisible(false);
          }}
        />
      </PageHeaderLayout>
    );
  }
}
