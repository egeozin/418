import React from "react";
import { makeStyles } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  tag: {
    backgroundColor: (props) => props.color,
    padding: 8,
    margin: 5,
    "&:hover": {
      backgroundColor: (props) => props.color,
    },
    fontSize: 14,
    fontWeight: 400,
    color: "#fff",
  },
}));

const Tag = (props) => {
  const { label } = props;
  const classes = useStyles(props);

  return (
    <>
      <Chip
        label={label}
        component="a"
        href={`/language/${label}`}
        clickable
        className={classes.tag}
      />
    </>
  );
};

export default Tag;
