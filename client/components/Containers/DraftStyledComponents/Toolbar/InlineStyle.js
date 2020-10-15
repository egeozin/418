import React from 'react';
import { inlineStyles, blockTypes } from './Constants';
import { ToolbarItem, Container } from './Common';
import { RichUtils } from 'draft-js';

export function RenderInlineStyles({ editorState, updateEditorState }) {
  const applyStyle = (e, style) => {
    e.preventDefault();
    updateEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const applyStyleToBlock = (e, style) => {
    e.preventDefault();
    updateEditorState(RichUtils.toggleBlockType(editorState, style));
  };

  const isActive = (style) => {
    const currentStyle = editorState.getCurrentInlineStyle();
    return currentStyle.has(style);
  };

  return (
    <Container>
      {blockTypes.map((item, idx) => {
        return (
          <ToolbarItem
            isActive={isActive(item.style)}
            key={`${item.label}-${idx}`}
            onClick={(e) => applyStyleToBlock(e, item.style)}
          >
            {item.icon || item.label}
          </ToolbarItem>
        );
      })}
      {inlineStyles.map((item, idx) => {
        return (
          <ToolbarItem
            isActive={isActive(item.style)}
            key={`${item.label}-${idx}`}
            onClick={(e) => applyStyle(e, item.style)}
            blockquote={true}
          >
            {item.icon || item.label}
          </ToolbarItem>
        );
      })}
    </Container>
  );
}
