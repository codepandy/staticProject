import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Card,
  Row,
  Col,
  Input,
  Button,
  Modal,
  Radio,
  Checkbox,
  Tag,
  Divider,
  Tree,
  Upload,
  Icon,
  Select,
} from 'antd';
import uuidv1 from 'uuid/v1';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import CheckableTagGroup from '../../../components/CheckableTagGroup';
import styles from './route-material-common.less';
import Editor from '../../../components/Editor/MyEditor';
import { UPLOAD_PATH } from '../../../common/constant';
import TopicNote from '../../../components/TopicNote';

const { Option } = Select;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const { TreeNode } = Tree;
const questionTypes = [
  { value: '0', text: '单选' },
  { value: '1', text: '多选' },
  { value: '2', text: '不定项' },
  { value: '3', text: '判断' },
  { value: '4', text: '填空' },
  { value: '5', text: '解答' },
  { value: '6', text: '作图' },
  { value: '7', text: '证明' },
];
const requiredIndex = [0, 1, 4];
const checkboxIndex = [5, 6];
const showOptions = ['0', '1', '2'];
const showAnswer = ['7'];
const OptionLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const EditStatus = { addMain: '0', addTarget: '1', verify: '2', audit: '3', edit: '4' };
const EditMainStatus = [EditStatus.addMain, EditStatus.edit];
const EditTarget = [EditStatus.addTarget, EditStatus.edit];
const EditVerify = [EditStatus.verify, EditStatus.edit];
const EditAudit = [EditStatus.audit, EditStatus.edit];
const VisibleTarget = [EditStatus.audit, EditStatus.verify, EditStatus.addTarget, EditStatus.edit];
const VisibleVerify = [EditStatus.audit, EditStatus.verify, EditStatus.edit];
const VisibleAudit = [EditStatus.audit, EditStatus.edit];
const sourceTypes = {
  test: '试卷',
  book: '书籍',
  network: '网络',
  original: '爱尖子原创',
};
const sourceTypeKeys = {
  test: 'test',
  book: 'book',
  network: 'network',
  original: 'original',
};
const FieldType = { year: 'year', bookName: 'bookName' };
const TrueFalse = [{ label: '是', value: '0' }, { label: '否', value: '1' }];
const TrueFalseValue = { true: '0', false: '1' };
const targetOptions = {
  subject: 0,
  scope: 1,
  department: 2,
  source: 3,
  degree: 4,
  level: 5,
  method: 6,
};
@connect(({ teachResearch, loading }) => ({
  teachResearch,
  loading: loading.models.teachResearch,
}))
class MaterialList extends Component {
  constructor(props) {
    super(props);
    this.state = this.initState();
  }
  componentWillMount() {
    const { match } = this.props;
    if (match.id) {
      this.setState({
        recordId: match.id,
      });
    }
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'teachResearch/getTagItemByNameBatch',
      payload: { nameListStr: '学科,范围,学部,来源,难度,层次,思想方法' },
    });
    dispatch({
      type: 'teachResearch/fetchKnowledgeList',
      payload: { pageSize: 30 },
    });
  }

  componentWillReceiveProps(nextProps) {
    const { teachResearch: { refreshEditMaterial, sourceItem } } = nextProps;
    const { sourceRecordData } = this.state;
    if (refreshEditMaterial) {
      this.setState({
        ...this.initState(),
      });
    }
    if (sourceItem && sourceItem.index >= 0) {
      sourceRecordData[sourceItem.index] = sourceItem.id;
    }
  }

  onChangeType = (checked, item) => {
    this.setState({
      questionType: item.value,
      answers: [],
    });
  };

  onChangeSourceType = (key, value) => {
    const { sourceRecords, sourceRecordData } = this.state;
    if (sourceRecords.length !== sourceRecordData.length) {
      Modal.warning({
        title: '请先保存上面的来源',
        content: '必须先保存原有来源，才能增加新的来源。',
        okText: '确认',
      });
      return;
    }
    sourceRecords.push({ key, type: value });
    this.setState({
      sourceRecords,
    });
    this.props.dispatch({
      type: 'teachResearch/getSourceYearByType',
      payload: { key, value },
    });
  };

  onAddOptions = () => {
    const { optionsData } = this.state;
    const len = optionsData.length;
    if (len === 10) {
      Modal.warning({
        title: '选项最多10个！',
        content: '选项最多只能添加10个！',
        okText: '确认',
      });
      return;
    }
    optionsData.push({ index: uuidv1(), value: '' });
    this.setState({
      optionsData,
    });
  };

  onDelOption = index => {
    const { optionsData } = this.state;
    const len = optionsData.length;
    if (len === 2) {
      Modal.warning({
        title: '选项最少2个！',
        content: '选项最少需要2个，不能继续删除！',
        okText: '确认',
      });
      return;
    }
    for (let i = 0; i < len; i += 1) {
      if (optionsData[i].index === index) {
        optionsData.splice(i, 1);
        break;
      }
    }
    this.setState({
      optionsData,
    });
  };

  onSetAnswer = item => {
    const { questionType } = this.state;
    let answer = [];
    if (questionType === questionTypes[0].value || questionType === questionTypes[3].value) {
      answer.push(item.target.value);
    } else if (questionType === questionTypes[1].value || questionType === questionTypes[2].value) {
      answer = [...item];
    }

    this.setState({
      answers: answer,
    });
  };

  onChangeOption = (val, index) => {
    const { optionsData } = this.state;
    const options = optionsData.filter(item => item.index === index);
    options[0].value = JSON.stringify(val);
    this.setState({
      optionsData,
    });
  };

  onAddFillTopicAnswer = () => {
    const { fillTopicAnswer } = this.state;
    fillTopicAnswer.push({ uuid: uuidv1(), value: '' });
    this.setState({
      fillTopicAnswer,
    });
  };

  onChangeFillTopicAnswer = (e, uuid) => {
    const { fillTopicAnswer } = this.state;
    const answer = fillTopicAnswer.filter(item => item.uuid === uuid);
    answer[0].value = e.target.value;
    this.setState({
      fillTopicAnswer,
    });
  };

  onDelFillTopicAnswer = uuid => {
    const { fillTopicAnswer } = this.state;
    const len = fillTopicAnswer.length;
    if (len === 1) {
      Modal.warning({
        title: '至少一个答案！',
        content: '填空题至少一个填空！',
        okText: '确认',
      });
      return;
    }
    for (let i = 0; i < len; i += 1) {
      if (uuid === fillTopicAnswer[i].uuid) {
        fillTopicAnswer.splice(i, 1);
        break;
      }
    }
    this.setState({
      fillTopicAnswer,
    });
  };

  onAddDetailedAnnotation = () => {
    const { detailedAnnotationData } = this.state;
    detailedAnnotationData.push({ uuid: uuidv1(), value: '' });
    this.setState({
      detailedAnnotationData,
    });
  };

  onShowTargetModal = visible => {
    this.setState({
      targetModalVisible: visible,
    });
  };

  onSetTarget = () => {
    this.setState({
      showTargetList: true,
      targetModalVisible: false,
    });
  };

  onGetTargetTree = () => {
    const { targetType } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'teachResearch/getTargetTree',
      payload: { hierarchyId: targetType },
    });
    this.setState({
      targetModalVisible: true,
    });
  };

  onCheckNode = checkedKeys => {
    const paths = [];
    const { teachResearch: { subjectTreeData } } = this.props;
    const { targetObj } = this.state;
    targetObj.point = checkedKeys;
    checkedKeys.forEach(item => {
      const pathNodes = [];
      this.getNodePathText(item, subjectTreeData, pathNodes);
      paths.push(pathNodes);
    });

    this.setState({
      targetPaths: paths,
      targetObj,
    });
  };

  onSaveMain = () => {
    const {
      content,
      questionType,
      optionsData,
      answers,
      analyzeData,
      detailedAnnotationData,
    } = this.state;
    this.props.dispatch({
      type: 'teachResearch/addAndSubmitQuestionContent',
      payload: {
        id: '',
        content: {
          analysis: JSON.stringify({ explain: analyzeData, detail: detailedAnnotationData }),
          content: JSON.stringify(content),
          question: JSON.stringify(optionsData),
          result: JSON.stringify(answers),
          type: questionType,
        },
      },
    });
  };

  onEditorChange = (val, isEmpty) => {
    this.setState({
      topicIsEmpty: isEmpty,
    });
    if (isEmpty) {
      this.setState({
        content: {
          main: JSON.stringify(val),
        },
      });
    }
  };

  onChangeAnalyze = (val, index) => {
    const { analyzeData } = this.state;
    analyzeData[index].value = JSON.stringify(val);
    this.setState({
      analyzeData,
    });
  };

  onChangeDetail = (val, index) => {
    const { detailedAnnotationData } = this.state;
    detailedAnnotationData[index].value = JSON.stringify(val);
    this.setState({
      detailedAnnotationData,
    });
  };

  onCancelPreview = () => {
    const { uploadImages } = this.state;
    this.setState({
      uploadImages: { ...uploadImages, previewVisible: false },
    });
  };

  onSetUploadImage = ({ fileList }) => {
    const { uploadImages, content } = this.state;
    this.setState({
      uploadImages: { ...uploadImages, fileList },
      content: { ...content, image: JSON.stringify(fileList) },
    });
  };

  onPreviewImage = file => {
    const { uploadImages } = this.state;
    uploadImages.previewImage = file.url || file.thumbUrl;
    uploadImages.previewVisible = true;
    this.setState({
      uploadImages: { ...uploadImages },
    });
  };

  onDelSourceType = index => {
    Modal.warning({
      title: '保存后不可恢复',
      content: '保存后不可恢复，确认要删除吗？',
      okText: '确认',
      onOk: () => {
        const { sourceRecords, sourceRecordData } = this.state;
        sourceRecords.splice(index, 1);
        if (index <= sourceRecordData.length) {
          sourceRecordData.splice(index, 1);
        }
        this.setState({
          sourceRecords,
          sourceRecordData,
        });
      },
    });
  };

  onChangeSource = (value, key, index, fieldType) => {
    const { sourceRecords } = this.state;
    sourceRecords[index] = { ...sourceRecords[index], ...value };
    if (fieldType === FieldType.year) {
      this.props.dispatch({
        type: 'teachResearch/getSourceByNameAndYear',
        payload: { key, name: sourceTypes[key], ...value },
      });
    } else if (key === sourceTypeKeys.book && fieldType === FieldType.bookName) {
      const { teachResearch: { sourceName } } = this.props;
      const source = (sourceName[key] || []).filter(item => item.id === value.sourceId);
      sourceRecords[index].authorName = source[0].author;
    }

    this.setState({
      sourceRecords,
    });
  };

  onChangeMainSource = index => {
    const { sourceRecordData } = this.state;
    if (sourceRecordData.length - 1 < index) {
      Modal.warning({
        title: '请先保存来源。',
        content: '来源必须先保存，才能设置成主来源。',
        okText: '确认',
      });
      return;
    }
    this.setState({
      mainSourceIndex: index,
    });
  };

  onSaveSource = index => {
    const { sourceName } = this.props;
    const { sourceRecords } = this.state;
    const record = sourceRecords[index];
    const payload = { index, params: {} };
    payload.params = { sourceId: record.sourceId || '' };
    if (record.key === sourceTypeKeys.test) {
      payload.params.tagItem1 = record.qnum;
      payload.params.tagType1 = sourceTypes.test;
    } else if (record.key === sourceTypeKeys.book) {
      payload.params.tagItem1 = record.pageNum;
      payload.params.tagType1 = sourceTypes.book;
      payload.params.tagItem1 = record.qnum;
      payload.params.tagType1 = sourceTypes.test;
    } else if ([sourceTypeKeys.original, sourceTypeKeys.network].includes(record.key)) {
      payload.params.sourceId = sourceName && sourceName.length ? sourceName[0].id : '';
      payload.params.tagItem1 = record.year;
      payload.params.tagType1 = sourceTypes[record.key];
    }
    this.props.dispatch({
      type: 'teachResearch/addSourceItem',
      payload,
      callback: () => {
        const modal = Modal.success({
          title: '保存成功！',
          content: '来源已保存成功！',
          okText: '确认',
        });
        setTimeout(() => modal.destroy(), 1000);
      },
    });
  };

  onChangeTarget = (target, index) => {
    const { targetObj } = this.state;
    switch (index) {
      case targetOptions.subject:
        targetObj.subjectId = target.value;
        break;
      case targetOptions.scope:
        targetObj.scopeId = target.value;
        break;
      case targetOptions.department:
        targetObj.departmentId = target.value;
        break;
      case targetOptions.degree:
        targetObj.degreeId = target.value;
        break;
      case targetOptions.level:
        targetObj.level = target;
        break;
      case targetOptions.method:
        targetObj.method = target;
        break;
      default:
        break;
    }
    this.setState({
      targetObj,
    });
  };

  onChangeKnowle = value => {
    this.setState({
      targetType: value,
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'teachResearch/getTargetTree',
      payload: { hierarchyId: value },
    });
  };

  onChangeAudit = e => {
    this.setState({
      audit: e.target.value,
    });
  };

  onChangeAuditNote = e => {
    this.setState({
      auditNote: e.target.value,
    });
  };

  onChangeVerify = e => {
    this.setState({
      verify: e.target.value,
    });
  };

  onChangeVerifyNote = e => {
    this.setState({
      verifyNote: e.target.value,
    });
  };

  onSaveTarget = () => {
    const { recordId, targetObj, mainSourceIndex, sourceRecordData } = this.state;
    if (
      targetObj.subjectId.toString().length === 0 ||
      targetObj.scopeId.toString().length === 0 ||
      sourceRecordData.length === 0 ||
      mainSourceIndex < 0 ||
      targetObj.level.length === 0 ||
      targetObj.point.length === 0
    ) {
      Modal.warning({
        title: '请填写必填项！',
        content: '学科、范围、来源、主来源、难度、知识点为必填项！',
        okText: '确认',
      });
      return;
    }
    targetObj.mainSource[0] = sourceRecordData[mainSourceIndex];
    targetObj.source = sourceRecordData;
    this.props.dispatch({
      type: 'teachResearch/AddTarget',
      payload: {
        id: recordId,
        params: targetObj,
      },
    });
  };

  onSaveVerify = () => {
    const { recordId, verify, verifyNote } = this.state;
    let note = verifyNote;
    if (verify === TrueFalseValue.false && verifyNote.length === 0) {
      Modal.warning({
        title: '请填写未通过理由',
        content: '请填写未通过理由，以帮助题目做出改正！',
        okText: '确认',
      });
      return;
    }
    note = '通过';
    this.props.dispatch({
      type: 'teachResearch/saveTopicVerify',
      payload: {
        id: recordId,
        status: verify,
        note,
      },
    });
  };

  onSaveAudit = () => {
    const { recordId, audit, auditNote } = this.state;
    let note = auditNote;
    if (audit === TrueFalseValue.false && auditNote.length === 0) {
      Modal.warning({
        title: '请填写未通过理由',
        content: '填写未通过理由，可以帮助题目有目的的做出改正！',
        okText: '确认',
      });
      return;
    }
    note = '通过';
    this.props.dispatch({
      type: 'teachResearch/saveTopicAudit',
      payload: {
        id: recordId,
        status: audit,
        note,
      },
    });
  };

  getNodePathText = (id, source, pathNodes = []) => {
    for (let i = 0, l = source.length; i < l; i += 1) {
      if (i === 0) {
        const node = source.filter(item => item.point.id.toString() === id.toString());
        if (node.length > 0) {
          pathNodes.push(node[0].point.name);
          return true;
        }
      }

      if (source[i].subPoint && source[i].subPoint.length > 0) {
        pathNodes.push(source[i].point.name);
        if (this.getNodePathText(id, source[i].subPoint, pathNodes)) {
          return true;
        }
      } else {
        pathNodes.length = 0;
      }
    }
  };

  convertCheckboxSource = source => {
    return source.map(item => {
      return { value: item.id, label: item.name };
    });
  };

  initState = () => {
    return {
      recordId: 27,
      topicIsEmpty: false,
      editStatus: EditStatus.verify,
      content: {
        main: '',
        image: '',
      },
      questionType: '0',
      answers: [],
      fillTopicAnswer: [{ uuid: uuidv1(), value: '' }],
      optionsData: [
        {
          index: uuidv1(),
          value: '',
        },
        {
          index: uuidv1(),
          value: '',
        },
        {
          index: uuidv1(),
          value: '',
        },
        {
          index: uuidv1(),
          value: '',
        },
      ],
      analyzeData: [{ uuid: uuidv1(), value: '' }],
      detailedAnnotationData: [{ uuid: uuidv1(), value: '' }],
      defaultCheckedNodes: [],
      targetModalVisible: false,
      targetPaths: [],
      showTargetList: false,
      uploadImages: {
        previewVisible: false,
        previewImage: '',
        fileList: [],
      },
      sourceRecords: [],
      sourceRecordData: [],
      mainSourceIndex: -1,
      targetObj: {
        subjectId: '',
        scopeId: '',
        departmentId: '',
        source: [],
        mainSource: [],
        degreeId: '',
        level: [],
        method: [],
        point: [],
      },
      targetType: 6,
      audit: '0',
      auditNote: '',
      verify: '0',
      verifyNote: '',
    };
  };

  render() {
    const self = this;
    const {
      questionType,
      optionsData,
      fillTopicAnswer,
      analyzeData,
      detailedAnnotationData,
      editStatus,
      defaultCheckedNodes,
      targetModalVisible,
      targetPaths,
      showTargetList,
      content,
      topicIsEmpty,
      uploadImages,
      sourceRecords,
      mainSourceIndex,
      targetType,
      audit,
      auditNote,
      verify,
      verifyNote,
    } = this.state;
    const {
      teachResearch: {
        subjectTreeData,
        loading,
        targetTypeList,
        sourceTypeYear,
        sourceName,
        knowledgeData,
      },
    } = this.props;
    const createAnswer = () => {
      if (questionType === questionTypes[0].value) {
        return (
          <RadioGroup onChange={self.onSetAnswer} disabled={!EditMainStatus.includes(editStatus)}>
            {optionsData.map((item, index) => {
              return (
                <Radio key={item.index} value={index}>
                  {OptionLabels[index]}
                </Radio>
              );
            })}
          </RadioGroup>
        );
      } else if (
        questionType === questionTypes[1].value ||
        questionType === questionTypes[2].value
      ) {
        return optionsData.map((item, index) => {
          return (
            <Checkbox
              key={item.index}
              value={index}
              disabled={!EditMainStatus.includes(editStatus)}
            >
              {OptionLabels[index]}
            </Checkbox>
          );
        });
      } else if (questionType === questionTypes[3].value) {
        return (
          <RadioGroup
            onChange={self.onSetAnswer}
            disabled={!EditMainStatus.includes(editStatus)}
            options={TrueFalse}
          />
        );
      } else if (questionType === questionTypes[4].value) {
        const result = fillTopicAnswer.map(item => {
          return (
            <Fragment>
              <Col key={item.uuid} span={3}>
                <Input
                  disabled={!EditMainStatus.includes(editStatus)}
                  size="small"
                  value={item.value}
                  onChange={e => {
                    self.onChangeFillTopicAnswer(e, item.uuid);
                  }}
                />
              </Col>
              <Col span={1}>
                <Button
                  disabled={!EditMainStatus.includes(editStatus)}
                  size="small"
                  type="primary"
                  onClick={() => {
                    self.onDelFillTopicAnswer(item.uuid);
                  }}
                >
                  删除
                </Button>
              </Col>
            </Fragment>
          );
        });
        result.unshift(
          <Col span={1}>
            <Button
              type="primary"
              size="small"
              disabled={!EditMainStatus.includes(editStatus)}
              onClick={self.onAddFillTopicAnswer}
            >
              增加
            </Button>
          </Col>
        );
        return result;
      } else if (
        questionType === questionTypes[5].value ||
        questionType === questionTypes[6].value
      ) {
        return <Input disabled={!EditMainStatus.includes(editStatus)} />;
      }
    };
    const loop = data =>
      (data || []).map(item => {
        if (item.subPoint && item.subPoint.length) {
          return (
            <TreeNode disableCheckbox key={item.point.id} title={item.point.name}>
              {loop(item.subPoint)}
            </TreeNode>
          );
        }
        return <TreeNode key={item.point.id} title={item.point.name} />;
      });

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
    const isShow = visible => {
      return { display: visible ? 'block' : 'none' };
    };
    const getStyle = style => {
      return style;
    };
    return (
      <PageHeaderLayout title="">
        <Card title="题目标签" loading={loading}>
          <Row className={styles.Row}>
            <Col span={1}>题型：</Col>
            <Col span={20}>
              <CheckableTagGroup
                list={questionTypes}
                checkedVal={questionType}
                onChange={self.onChangeType}
              />
            </Col>
          </Row>
          <Row className={styles.Row}>
            <Col span={1}>题干：</Col>
            <Col span={23}>
              <Editor
                value={content.main}
                disabled={!EditMainStatus.includes(editStatus)}
                options={{
                  API: {
                    getImage: UPLOAD_PATH.image,
                    getFormula: UPLOAD_PATH.formula,
                  },
                }}
                output={self.onEditorChange}
              />
            </Col>
          </Row>
          <Row style={isShow(topicIsEmpty)}>
            <Col offset={1} span={23}>
              <span className={styles.redColor}>*题干为必填项！</span>
            </Col>
          </Row>
          <Row className={styles.Row}>
            <Col offset={1}>
              <Upload
                action="/library/upload"
                listType="picture-card"
                disabled={!EditMainStatus.includes(editStatus)}
                fileList={uploadImages.fileList}
                onPreview={this.onPreviewImage}
                onChange={this.onSetUploadImage}
              >
                {uploadImages.fileList.length >= 3 ? null : uploadButton}
              </Upload>
            </Col>
          </Row>
          <div style={isShow(showOptions.includes(questionType))}>
            <Row className={styles.Row}>选项：</Row>
            {optionsData.map((item, index) => {
              return (
                <Row
                  key={`option_${OptionLabels[index]}`}
                  className={styles.Row}
                  type="flex"
                  align="middle"
                >
                  <Col span={1}>{OptionLabels[index]}：</Col>
                  <Col span={21}>
                    <Editor
                      disabled={!EditMainStatus.includes(editStatus)}
                      options={{
                        API: {
                          getImage: UPLOAD_PATH.image,
                          getFormula: UPLOAD_PATH.formula,
                        },
                      }}
                      output={e => {
                        self.onChangeOption(e, item.index);
                      }}
                    />
                  </Col>
                  <Col offset={1} span={1}>
                    <Button
                      disabled={!EditMainStatus.includes(editStatus)}
                      type="primary"
                      size="small"
                      onClick={() => {
                        self.onDelOption(item.index);
                      }}
                    >
                      删除
                    </Button>
                  </Col>
                </Row>
              );
            })}
            <Row className={styles.Row}>
              <Col>
                <Button
                  disabled={!EditMainStatus.includes(editStatus)}
                  type="primary"
                  size="small"
                  onClick={this.onAddOptions}
                >
                  +新增选项
                </Button>
              </Col>
            </Row>
          </div>
          <div style={isShow(!showAnswer.includes(questionType))}>
            <Row className={styles.Row}>
              <Col span={1}>答案：</Col>
              <Col span={23}>{createAnswer()}</Col>
            </Row>
          </div>
          <Row className={styles.Row}>
            <Col>分析：</Col>
          </Row>
          {analyzeData.map((item, index) => {
            return (
              <Row className={styles.Row} key={item.uuid}>
                <Col offset={1}>
                  <Editor
                    disabled={!EditMainStatus.includes(editStatus)}
                    options={{
                      API: {
                        getImage: UPLOAD_PATH.image,
                        getFormula: UPLOAD_PATH.formula,
                      },
                    }}
                    output={e => {
                      self.onChangeAnalyze(e, index);
                    }}
                  />
                </Col>
              </Row>
            );
          })}
          <Row className={styles.Row}>
            <Col>详解：</Col>
          </Row>
          {detailedAnnotationData.map((item, index) => {
            return (
              <Row className={styles.Row} key={item.uuid}>
                <Col offset={1}>
                  <Editor
                    disabled={!EditMainStatus.includes(editStatus)}
                    options={{
                      API: {
                        getImage: UPLOAD_PATH.image,
                        getFormula: UPLOAD_PATH.formula,
                      },
                    }}
                    output={e => {
                      self.onChangeDetail(e, index);
                    }}
                  />
                </Col>
              </Row>
            );
          })}
          <Row className={styles.Row}>
            <Col>
              <Button
                type="primary"
                disabled={!EditMainStatus.includes(editStatus)}
                size="small"
                onClick={self.onAddDetailedAnnotation}
              >
                +新增详解
              </Button>
            </Col>
          </Row>
          <Row className={styles.Row}>
            <Col offset={22} span={1}>
              <Button disabled={!EditMainStatus.includes(editStatus)} size="small">
                预览
              </Button>
            </Col>
            <Col span={1}>
              <Button
                disabled={!EditMainStatus.includes(editStatus)}
                type="primary"
                size="small"
                onClick={self.onSaveMain}
              >
                保存
              </Button>
            </Col>
          </Row>
          <div style={isShow(VisibleTarget.includes(editStatus))}>
            <Row className={styles.Row}>
              <Col>题目标签</Col>
            </Row>
            {(targetTypeList || []).map((item, index) => (
              <Fragment key={item.type.id}>
                <Row className={styles.Row}>
                  <Col span={index === 6 ? 2 : 1}>
                    {item.type.name}：{requiredIndex.includes(index) ? (
                      <span className={styles.redColor}>*</span>
                    ) : null}
                  </Col>
                  {index === 3 ? (
                    <Col span={20}>
                      <Row className={styles.Row}>
                        {(Object.keys(sourceTypes) || []).map(typeItem => {
                          return (
                            <Col key={uuidv1()} span={typeItem === 'original' ? 2 : 1}>
                              <Button
                                disabled={!EditTarget.includes(editStatus)}
                                size="small"
                                onClick={() => {
                                  this.onChangeSourceType(typeItem, sourceTypes[typeItem]);
                                }}
                              >
                                {sourceTypes[typeItem]}
                              </Button>
                            </Col>
                          );
                        })}
                      </Row>
                      {(sourceRecords || []).map((sourceItem, keyIndex) => {
                        return (
                          <Row className={styles.Row} key={uuidv1()}>
                            <Col span={2}>
                              <input
                                disabled={!EditTarget.includes(editStatus)}
                                type="radio"
                                name="mainSource"
                                checked={mainSourceIndex === keyIndex}
                                onChange={() => {
                                  this.onChangeMainSource(keyIndex);
                                }}
                              />主来源
                            </Col>
                            <Col span={2}>
                              <span>{sourceTypes[sourceItem.key]}</span>
                            </Col>
                            <Col span={2}>
                              <Select
                                size="small"
                                disabled={!EditTarget.includes(editStatus)}
                                className={styles.select}
                                value={sourceRecords[keyIndex].year}
                                onChange={val =>
                                  this.onChangeSource(
                                    { year: val },
                                    sourceItem.key,
                                    keyIndex,
                                    FieldType.year
                                  )
                                }
                              >
                                {sourceTypeYear[sourceItem.key].map(year => (
                                  <Option key={uuidv1()} value={year}>
                                    {year}
                                  </Option>
                                ))}
                              </Select>
                            </Col>
                            {sourceItem.key === sourceTypeKeys.test ||
                            sourceItem.key === sourceTypeKeys.book ? (
                              <Col span={2}>
                                <span className={styles.redColor}>*</span>
                                <Select
                                  size="small"
                                  disabled={!EditTarget.includes(editStatus)}
                                  className={styles.select}
                                  value={sourceRecords[keyIndex].sourceId}
                                  onChange={val =>
                                    this.onChangeSource(
                                      { sourceId: val },
                                      sourceItem.key,
                                      keyIndex,
                                      FieldType.bookName
                                    )
                                  }
                                >
                                  {sourceName[sourceItem.key].map(nameItem => (
                                    <Option key={uuidv1()} value={nameItem.id}>
                                      {nameItem.detailName}
                                    </Option>
                                  ))}
                                </Select>
                              </Col>
                            ) : null}

                            {sourceItem.key === sourceTypeKeys.book ? (
                              <Col span={2}>
                                <Input
                                  size="small"
                                  disabled={!EditTarget.includes(editStatus)}
                                  placeholder="作者名"
                                  value={sourceRecords[keyIndex].authorName || ''}
                                />
                              </Col>
                            ) : null}
                            {sourceItem.key === sourceTypeKeys.book ? (
                              <Col span={1}>
                                <Input
                                  size="small"
                                  disabled={!EditTarget.includes(editStatus)}
                                  placeholder="页码"
                                  value={sourceRecords[keyIndex].pageNum}
                                  onChange={e =>
                                    this.onChangeSource(
                                      { pageNum: e.target.value },
                                      sourceItem.key,
                                      keyIndex
                                    )
                                  }
                                />
                              </Col>
                            ) : null}
                            {[sourceTypeKeys.test, sourceTypeKeys.book].includes(sourceItem.key) ? (
                              <Col span={1}>
                                <Input
                                  size="small"
                                  disabled={!EditTarget.includes(editStatus)}
                                  placeholder="题号"
                                  value={sourceRecords[keyIndex].qnum}
                                  onChange={e =>
                                    this.onChangeSource(
                                      { qnum: e.target.value },
                                      sourceItem.key,
                                      keyIndex
                                    )
                                  }
                                />
                              </Col>
                            ) : null}

                            <Col span={1}>
                              &nbsp;
                              <Button
                                size="small"
                                disabled={!EditTarget.includes(editStatus)}
                                type="primary"
                                onClick={() => this.onDelSourceType(keyIndex)}
                              >
                                删除
                              </Button>
                            </Col>
                            <Col span={1}>
                              <Button
                                size="small"
                                disabled={!EditTarget.includes(editStatus)}
                                type="primary"
                                onClick={() => {
                                  this.onSaveSource(keyIndex);
                                }}
                              >
                                确认
                              </Button>
                            </Col>
                          </Row>
                        );
                      })}
                    </Col>
                  ) : (
                    <Col span={8}>
                      {checkboxIndex.includes(index) ? (
                        <CheckboxGroup
                          disabled={!EditTarget.includes(editStatus)}
                          options={self.convertCheckboxSource(item.itemList)}
                          onChange={checkedVals => {
                            this.onChangeTarget(checkedVals, index);
                          }}
                        />
                      ) : (
                        <RadioGroup
                          disabled={!EditTarget.includes(editStatus)}
                          onChange={e => {
                            this.onChangeTarget(e.target, index);
                          }}
                        >
                          {item.itemList.map(tag => {
                            return (
                              <Radio key={tag.id} value={tag.id}>
                                {tag.name}
                              </Radio>
                            );
                          })}
                        </RadioGroup>
                      )}
                    </Col>
                  )}
                </Row>
              </Fragment>
            ))}
            <Row className={styles.Row}>
              <Col span={2}>知识点标签：</Col>
              <Col span={8}>
                <Button
                  disabled={!EditTarget.includes(editStatus)}
                  type="primary"
                  size="small"
                  onClick={() => {
                    self.onGetTargetTree();
                  }}
                >
                  +新增知识点
                </Button>
              </Col>
            </Row>
            <Row className={styles.Row}>
              <Col>
                {showTargetList &&
                  targetPaths.map(item => {
                    return (
                      <Tag key={uuidv1()} className={styles.tagMargin} color="blue">
                        {item.join('>')}
                      </Tag>
                    );
                  })}
              </Col>
            </Row>
            <Row>
              <Col offset={23} span={1}>
                <Button
                  size="small"
                  disabled={!EditTarget.includes(editStatus)}
                  type="primary"
                  onClick={this.onSaveTarget}
                >
                  保存
                </Button>
              </Col>
            </Row>
          </div>
          <div style={isShow(VisibleVerify.includes(editStatus))}>
            <Row className={styles.Row}>
              <Col span={2}>校验通过：</Col>
              <Col span={4}>
                <RadioGroup
                  disabled={!EditVerify.includes(editStatus)}
                  onChange={this.onChangeVerify}
                  value={verify}
                  options={TrueFalse}
                />
              </Col>
            </Row>
            <TopicNote
              rowClass={styles.Row}
              warnFont={styles.warnFont}
              maxLength={50}
              display={verify.toString() === TrueFalseValue.false ? 'block' : 'none'}
              value={verifyNote}
              onChange={this.onChangeVerifyNote}
            />
            <Row className={styles.Row}>
              <Col offset={23} span={1}>
                <Button
                  disabled={!EditVerify.includes(editStatus)}
                  type="primary"
                  size="small"
                  onClick={this.onSaveVerify}
                >
                  保存
                </Button>
              </Col>
            </Row>
          </div>
          <div style={isShow(VisibleAudit.includes(editStatus))}>
            <Row className={styles.Row}>
              <Col span={2}>审核通过：</Col>
              <Col span={4}>
                <RadioGroup
                  disabled={!EditAudit.includes(editStatus)}
                  onChange={this.onChangeAudit}
                  value={audit}
                  options={TrueFalse}
                />
              </Col>
            </Row>
            <TopicNote
              rowClass={styles.Row}
              warnFont={styles.warnFont}
              maxLength={50}
              display={audit.toString() === TrueFalseValue.false ? 'block' : 'none'}
              value={auditNote}
              onChange={this.onChangeAuditNote}
            />
            <Row className={styles.Row}>
              <Col offset={23} span={1}>
                <Button
                  disabled={!EditAudit.includes(editStatus)}
                  type="primary"
                  size="small"
                  onClick={this.onSaveAudit}
                >
                  保存
                </Button>
              </Col>
            </Row>
          </div>
        </Card>
        <Modal
          maskClosable={false}
          title="选择知识标签"
          width="700px"
          visible={targetModalVisible}
          onOk={self.onSetTarget}
          onCancel={() => {
            self.onShowTargetModal(false);
          }}
        >
          <Row>
            <Col>
              <Select
                style={getStyle({ width: 140 })}
                value={targetType}
                onChange={this.onChangeKnowle}
              >
                {(knowledgeData.list || []).map(item => {
                  return (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Tree checkable defaultCheckedKeys={defaultCheckedNodes} onCheck={self.onCheckNode}>
                {loop(subjectTreeData)}
              </Tree>
              <Divider type="vertical" />
            </Col>
            <Col span={1}>
              <Divider type="vertical" className={styles.divider} />
            </Col>
            <Col span={12}>
              {targetPaths.map(item => {
                return (
                  <Tag key={uuidv1()} className={styles.tagMargin} color="blue">
                    {item.join('>')}
                  </Tag>
                );
              })}
            </Col>
          </Row>
        </Modal>
        <Modal visible={uploadImages.previewVisible} footer={null} onCancel={this.onCancelPreview}>
          <img alt="example" className={styles.maxWidth} src={uploadImages.previewImage} />
        </Modal>
      </PageHeaderLayout>
    );
  }
}
export default MaterialList;
