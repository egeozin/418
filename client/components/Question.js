import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import BetterLink from './Link';
import Link from 'next/link';
import IconButton from '@material-ui/core/IconButton';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { makeStyles } from '@material-ui/core/styles';
import languages from '../src/languages';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
    background: '#212A4F',
  },
  flexGrow: {
    flexGrow: 1,
  },
  questionContainer: {},
  questionTextContainer: {
    marginTop: 12,
  },
  questionTitle: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 10,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  question: {},
  questionPoster: {},
  questionPostedIn: {},
  questionResponders: {},
  languageButton: {
    background: 'linear-gradient(45deg, var(--background-start) 30%, var(--background-end) 90%)',
    borderRadius: 3,
    boxShadow: 'none',
    border: 0,
    fontSize: 14,
    fontWeight: 600,
    color: 'white',
    height: 24,
    marginRight: 10,
    padding: '0 10px',
  },
  buttons: {
    marginLeft: -8,
    marginRight: 8,
    maxWidth: 48,
    maxHeight: 150,
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
  },
  voteLess: {
    fontSize: 40,
  },
  divider: {
    marginTop: 20,
    marginBottom: 30,
  },
}));

const Question = (props) => {
  const classes = useStyles();
  const [userid, setUserid] = useState(null);

  const { q, userId, auth } = props;
  const included = userId ? q.data.votes.includes(userId) : false;
  const [upvoted, setUpvoted] = useState(included);
  let renderDate = null;

  useEffect(() => {
    setUpvoted(included);
  }, [included]);

  if (q.data.creationDate) {
    const date = new Date(q.data.creationDate.seconds * 1000);
    const formattedDate = new Intl.DateTimeFormat('tr-TR').format(date);
    renderDate = (
      <Grid item>
        <Typography>{formattedDate}</Typography>
      </Grid>
    );
  }

  return (
    <Grid container direction="row" spacing={1} className={classes.questionContainer}>
      <Divider className={classes.divider} />

      <Grid
        container
        item
        direction="column"
        alignItems="center"
        justify="center"
        xs={1}
        className={classes.buttons}
      >
        <Grid item xs>
          <IconButton
            onClick={(e) => {
              let newUpvoted = !upvoted;
              props.handleUpVote(e, props.index, q.id, newUpvoted);
              setUpvoted(newUpvoted);
            }}
            edge="start"
            className={upvoted ? classes.selfVoteButton : classes.voteButton}
            size="small"
            aria-label="upvote"
          >
            <ExpandLessIcon className={classes.voteMore} />
          </IconButton>
        </Grid>
        <Grid item xs>
          <Typography className={classes.voteCount}>{q.data.voteCount}</Typography>
        </Grid>
      </Grid>

      <Grid item xs={8} className={classes.questionTextContainer}>
        <Grid container direction="column">
          <Grid item>
            <BetterLink href="/soru/[id]/" as={`/soru/${q.id}`} style={{ textDecoration: 'none' }}>
              <Typography variant="h5" component="h5" className={classes.questionTitle}>
                {q.data.title.charAt(0).toUpperCase() + q.data.title.slice(1)}
              </Typography>
            </BetterLink>
          </Grid>
          <Grid item>
            <Grid container direction="row" alignItems="center" spacing={2}>
              <Grid item>
                <Typography className={classes.questionPoster}>{q.data.ownerName}</Typography>
              </Grid>
              <Grid item>
                {q.data.language.map((lang) => (
                  <Link href={`/language/${lang}`} passHref>
                    <Button
                      variant="contained"
                      size="small"
                      className={classes.languageButton}
                      style={{
                        background: languages.filter((l) => l.name == lang)[0].color,
                      }}
                    >
                      {lang}
                    </Button>
                  </Link>
                ))}
              </Grid>
              <Grid item>
                <Typography className={classes.questionResponders}>
                  {q.data.answerCount} cevap
                </Typography>
              </Grid>
              {renderDate}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

/*
'--background-start': '#FE6B8B',
'--background-end': '#FF8E53',
'--box-shadow': 'rgba(255, 105, 135, .3)',
*/

export default Question;
