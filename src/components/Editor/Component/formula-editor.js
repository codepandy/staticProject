import React, { Component } from 'react';
import { Input, Button, Cascader } from 'antd';
import { getFormula, getSvg } from '../API/editor-api';

const { TextArea } = Input;
const styles = {
  input: {
    width: 100,
    textAlign: 'center',
  },
  image: {
    marginTop: 10,
    marginBottom: 10,
  },
};
/*
 * 加formula
 * @params onSumbitData
 *         selections
 *         
 */
export default class FormulaEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      index: 0,
      src: '',
      width: 100,
      isShowSVG: false,
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    const { content } = this.state;
    if (nextState.content !== '' && content !== nextState.content) {
      getSvg(nextState.content).then(data => {
        this.setState({
          src: data,
        });
      });
    }
    return true;
  }
  onChangeWidth = e => {
    this.setState({ width: e.target.value });
  };
  onSumbit = () => {
    const { src, width, content } = this.state;
    const { onSumbitData, API } = this.props;
    getFormula(src, API.getFormula)
      .then(e => this.getImageAspectRatio(e.data))
      .then(object => {
        onSumbitData({ type: 'Formula', width, content, ...object });
      });
  };
  onChangeSymbol = value => {
    const { index, content } = this.state;
    const str = value[value.length - 1];
    const y1 = content.substring(0, index);
    const y2 = content.substring(index);
    const newContent = y1 + str + y2;
    const status = newContent === '';
    this.setState({
      content: newContent,
      index: index + str.length,
      isShowSVG: status,
    });
  };
  getCursor = textarea => {
    const rangeData = { text: '', start: 0, end: 0 };

    if (textarea.setSelectionRange) {
      // W3C
      textarea.focus();
      rangeData.start = textarea.selectionStart;
      rangeData.end = textarea.selectionEnd;
      rangeData.text =
        rangeData.start !== rangeData.end
          ? textarea.value.substring(rangeData.start, rangeData.end)
          : '';
    }
    return rangeData;
  };

  /*
   * 图片高宽比
   * @params url 图片地址
   */
  getImageAspectRatio = url => {
    return this.loadImageAsync(url).then(e => {
      let ar = 0;
      if (e.width) {
        ar = e.height / e.width;
      }
      return { src: url, ar };
    });
  };
  /*
   * 异步获取图片基础信息
   * @params url 图片地址
   */
  loadImageAsync = url => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        resolve(image);
      };
      image.onerror = () => {
        reject(new Error(`Could not load image at${url}`));
      };
      image.src = url;
    });
  };
  displayRender = label => {
    return label[label.length - 1];
  };
  render() {
    const { selections } = this.props;
    const { content, src, width, isShowSVG } = this.state;
    return (
      <div className="formulaEditor">
        <TextArea
          ref={e => {
            this.textarea = e;
          }}
          value={content}
          style={{ width: 300 }}
          placeholder="公式编辑器"
          rows={3}
          autosize="true"
          onChange={e => {
            const { value } = e.target;
            const status = value === '';
            this.setState({
              content: e.target.value,
              index: this.getCursor(this.textarea.textAreaRef).end,
              isShowSVG: status,
            });
          }}
          onMouseUp={() => {
            this.setState({
              index: this.getCursor(this.textarea.textAreaRef).end,
            });
          }}
        />
        <div className="show" style={styles.image}>
          {isShowSVG && <img src={`data:image/svg+xml,${src}`} alt=" " />}
        </div>

        <Cascader
          options={selections}
          expandTrigger="hover"
          displayRender={this.displayRender}
          onChange={this.onChangeSymbol}
        />
        <Input
          value={width}
          style={styles.input}
          onChange={e => {
            this.onChangeWidth(e);
          }}
          placeholder="Width"
        />
        <Button
          onClick={() => {
            this.onSumbit();
          }}
        >
          上传
        </Button>
      </div>
    );
  }
}
