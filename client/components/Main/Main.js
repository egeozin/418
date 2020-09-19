import React, { useState, useEffect  } from "react";
import { useRouter } from 'next/router'
import Link from "next/link";
import { Typography, Grid, Divider, makeStyles, Button, Container} from "@material-ui/core";
import Question from "../Question";
import AskQuestion from "./AskQuestion";
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';


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
  },
  nextPage: {
    fontFamily: "Hind",
    fontWeight: 600,
    fontSize: 20,
  },
  nextPageContainer: {
    marginTop:30
  },
  nextIcon: {
    padding: 0,
    fontSize:24,
    marginLeft: 4
  },
  rightTitle: {
    lineHeight: "29px",
  },
  divider: {
    marginBottom: 20,
  },
  mainContainer: {
    maxWidth: 900,
  },
  mainGridContainer: {
    marginTop: 20,
  },
  questionsContainer: {},
  askQuestionContainer:{
    borderStyle: 'solid',
    borderRadius: '5px',
    borderWidth: '1px' ,
    borderColor:  theme.palette.background.border,
    margin: 10,
    textAlign: "center"
  }
}));


const updateVote = (userid, postid, selected) =>
  fetch("/api/soru/upvote", {
    method: "POST",
    body: JSON.stringify({ userId: userid, postId: postid, selected: selected }),
  }).then((res) => res.json());



const Main = (props) => {
  const classes = useStyles();
  const router = useRouter()
  const [ loading, setLoading ] = useState(false);
  const { data, mutateFunc, auth, userId, size, count } = props

  async function handleUpVote(event, idx, postId, selected) {
    event.preventDefault();
    if (userId) { 
      var newData = {
          id: data[idx].id,
          data: {
            ...data[idx].data,
            voteCount: selected ? data[idx].data.voteCount + 1 : data[idx].data.voteCount - 1, 
            votes: selected ? [...data[idx].data.votes, userId] : data[idx].data.votes.filter(e => e != userId ) },
      };
      mutateFunc(async (data) => {
        const { status, error } = await updateVote(userId, postId, selected);
        if (status == "success") {
          return data.map((d, i) => {return (i == idx) ? newData : d})
        }
      }, false);
    } else {
      router.push('/auth/standard')
    }
  }
  
  return (
    <Container maxWidth="md" className={classes.mainContainer}>
      <Grid container spacing={4} className={classes.mainGridContainer}>
        <Grid item container direction="column" spacing={2} xs={12} md={12} className={classes.askQuestionContainer}>
          <AskQuestion />
        </Grid>
        <Grid item xs={12} md={12}>
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
            spacing={1}
            className={classes.questionsContainer}
          >
            { !data ?
              <CircularProgress />
              :
              data.map((q, i) => {
                return (
                  <Grid key={i} item>
                    <Question q={q} userId={userId} auth={auth} index={i} handleUpVote={handleUpVote} />
                  </Grid>
                );
              })
            }
          </Grid>
          {size > count*15 ? 
            <div className={classes.nextPageContainer}>
              <Button variant="text" onClick={() => props.onClick()}>
                <Grid
                  container
                  direction="row"
                  wrap="nowrap"
                  align="center"
                >
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
            : 
            null
          }
        </Grid>
      </Grid>
    </Container>
  );
};

export default Main;
