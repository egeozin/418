import React from 'react';
import { inlineStyles, blockTypes } from './Constants';
import { ToolbarItem, Container } from './Common';
import { RichUtils } from 'draft-js';
import { Redo, Undo } from '@material-ui/icons';
export function RenderInlineStyles({
  editorState,
  updateEditorState,
  onUndo,
  onRedo,
}) {
  const applyStyle = (style) => {
    updateEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const applyStyleToBlock = (style) => {
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
            key={`${item.label}-${idx}`}
            onClick={() => applyStyleToBlock(item.style)}
          >
            {item.icon || item.label}
          </ToolbarItem>
        );
      })}
      <ToolbarItem onClick={onUndo}>
        <Undo />
      </ToolbarItem>
      <ToolbarItem onClick={onRedo}>
        <Redo />
      </ToolbarItem>

      {inlineStyles.map((item, idx) => {
        return (
          <ToolbarItem
            isActive={isActive(item.style)}
            key={`${item.label}-${idx}`}
            onClick={() => applyStyle(item.style)}
            blockquote={true}
          >
            {item.icon || item.label}
          </ToolbarItem>
        );
      })}
    </Container>
  );
}
