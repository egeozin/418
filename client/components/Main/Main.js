import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Typography,
  Grid,
  Divider,
  makeStyles,
  Button,
  Container,
} from "@material-ui/core";
import Question from "../Question";
import AskQuestion from "./AskQuestion";
import CircularProgress from "@material-ui/core/CircularProgress";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import Tags from "./Tags";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
  },
  flexGrow: {
    flexGrow: 1,
  },
  title: {
    fontFamily: "Hind",
    fontWeight: 600,
    fontSize: 32,
    marginTop: 30,
  },
  nextPage: {
    fontFamily: "Hind",
    fontWeight: 600,
    fontSize: 20,
  },
  nextPageContainer: {
    marginTop: 30,
  },
  nextIcon: {
    padding: 0,
    fontSize: 24,
    marginLeft: 4,
  },
  rightTitle: {
    lineHeight: "29px",
  },
  divider: {
    marginBottom: 20,
  },
  mainContainer: {
    maxWidth: 1200,
  },
  mainGridContainer: {
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
    marginTop: 20,
  },
  mainBarContainer: {
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
    padding: "0px 40px",
  },
  questionsContainer: {},
  askQuestionContainer: {
    borderStyle: "solid",
    borderRadius: "5px",
    borderWidth: "1px",
    borderColor: theme.palette.background.border,
    textAlign: "center",
    padding: 10,
  },
  tagContainer: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  tagsLabel: {},
}));

const updateVote = (userid, postid) =>
  fetch("/api/soru/upvote", {
    method: "POST",
    body: JSON.stringify({ userId: userid, postId: postid }),
  }).then((res) => res.json());

const Main = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data, mutateFunc, auth, userId, size, count } = props;

  async function handleUpVote(event, idx, postId) {
    event.preventDefault();
    if (userId) {
      const newData = {
        id: data[idx].id,
        data: { ...data[idx].data, voteCount: data[idx].data.voteCount + 1 },
      };
      // update the local data immediately
      // NOTE: key is not required when using useSWR's mutate as it's pre-bound
      mutateFunc(async (data) => {
        const { docExists, error } = await updateVote(userId, postId);
        if (!docExists) {
          return data.map((d, i) => {
            return i == idx ? newData : d;
          });
        }
      }, false);
    } else {
      router.push("/auth/standard");
    }
  }

  return (
    <Container maxWidth="md" className={classes.mainContainer}>
      <Grid
        container
        xs={12}
        md={12}
        // spacing={4}
        className={classes.mainGridContainer}
      >
        <Grid item xs={12} md={9} className={classes.mainBarContainer}>
          <Grid
            item
            container
            direction="column"
            className={classes.askQuestionContainer}
          >
            <AskQuestion />
          </Grid>
          <Typography
            variant="h2"
            component="h2"
            className={classes.title}
            gutterBottom
          >
            Güncel Sorular
          </Typography>
          <Divider className={classes.divider} />
          <Grid
            container
            direction="column"
            wrap="nowrap"
            spacing={2}
            className={classes.questionsContainer}
          >
            {!data ? (
              <CircularProgress />
            ) : (
              data.map((q, i) => {
                return (
                  <Grid key={i} item>
                    <Question
                      q={q}
                      auth={auth}
                      index={i}
                      handleUpVote={handleUpVote}
                    />
                  </Grid>
                );
              })
            )}
          </Grid>
          {size > count * 15 ? (
            <div className={classes.nextPageContainer}>
              <Button variant="text" onClick={() => props.onClick()}>
                <Grid container direction="row" wrap="nowrap" align="center">
                  <Grid item>
                    <Typography
                      variant="h4"
                      component="h4"
                      className={classes.nextPage}
                      gutterBottom
                    >
                      Sonraki sayfa
                    </Typography>
                  </Grid>
                  <Grid item>
                    <ArrowForwardIcon className={classes.nextIcon} />
                  </Grid>
                </Grid>
              </Button>
            </div>
          ) : null}
        </Grid>
        <Grid container item xs={3} className={classes.tagContainer}>
          <Tags />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Main;
