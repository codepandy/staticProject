import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Input, Select, Cascader } from 'antd';

const { Option } = Select;
const FormItem = Form.Item;
// loading 是 dva-loading 这个 dva 的插件内置的 model
@connect(({ bschoolBasicInfo, bschool, loading }) => ({
  bschoolBasicInfo,
  bschool,
  loading: loading.effects['bschool/fetchSearchData'],
}))
export default class SubmitAddSchoolInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };
  }
  render() {
    const { bschool: { city, organization, origin } } = this.props;
    return (
      <div>
        <Card bordered={false}>
          <Form hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...this.formItemLayout} label="请填写学校/机构名：">
              <Input
                placeholder="请填写学校/机构名："
                onChange={e => {
                  this.props.dispatch({
                    type: 'bschoolBasicInfo/setState',
                    payload: { writeSchoolName: e.target.value },
                  });
                }}
              />
            </FormItem>
            <FormItem {...this.formItemLayout} label="学校/机构类型：">
              <Select
                style={{ width: '100%' }}
                placeholder="请填写学校/机构类型："
                onChange={value => {
                  this.props.dispatch({
                    type: 'bschoolBasicInfo/setState',
                    payload: { writeOrganization: value },
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
            </FormItem>
            <FormItem {...this.formItemLayout} label="渠道来源">
              <Select
                style={{ width: '100%' }}
                placeholder="请填写渠道来源"
                onChange={value => {
                  this.props.dispatch({
                    type: 'bschoolBasicInfo/setState',
                    payload: { writeOrigin: value },
                  });
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
            </FormItem>
            <FormItem {...this.formItemLayout} label="地区">
              <Cascader
                filedNames={{ label: 'resultValue', value: 'resultKey', children: 'children' }}
                options={city}
                onChange={() => {}}
                placeholder="请选择地区"
              />
            </FormItem>
            <FormItem {...this.formItemLayout} label="管理员：">
              <Input
                placeholder="请填写管理员"
                onChange={e => {
                  this.props.dispatch({
                    type: 'bschoolBasicInfo/setState',
                    payload: { writeAdminer: e.target.value },
                  });
                }}
              />
            </FormItem>
            <FormItem {...this.formItemLayout} label="电话：">
              <Input
                placeholder="请填写电话号"
                onChange={e => {
                  this.props.dispatch({
                    type: 'bschoolBasicInfo/setState',
                    payload: { writeIphone: e.target.value },
                  });
                }}
              />
            </FormItem>
            <FormItem {...this.formItemLayout} label="看课模式：">
              <Select
                style={{ width: '100%' }}
                placeholder="请选择看课模式"
                onChange={value => {
                  this.props.dispatch({
                    type: 'bschoolBasicInfo/setState',
                    payload: { writeModel: value },
                  });
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
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}
