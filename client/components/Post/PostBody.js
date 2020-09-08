import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import PostQuestion from "./PostQuestion";
import PostAnswers from "./PostAnswers";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
  },
  flexGrow: {
    flexGrow: 1,
  },
  title: {
    fontSize: 36,
    lineHeight: 1.2,
    fontFamily: "Hind, sans-serif",
    fontWeight: 700,
  },
  oops: {
    fontSize: 28,
    fontFamily: "Hind, sans-serif",
    fontWeight: 700,
  },
  rightTitle: {
    lineHeight: "29px",
  },
  divider: {
    marginTop: 10,
    marginBottom: 20,
  },
  postContainer: {},
  postGridContainer: {
    marginTop: 20,
  },
  questionContainer: {
    minHeight: 200,
  },
  leftColumnContainer: {
    maxWidth: 120,
  },
  questionText: {
    marginTop: 5,
    fontSize: 18,
    lineHeight: 1.5,
  },
  buttons: {
    marginTop: -6,
    marginLeft: 4,
  },
  voteButton: {
    color: theme.palette.text.secondary,
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
    padding: "0 10px",
  },
}));

const updateReaction = (userid, postid, reactionType ) => {
  return fetch("/api/soru/react", {
    method: "POST",
    body: JSON.stringify({ userId: userid, postId: postid, reaction: reactionType }),
  }).then((res) => res.json());
}

const updateVote = (userid, postid) =>
  fetch("/api/soru/upvote", {
    method: "POST",
    body: JSON.stringify({ userId: userid, postId: postid }),
  }).then((res) => res.json());

const PostBody = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const { id, userId, userName, data, mutate, onMutate, handleDelete } = props;

  console.log(data);

  const [reaction, setReaction] = useState({
    q: {
      id: id,
      likeCount: data.q.likeCount,
      clapCount: data.q.clapCount,
      confusedCount: data.q.confusedCount,
    },
    a: data.a.map((el) => {
        return {
          id: el.id,
          likeCount: el.likeCount,
          clapCount: el.clapCount,
          confusedCount: el.confusedCount,
        };
      }),
  }, []);

  const reactionUpvoteHandler = (reactionType, postType, i, postId) => {
    if (userId) {
        if (postType === "a") {
          var newReaction = {
            ...reaction,
            a: data.a.map(el => {
                if (el.id === postId) {
                  return {
                    id: el.id, 
                    likeCount: el.likeCount, 
                    clapCount: el.clapCount, 
                    confusedCount: el.confusedCount,
                    [reactionType]: el[reactionType] + 1,
                  };
                } else {
                  return el;
                }
              }),
          };
          var newData = {
            ...data,
            a: data.a.map(el => {
                if (el.id === postId) {
                    return { ...el, ...newReaction.a.filter(e => {return e.id === postId})[0] }
                } else {
                    return el
                }
            })
          };
        } else {
          var newReaction = {
            ...reaction,
            [postType]: {
              ...reaction[postType],
              [reactionType]: reaction[postType][reactionType] + 1,
            },
          };
          var newData = {
            ...data,
            q: { ...data.q, ...newReaction.b },
          };
        }
        mutate(async (data) => {
            const { reactionExists, error } = await updateReaction(userId, postId, reactionType);
            if (!reactionExists) {
                setReaction(newReaction);
                return newData;
            }
        }, false);
    } else {
        router.push(`/auth/soru/${id}`);
    }
  };


  return (
    <Grid container alignItems="stretch">
      {!data.q ? (
        <Typography
          variant="h3"
          component="h3"
          className={classes.oops}
          gutterBottom
        >
          Yüklenemedi, tekrar deneyin.
        </Typography>
      ) : (
        <>
          <Typography
            variant="h3"
            component="h3"
            className={classes.title}
            gutterBottom
          >
            {data.q.title.charAt(0).toUpperCase() + data.q.title.slice(1)}
          </Typography>
          <Grid container direction="column" wrap="nowrap">
            <Divider className={classes.divider} />
            {reaction ? 
                (<>
                    <PostQuestion
                      data={data}
                      id={data.id}
                      userId={userId}
                      userName={userName}
                      mutate={mutate}
                      onMutate={onMutate}
                      reaction={reaction.q}
                      reactionUpvoteHandler={reactionUpvoteHandler}
                    />
                    <PostAnswers
                      data={data.a}
                      parentId={data.id}
                      userId={userId}
                      reaction={reaction.a}
                      reactionUpvoteHandler={reactionUpvoteHandler}
                      upvoteHandler={handleUpVote}
                      handleDelete={handleDelete}
                    />
                </>)
                :
                null
            }
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default PostBody;
