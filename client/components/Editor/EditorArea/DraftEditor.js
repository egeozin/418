import React from 'react';
import { Editor, EditorState } from 'draft-js';
import styled from 'styled-components';
import Toolbar from '../../Containers/Toolbar';
const EditorWrapper = styled.div`
  min-width: 700px;
  display: flex;
  flex-direction: column;
  height: fit-content;
`;

const EditorContainer = styled.div`
  min-height: 9em;
  border-radius: 3px;
  background-color: #d3d8ed;
  padding: 5px;
  font-size: 17px;
  font-weight: 300;
  box-shadow: 0px 0px 3px 1px rgba(15, 15, 15, 0.17);
  color: #222947;
`;

const DraftEditor = ({ handleChange, handleBlur, forwardRef, label }) => {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const onChange = (editorState) => setEditorState(editorState);

  return (
    <EditorWrapper>
      <Toolbar updateEditorState={onChange} editorState={editorState} />
      <EditorContainer>
        <Editor
          editorState={editorState}
          onChange={onChange}
          placeholder='Question...'
        />
      </EditorContainer>
    </EditorWrapper>
  );
};

export default DraftEditor;
