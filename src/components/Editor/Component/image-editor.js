import React, { Component } from 'react';
import { Upload, Button, Icon, Input, Modal } from 'antd';

const styles = {
  urlInputContainer: {
    marginBottom: 10,
  },
  input: {
    width: 100,
    textAlign: 'center',
  },
};
/*
 * 加image
 * @params onSumbitData
 *           
 */
export default class ImageEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewImage: '',
      previewVisible: false,
      fileList: [],
      width: 100,
    };
  }
  onChangeWidth = e => {
    this.setState({ width: e.target.value });
  };
  onInputKeyDown = e => {
    if (e.which === 13) {
      this.onSumbit();
    }
  };
  onSumbit = () => {
    const { width, fileList } = this.state;
    const { onSumbitData } = this.props;
    const { data } = fileList[0].response;
    const getImage2 = new Promise(resolve => {
      resolve(data);
    });
    getImage2.then(e => this.getImageAspectRatio(e)).then(object => {
      onSumbitData({ type: 'Image', width, ...object });
    });
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
  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };
  handleChange = ({ fileList }) => {
    this.setState({ fileList });
  };
  handleCancel = () => this.setState({ previewVisible: false });
  render() {
    const { width, fileList, previewVisible, previewImage } = this.state;
    const { API } = this.props;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">添加图片</div>
      </div>
    );
    return (
      <div style={styles.urlInputContainer}>
        <div style={{ overflow: 'auto' }}>
          <Upload
            action={API.getImage}
            listType="picture-card"
            name="file"
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>
        {/* <Input
          onChange={this.onChangeLocalURL}
          ref={target => {
            this.file = target;
          }}
          type="file"
          accept="image/gif, image/jpeg, image/png"
          value={localUrl}
        /> */}
        <Input
          onChange={this.onChangeWidth}
          type="text"
          style={styles.input}
          value={width}
          onKeyDown={this.onInputKeyDown}
          placeholder="Width"
        />
        <Button onMouseDown={this.onSumbit}>上传</Button>
      </div>
    );
  }
}
