import React, { useState, useEffect } from "react";
import MUIRichTextEditor from "mui-rte";
import { ContentState, convertToRaw, EditorState, Modifier } from "draft-js";
import { makeStyles } from "@material-ui/core/styles";

import CodeIcon from "@material-ui/icons/Code";
import CodeBlock from "./CustomBlocks/CodeBlock";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import Blockquote from "./CustomBlocks/Blockquote";
import CodeUtils from "draft-js-code";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
  },
}));

const BetterEditor = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const { forwardRef, label } = props;

  const handlePastedText = (text, html, editorState) => {
    props.handleChange(
      "bodyText",
      convertToRaw(editorState.getCurrentContent())
    );

    const selection = editorState.getSelection();
    const pastedBlocks = ContentState.createFromText(text).blockMap;
    const newState = Modifier.replaceWithFragment(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      pastedBlocks
    );
    const newEditorState = EditorState.push(
      editorState,
      newState,
      "insert-fragment"
    );
    console.log(
      "handlePastedText -> newEditorState",
      convertToRaw(newEditorState.getCurrentContent())
    );

    props.handleChange(
      "bodyText",
      convertToRaw(newEditorState.getCurrentContent())
    );

    return "not-handled";
  };

  const hasSelectionInCustomBlock = (editorState) => {
    let selection = editorState.getSelection();
    let contentState = editorState.getCurrentContent();
    let startKey = selection.getStartKey();
    let currentBlock = contentState.getBlockForKey(startKey);
    return currentBlock.getType() === "CODEBLOCK";
  };

  const onTab = (evt) => {
    // if (!CodeUtils.hasSelectionInBlock(editorState)) return "not-handled";

    // this.onChange(CodeUtils.onTab(evt, editorState));
    // return "handled";
    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      console.log("handled");
    }
  };

  const onChange = (editorState) => {
    props.handleChange(
      "bodyText",
      convertToRaw(editorState.getCurrentContent())
    );
    // console.log(hasSelectionInCustomBlock(editorState));
  };

  const onBlur = () => {
    props.handleBlur("bodyText");
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <MUIRichTextEditor
      label={label}
      ref={forwardRef}
      // onChange={onChange}
      onBlur={onBlur}
      className={classes.root}
      controls={[
        "title",
        "bold",
        "undo",
        "redo",
        "link",
        "bulletList",
        "Blockquote",
        "codeBlock",
        "clear",
        "code",
      ]}
      customControls={[
        {
          name: "codeBlock",
          icon: <CodeIcon />,
          type: "block",
          blockWrapper: <CodeBlock />,
        },
        {
          name: "Blockquote",
          icon: <FormatQuoteIcon />,
          type: "block",
          blockWrapper: <Blockquote />,
        },
      ]}
      onTab={onTab}
      draftEditorProps={{
        handlePastedText: handlePastedText,
      }}
    />
  );
};

export default BetterEditor;
