import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  codeBlock: {
    color: '#fefefe',
    padding: '8px 16px',
    backgroundColor: '#4C5B9C',
    fontFamily: 'monospace',
    lineHeight: 1.5,
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word',
    maxHeight: '700px',
    overflowY: 'auto',
  },
}));

const CodeBlock = (props) => {
  const classes = useStyles();

  return <div className={classes.codeBlock}>{props.children}</div>;
};

export default CodeBlock;
