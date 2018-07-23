import React, { Component } from 'react';
import StyleButton from './style-button';

export default class StyleButtons extends Component {
  render() {
    const { inlineStyles, onToggle, editorState } = this.props;
    const currentStyle = editorState.getCurrentInlineStyle();
    return (
      <div className="RichEditor-controls">
        {inlineStyles.map(type => (
          <StyleButton
            key={type.label}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={onToggle}
            style={type.style}
          />
        ))}
      </div>
    );
  }
}
