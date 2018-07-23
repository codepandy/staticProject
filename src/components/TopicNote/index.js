import React from 'react';
import { Row, Col, Input } from 'antd';

export default function TopicNote(props) {
  const { display, rowClass, warnFont, maxLength, onChange, value } = props;
  return (
    <div style={{ display }}>
      <Row className={rowClass}>
        <Col span={24}>
          理由：<span className={warnFont}>文字内容不超过{maxLength}个字</span>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Input.TextArea
            value={value}
            maxLength={maxLength}
            onChange={onChange}
            autosize={{ minRows: 2, maxRows: 2 }}
          />
        </Col>
      </Row>
    </div>
  );
}
