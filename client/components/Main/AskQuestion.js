import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Typography, Button, makeStyles, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  askQuestionTitle: {
    fontFamily: "Hind",
    fontWeight: 600,
    lineHeight: 1.2,
    fontSize: 36,
    padding: 10,
  },
  postButton: {
    background: "linear-gradient(45deg, #FF9E38 30%, #FE6B8B 90%)",
    borderRadius: 3,
    boxShadow: "none",
    border: 0,
    fontSize: 20,
    fontWeight: 600,
    color: "white",
    height: 24,
    padding: 20,
    margin: "10px 0px",
  },
}));

const AskQuestion = () => {
  const classes = useStyles();
  return (
    <>
      <Grid item xs>
        <Typography className={classes.askQuestionTitle}>
          Sorunuzu paylaşın!
        </Typography>
      </Grid>
      <Grid item xs>
        <Link href={`/soru-sor`} passHref>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.postButton}
          >
            Soru Sor
          </Button>
        </Link>
      </Grid>
    </>
  );
};

export default AskQuestion;
