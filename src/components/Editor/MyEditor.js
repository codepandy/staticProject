import React, { Component } from 'react';
import Immutable from 'immutable';
import { Button } from 'antd';
import {
  Editor,
  EditorState,
  CompositeDecorator,
  RichUtils,
  convertFromRaw,
  convertToRaw,
  Modifier,
} from 'draft-js';
import StyleButtons from './Component/Label/style-buttons';
import FormulaEditor from './Component/formula-editor';
import ImageEditor from './Component/image-editor';
import './style.css';

const STYLES = {
  root: {
    fontFamily: "'Georgia', serif",
    width: '100%',
  },
  buttons: {
    marginBottom: 10,
  },
  urlInputContainer: {
    marginBottom: 10,
  },
  urlInput: {
    fontFamily: "'Georgia', serif",
    marginRight: 10,
    padding: 3,
  },
  editor: {
    fontFamily: 'Microsoft YaHei',
    border: '1px solid #ccc',
    cursor: 'text',
    minHeight: 80,
    padding: 10,
  },
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
  media: {
    width: '100%',
    // Fix an issue with Firefox rendering controls
    // with 'pre-wrap' white-space
    whiteSpace: 'initial',
  },
};

const elements = {
  Image: false,
  Formula: false,
};
const select = [
  {
    value: 'function',
    label: '函数',
    children: [
      {
        value: '\\sin\\theta',
        label: 'sinθ',
      },
      {
        value: '\\cos\\theta',
        label: 'cosθ',
      },
      {
        value: '\\tan\\theta',
        label: 'tanθ',
      },
      {
        value: '\\cot\\theta',
        label: 'cotθ',
      },
      {
        value: '\\arcsin\\frac{L}{r}',
        label: 'arcsin(L/r)',
      },
      {
        value: '\\arccos\\frac{T}{r}',
        label: 'arccos(T/r)',
      },
      {
        value: '\\arctan\\frac{T}{r}',
        label: 'arctan(L/T)',
      },
      {
        value: '\\arccot\\frac{T}{r}',
        label: 'arccot(L/T)',
      },
      {
        value: '\\exp\\!t',
        label: 'expt',
      },
      {
        value: '\\ln X',
        label: 'ln X',
      },
      {
        value: '\\lg X',
        label: 'lg X',
      },
      {
        value: '\\log_a N',
        label: 'logaN',
      },
      {
        value: '\\lim_{t\\to n}T',
        label: 'lim(T→n)T',
      },
    ],
  },
  {
    value: 'differential',
    label: '微分',
    children: [
      {
        value: '\\nabla',
        label: '▽',
      },
      {
        value: '\\partial x',
        label: '∂x',
      },
      {
        value: '\\mathrm{d}x',
        label: 'dx',
      },
    ],
  },
  {
    value: 'set',
    label: '集合',
    children: [
      {
        value: '\\forall',
        label: '∀',
      },
      {
        value: '\\exists',
        label: '∃',
      },
      {
        value: '\\varnothing',
        label: '∅',
      },
      {
        value: '\\in',
        label: '∈',
      },
      {
        value: '\\ni',
        label: '∋',
      },
      {
        value: '\\notin',
        label: '∉',
      },
      {
        value: 'subset',
        label: '⊂',
      },
      {
        value: '\\subsetleq',
        label: '⊆',
      },
      {
        value: 'supset',
        label: '⊃',
      },
      {
        value: '\\supsetleq',
        label: '⊇',
      },
      {
        value: '\\cap',
        label: '∩',
      },
      {
        value: '\\bigcap',
        label: '⋂',
      },
      {
        value: '\\cup',
        label: '∪',
      },
      {
        value: '\\bigcup',
        label: '⋃',
      },
    ],
  },
  {
    value: 'logic',
    label: '逻辑',
    children: [
      {
        value: 'p',
        label: 'p',
      },
      {
        value: '\\wedge',
        label: '∧',
      },
      {
        value: '\\bigwedge',
        label: '⋀',
      },
      {
        value: '\\vee',
        label: 'v',
      },
      {
        value: '\\bigvee',
        label: '⋁',
      },
    ],
  },
  {
    value: 'radical',
    label: '根号',
    children: [
      {
        value: '\\sqrt{x}',
        label: '√x',
      },
      {
        value: '\\sqrt[n]{x}',
        label: 'n√x',
      },
    ],
  },
  {
    value: 'relation',
    label: '关系符号',
    children: [
      {
        value: '\\sim',
        label: '~',
      },
      {
        value: '\\ne ',
        label: '≠',
      },
      {
        value: '\\propto ',
        label: '∝',
      },
      {
        value: '\\pm',
        label: '±',
      },
      {
        value: '\\mp',
        label: '∓',
      },
    ],
  },
  {
    value: 'geometry',
    label: '几何符号',
    children: [
      {
        value: '\\Diamond',
        label: '菱形',
      },
      {
        value: '\\Box',
        label: '正方形',
      },
      {
        value: '\\Delta',
        label: 'Delta',
      },
      {
        value: '\\triangle',
        label: '三角形',
      },
      {
        value: '\\angle',
        label: '角名',
      },
      {
        value: '\\perp',
        label: '垂直',
      },
    ],
  },
  {
    value: 'identification',
    label: '上标、下标及积分',
    children: [
      {
        value: 'a^2',
        label: '上标',
      },
      {
        value: 'a_2',
        label: '下标',
      },
      {
        value: 'x^\\prime',
        label: '导数',
      },
    ],
  },
];
const INLINE_STYLES = [{ label: '重点', style: 'BOLD' }];
/*
 * 过滤多媒体组件
 * @params entityType 组件类型
 */
const findImageEntities = () => {
  return (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges(character => {
      const entityKey = character.getEntity();
      if (entityKey === null) {
        return false;
      }
      contentState.getEntity(entityKey).getMutability();
      return true;
    }, callback);
  };
};
/*
 * 多媒体图片公式组件
 * @params props 组件属性
 * 后可两者拆分
 */
const TokennSpan = props => {
  const { style } = props.contentState.getEntity(props.entityKey).data;
  return (
    <span data-offset-key={props.offsetkey} style={style}>
      {props.children}
    </span>
  );
};

class MyEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      Formula: false,
      Image: false,
    };
    this.logState = () => {
      // const content = this.state.editorState.getCurrentContent();
      // const string = JSON.stringify(convertToRaw(content));
      /**
       * 转换接口
       */
      // editorTransform(string).then(e => console.log(e));
    };
    this.onChange = editorState => this.setState({ editorState });
  }
  componentDidMount() {
    const { value } = this.props;
    const content = value || convertToRaw(this.state.editorState.getCurrentContent());
    const decorator = new CompositeDecorator([
      {
        strategy: findImageEntities(this.state.entityType),
        component: TokennSpan,
      },
    ]);
    const blocks = convertFromRaw(content);
    const newEditorState = EditorState.createWithContent(blocks, decorator);
    this.onUpdateData(newEditorState);
  }

  onHandleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  };

  onURLInputKeyDown = e => {
    if (e.which === 13) {
      // this._confirmMedia(e);
    }
  };
  onUpdateData = newEditorState => {
    const { output } = this.props;
    const content = convertToRaw(newEditorState.getCurrentContent());
    let isEmpty = true;
    if (output) {
      if (content.blocks.length === 1 && content.blocks[0].text === '') {
        isEmpty = true;
      } else {
        isEmpty = false;
      }
      output(content, isEmpty);
    }
    this.onChange(newEditorState);
  };

  getElementData = props => {
    const { editorState } = this.state;
    const { type, width, src, ar, ...other } = props;
    const { OrderedSet } = Immutable;
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const imageStyle = {
      display: 'inline-block',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
      backgroundClip: 'border-box',
      verticalAlign: 'middle',
      boxSizing: 'border-box',
      fontSize: 0,
    };
    const height = width * ar;
    const customStyle = {
      paddingLeft: `${width}px`,
      backgroundImage: `url('${src}')`,
      width: `${width}px`,
      height: `${height}px`,
      lineHeight: `${height}px`,
    };
    const contentStateWithEntity = contentState.createEntity(type, 'IMMUTABLE', {
      src,
      width,
      ar,
      ...other,
      style: { ...imageStyle, ...customStyle },
    });
    let newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    this.onChange(newEditorState);
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newContent = Modifier.insertText(
      contentState,
      selectionState,
      ' ',
      OrderedSet.of(''),
      entityKey
    );
    newEditorState = EditorState.set(editorState, {
      currentContent: newContent,
    });
    this.closeMedia();
    this.onUpdateData(newEditorState);
  };
  addImage = () => this.proptForMedia('Image');
  addFormula = () => this.proptForMedia('Formula');
  proptForMedia = type => {
    this.setState({
      ...elements,
      [type]: true,
    });
  };
  closeMedia = () => {
    this.setState({ ...elements });
  };
  toggleInlineStyle = inlineStyle => {
    const { editorState } = this.state;
    const newEditorState = RichUtils.toggleInlineStyle(editorState, inlineStyle);
    this.onUpdateData(newEditorState);
  };
  myBlockStyleFn = () => {
    return 'inline';
  };

  render() {
    const { options, disabled } = this.props;
    const { editorState, Image, Formula } = this.state;
    return (
      <div className="App">
        <div style={STYLES.root}>
          <div style={STYLES.buttons}>
            <Button
              size="small"
              type="primary"
              onMouseDown={this.addImage}
              style={{ marginRight: 10 }}
            >
              添加图片
            </Button>
            <Button
              size="small"
              type="primary"
              onMouseDown={this.addFormula}
              style={{ marginRight: 10 }}
            >
              添加公式
            </Button>
            <StyleButtons
              editorState={editorState}
              onToggle={this.toggleInlineStyle}
              inlineStyles={INLINE_STYLES}
            />
          </div>
          <div>
            {Image && (
              <ImageEditor onSumbitData={props => this.getElementData(props)} API={options.API} />
            )}
            {Formula && (
              <FormulaEditor
                onSumbitData={this.getElementData}
                selections={select}
                API={options.API}
              />
            )}
          </div>
          <div style={STYLES.editor}>
            <Editor
              blockStyleFn={this.myBlockStyleFn}
              editorState={editorState}
              handleKeyCommand={this.onHandleKeyCommand}
              onChange={this.onUpdateData}
              spellCheck={false}
              readOnly={disabled}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MyEditor;
