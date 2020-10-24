import React from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  ContentState,
  convertToRaw,
} from 'draft-js';
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
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontSize: '16px',
    padding: '20px',
  },
}));

const DraftEditor = ({ handleChange, handleBlur, label }) => {
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
    EditorState.createWithContent(ContentState.createFromText(label), decorator)
  );

  const onChange = (editorState) => {
    setEditorState(editorState);
    handleChange('bodyText', convertToRaw(editorState.getCurrentContent()));
  };

  const onBlur = () => {
    handleBlur('bodyText');
  };

  const onUndo = () => {
    onChange(EditorState.undo(editorState));
  };

  const onRedo = () => {
    onChange(EditorState.redo(editorState));
  };

  const onClear = () => {
    setEditorState(
      EditorState.createWithContent(ContentState.createFromText(''))
    );
  };

  const onTab = (e) => {
    const maxDepth = 4;
    onChange(RichUtils.onTab(e, editorState, maxDepth));
  };

  // const handlePastedText = (text, html, editorState) => {
  //   const pastedBlocks = ContentState.createFromText(text).blockMap;
  //   console.log('1212', pastedBlocks);
  //   const newState = Modifier.replaceWithFragment(
  //     editorState.getCurrentContent(),
  //     editorState.getSelection(),
  //     pastedBlocks
  //   );
  //   const newEditorState = EditorState.push(
  //     editorState,
  //     newState,
  //     'insert-fragment'
  //   );
  //   onChange(newEditorState);
  //   return 'handled';
  // };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return true;
    }
    return false;
  };

  return (
    <EditorWrapper>
      <Toolbar
        updateEditorState={onChange}
        editorState={editorState}
        onUndo={onUndo}
        onRedo={onRedo}
        onClear={onClear}
      />
      <EditorContainer>
        <Editor
          onBlur={onBlur}
          // handlePastedText={handlePastedText}
          handleKeyCommand={handleKeyCommand}
          editorState={editorState}
          onChange={onChange}
          blockStyleFn={getBlockStyle}
          onTab={onTab}
        />
      </EditorContainer>
    </EditorWrapper>
  );
};

export default DraftEditor;
