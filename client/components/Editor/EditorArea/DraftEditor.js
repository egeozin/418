import React from 'react';
import { Editor, EditorState } from 'draft-js';
import Toolbar from '../../Containers/DraftStyledComponents/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import {
  EditorWrapper,
  EditorContainer,
} from '../../../components/Containers/DraftStyledComponents';
import Prism from 'prismjs';
import PrismDecorator from 'draft-js-prism';
import 'prismjs/themes/prism-funky.css';

//Custom block styles
const useStyles = makeStyles(() => ({
  blockQuote: {
    borderLeft: '5px solid #34495e',
    color: '#34495e',
    fontStyle: 'italic',
    fontWeight: 500,
    margin: '16px 0',
    padding: '10px 20px',
  },
  codeBlock: {
    color: '#fefefe',
    padding: '8px 16px',
    backgroundColor: '#4C5B9C',
    fontFamily: 'monospace',
    lineHeight: 1.5,
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word',
    maxHeight: '700px',
    overflowY: 'auto',
  },
}));

//TODO LINK- REDO- UNDO- CLEAR- COPIED TEXT

const DraftEditor = ({ handleChange, handleBlur, forwardRef, label }) => {
  const classes = useStyles();
  const decorator = new PrismDecorator({
    prism: Prism,
    defaultSyntax: 'javascript',
  });

  //Applies custom styles to specific blocks.
  const getBlockStyle = (block) => {
    switch (block.getType()) {
      case 'blockquote':
        return classes.blockQuote;
      case 'code-block':
        return classes.codeBlock;
      default:
        return null;
    }
  };

  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty(decorator)
  );
  const onChange = (editorState) => setEditorState(editorState);
  const onUndo = () => {
    onChange(EditorState.undo(editorState));
  };
  const onRedo = () => {
    onChange(EditorState.redo(editorState));
  };

  return (
    <EditorWrapper>
      <Toolbar
        updateEditorState={onChange}
        editorState={editorState}
        onUndo={onUndo}
        onRedo={onRedo}
      />
      <EditorContainer>
        <Editor
          editorState={editorState}
          onChange={onChange}
          placeholder='Question...'
          blockStyleFn={getBlockStyle}
        />
      </EditorContainer>
    </EditorWrapper>
  );
};

export default DraftEditor;
