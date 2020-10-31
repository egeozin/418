import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  blockQuote: {
    color: '#fefefe',
    fontStyle: 'italic',
    borderLeft: '4px solid #d5d5d5',

    '& > div': {
      margin: '18px 40px',
    },
  },
}));

const Blockquote = (props) => {
  const classes = useStyles();

  return <div className={classes.blockQuote}>{props.children}</div>;
};

export default Blockquote;
