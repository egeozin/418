import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import BetterLink from "../Link";
import Link from "next/link";
import MUIRichTextEditor from "mui-rte";
import CodeIcon from "@material-ui/icons/Code";
import CodeBlock from "../Editor/EditorArea/CustomBlocks/CodeBlock";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import Blockquote from "../Editor/EditorArea/CustomBlocks/Blockquote";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "../../src/theme";
import languages from "../../src/languages";

import GenericEditor from "../Editor/EditorArea/GenericEditor";
import { useFormik } from "formik";
import { responseEditorValidationSchema } from "../../utils/form";

import EmojiBar from "./Emoji/EmojiBar";

import { makeStyles } from "@material-ui/core/styles";

const updateTheme = {
  ...theme,
  overrides: {
    ...theme.overrides,
    MUIRichTextEditor: {
      ...theme.overrides.MUIRichTextEditor,
      editor: {
        ...theme.overrides.MUIRichTextEditor.editor,
        minHeight: 150,
        padding: 0,
      },
      editorContainer: {
        ...theme.overrides.MUIRichTextEditor.editorContainer,
        padding: 0,
      },
    },
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
  },
  error: {
    color: theme.palette.secondary.main,
    position: "absolute",
    bottom: 0,
    left: 0,
    bottom: -20,
  },
  formField: {
    position: "relative",
  },
  emojiBar: {
    marginTop: 25,
  },
  MUIRichTextEditor: {
    root: {
      color: "red",
    },
  },
  flexGrow: {
    flexGrow: 1,
  },
  title: {
    fontSize: 36,
    fontFamily: "Hind, sans-serif",
    fontWeight: 700,
  },
  rightTitle: {
    lineHeight: "29px",
  },
  divider: {
    marginTop: 20,
    marginBottom: 20,
  },
  postContainer: {},
  postGridContainer: {
    marginTop: 20,
  },
  questionContainer: {
    minHeight: 200,
    width: "100%",
  },
  nameLanguage: {
    marginTop: 10,
  },
  leftColumnContainer: {
    maxWidth: 120,
  },
  questionText: {
    //marginTop:5,
    fontSize: 18,
    lineHeight: 1.5,
    //minWidth: 800
  },
  buttons: {
    marginTop: -6,
    marginLeft: 4,
  },
  voteButton: {
    color: theme.palette.text.secondary,
  },
  selfVoteButton: {
    color: theme.palette.primary.main,
  },
  voteCount: {},
  voteMore: {
    fontSize: 40,
    margin: -12,
  },
  voteLess: {
    fontSize: 40,
    margin: -12,
    marginTop: -18,
  },
  responseEditorContainer: {
    marginTop: 20,
    position: "relative",
  },
  postButtonGrid: {
    marginTop: 20,
  },
  postButton: {
    //background: theme.palette.secondary.main, //'linear-gradient(45deg, var(--background-start) 30%, var(--background-end) 90%)',
    borderRadius: 3,
    boxShadow: "none",
    border: 0,
    fontSize: 20,
    fontWeight: 600,
    color: "white",
    padding: "2px 20px",
  },
  languageButton: {
    background:
      "linear-gradient(45deg, var(--background-start) 30%, var(--background-end) 90%)",
    borderRadius: 3,
    boxShadow: "none",
    border: 0,
    fontSize: 14,
    fontWeight: 600,
    color: "white",
    height: 24,
    marginRight: 10,
    padding: "0 10px",
  },
}));

const PostQuestion = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [upvoted, setUpvoted] = useState(false);
  const [defaultValue, setDefaultValue] = useState(
    JSON.stringify({
      blocks: [
        {
          key: "b9rgj",
          text: "",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
    })
  );
  const router = useRouter();
  const { data, id, userId, userName, mutate, onMutate } = props;


  const onEditorSubmit = (values, { resetForm }) => {
    const handled = handlePostResponse(values);
    setDefaultValue(
      JSON.stringify({
        blocks: [
          {
            key: "b9rgj",
            text: " ",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
        ],
        entityMap: {},
      })
    );
    resetForm({ bodyText: { blocks: [{ text: "" }] } });
    formik.setTouched({});
    formik.setErrors({});
  };

  async function handlePostResponse(values) {
    // Data format for Question
    // {q:doc.data(), a:answers, id: req.query.id}
    if (userId) {
      // ADD CLIENT VALIDATIONS HERE WITH YUP
      const rData = {
        body: values.bodyText,
        postId: id,
        userId: userId,
        userName: userName,
      };
      // update the local data immediately
      // NOTE: key is not required when using useSWR's mutate as it's pre-bound
      onMutate(rData);
    }
  }

  const editorRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      bodyText: { blocks: [{ text: "" }] },
    },
    validationSchema: responseEditorValidationSchema,
    onSubmit: onEditorSubmit,
  });

  return (
    <Grid
      container
      alignItems="stretch"
      direction="row"
      spacing={1}
      className={classes.questionContainer}
    >
      <Grid
        item
        container
        direction="column"
        alignItems="left"
        xs={12}
        md={1}
        className={classes.buttons}
      >
        <Grid item>
          <IconButton
            onClick={(e) => {
              if (!upvoted) {
                props.upvoteHandler(e, id, userId, "q");
                setUpvoted(true);
              }
            }}
            edge="start"
            className={ data.q.votes.includes(userId) ? classes.selfVoteButton : classes.voteButton }
            aria-label="upvote"
          >
            <ExpandLessIcon className={classes.voteMore} />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography className={classes.voteCount}>
            {data.q.voteCount}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} md={9}>
        <Grid container direction="column" justify="space-between">
          <Grid item>
            {data.q.body.blocks ? (
              <MuiThemeProvider theme={updateTheme}>
                <MUIRichTextEditor
                  readOnly={true}
                  toolbar={false}
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
                  defaultValue={JSON.stringify(data.q.body)}
                />
              </MuiThemeProvider>
            ) : (
              <Typography
                variant="body1"
                component="body"
                className={classes.questionText}
              >
                {data.q.body.charAt(0).toUpperCase() + data.q.body.slice(1)}
              </Typography>
            )}
          </Grid>
          <Grid item className={classes.nameLanguage}>
            <Grid container direction="row" alignItems="center" spacing={2}>
              <Grid item>
                <BetterLink href="/user/[id]/" as={`/user/${data.q.ownerUserId}`}>
                  <Typography className={classes.questionPoster}>
                    @{data.q.ownerName}
                  </Typography>
                </BetterLink>
              </Grid>
              <Grid item>
                {data.q.language.map((lang) => (
                  <Link href={`/language/${lang}`} passHref>
                    <Button
                      variant="contained"
                      onClick={props.goToLanguage}
                      size="small"
                      className={classes.languageButton}
                      style={{
                        background: languages.filter((l) => l.name == lang)[0]
                          .color,
                      }}
                    >
                      {lang}
                    </Button>
                  </Link>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <form onSubmit={formik.handleSubmit}>
            <Grid item className={classes.responseEditorContainer}>
              <GenericEditor
                forwardRef={editorRef}
                label={"Buraya cevabınızı yazın..."}
                handleChange={formik.setFieldValue}
                handleBlur={formik.setFieldTouched}
                userId={userId}
                postId={id}
                defaultValue={defaultValue}
              />
              {formik.errors.bodyText && formik.touched.bodyText ? (
                formik.errors.bodyText.blocks[0] ? (
                  <div className={classes.error}>
                    {formik.errors.bodyText.blocks[0].text}
                  </div>
                ) : null
              ) : null}
            </Grid>
            <Grid className={classes.emojiBar}>
              <EmojiBar
                postId={id}
                userId={userId}
                postType={"q"}
                reaction={props.reaction}
                reactionUpvoteHandler={props.reactionUpvoteHandler}
              />
            </Grid>
            <Grid item align="right" className={classes.postButtonGrid}>
              <Button
                type="submit"
                variant="contained"
                size="small"
                color="secondary"
                disabled={!formik.isValid}
                className={classes.postButton}
              >
                Paylaş
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
      <Grid item xs={12} md={2} className={classes.leftColumnContainer}>
        <Grid container direction="column">
          <Grid item>
            <Typography className={classes.questionResponders}>
              {data.q.answerCount} Cevap
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PostQuestion;
