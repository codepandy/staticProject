import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Modal, Card } from 'antd';
import SubmitAddSchoolInfo from 'components/Bschool/submitAddSchoolInfo';
@connect(({ bschoolBasicInfo }) => ({
  bschoolBasicInfo,
}))
export default class BasicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const rowStyle = {
      margin: '20px 10px',
    };
    const basicInfoStyle = {
      border: '1px solid #333',
      padding: '5px 5px 5px 10px',
    };
    const paddingTOp = {
      paddingTop: 5,
    };
    const { bschoolBasicInfo: { basicInfoEditVisible } } = this.props;
    return (
      <Fragment>
        <Card
          title="基本信息"
          extra={
            <a
              onClick={() => {
                this.props.dispatch({
                  type: 'bschoolBasicInfo/setState',
                  payload: {
                    basicInfoEditVisible: true,
                  },
                });
              }}
            >
              编辑
            </a>
          }
        >
          <div>
            <Row gutter={36} style={rowStyle}>
              <Col span={6}>
                <Row>
                  <Col span={8} style={paddingTOp}>
                    ID编号：
                  </Col>
                  <Col span={16} style={basicInfoStyle}>
                    北京四中
                  </Col>
                </Row>
              </Col>
              <Col span={6}>
                <Row>
                  <Col span={8} style={paddingTOp}>
                    学校：
                  </Col>
                  <Col span={16} style={basicInfoStyle}>
                    北京四中
                  </Col>
                </Row>
              </Col>
              <Col span={6}>
                <Row>
                  <Col span={8} style={paddingTOp}>
                    类型：
                  </Col>
                  <Col span={16} style={basicInfoStyle}>
                    北京四中
                  </Col>
                </Row>
              </Col>
              <Col span={6}>
                <Row>
                  <Col span={8} style={paddingTOp}>
                    渠道来源：
                  </Col>
                  <Col span={16} style={basicInfoStyle}>
                    北京四中
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row gutter={36} style={rowStyle}>
              <Col span={6}>
                <Row>
                  <Col span={8} style={paddingTOp}>
                    入驻时间：
                  </Col>
                  <Col span={16} style={basicInfoStyle}>
                    北京四中
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row gutter={36} style={rowStyle}>
              <Col span={6}>
                <Row>
                  <Col span={8} style={paddingTOp}>
                    地区：
                  </Col>
                  <Col span={16} style={basicInfoStyle}>
                    北京四中
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row gutter={36} style={rowStyle}>
              <Col span={6}>
                <Row>
                  <Col span={8} style={paddingTOp}>
                    管理员：
                  </Col>
                  <Col span={16} style={basicInfoStyle}>
                    北京四中
                  </Col>
                </Row>
              </Col>
              <Col span={6}>
                <Row>
                  <Col span={8} style={paddingTOp}>
                    联系方式：
                  </Col>
                  <Col span={16} style={basicInfoStyle}>
                    北京四中
                  </Col>
                </Row>
              </Col>
              <Col span={6}>
                <Row>
                  <Col span={8} style={paddingTOp}>
                    看课模式：
                  </Col>
                  <Col span={16} style={basicInfoStyle}>
                    北京四中
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          {basicInfoEditVisible ? (
            <div>
              <Modal
                title="学校/机构添加编辑"
                visible={basicInfoEditVisible}
                onOk={() => {}}
                onCancel={() => {
                  this.props.dispatch({
                    type: 'bschoolBasicInfo/setState',
                    payload: {
                      basicInfoEditVisible: false,
                    },
                  });
                }}
              >
                <SubmitAddSchoolInfo />
              </Modal>
            </div>
          ) : null}
        </Card>
      </Fragment>
    );
  }
}
