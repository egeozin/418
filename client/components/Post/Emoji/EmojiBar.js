import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Emoji from 'react-emoji-render';
import Badge from '@material-ui/core/Badge';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: '0px 0px',
  },
  iconButton: {
    transition: 'all .3s ease-in-out',
    '&:hover': {
      backgroundColor: '#dddddd30',
      transform: 'scale(1.1)',
    },
  },
  selfIconButton: {
    transition: 'all .3s ease-in-out',
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: theme.palette.background.border,
      transform: 'scale(1.1)',
    },
  },
  badge: {
    padding: '5px',
  },
}));

const EmojiBar = (props) => {
  const classes = useStyles();
  const { likeCount, clapCount, confusedCount, likes, claps, confuseds } = props.reaction;
  const [selected, setSelected] = useState({
    like: likes.includes(props.userId),
    clap: claps.includes(props.userId),
    confused: confuseds.includes(props.userId),
  });

  return (
    <div className={classes.wrapper}>
      <IconButton
        edge="start"
        className={selected.like ? classes.selfIconButton : classes.iconButton}
        onClick={() => {
          let newSelected = !selected.like;
          setSelected({
            ...selected,
            like: newSelected,
          });
          return props.reactionUpvoteHandler(
            'likeCount',
            props.postType,
            props.index,
            props.postId,
            props.userId,
            newSelected,
          );
        }}
      >
        <Badge badgeContent={likeCount} className={classes.badge}>
          <Emoji text=":+1:" />
        </Badge>
      </IconButton>

      <IconButton
        className={selected.clap ? classes.selfIconButton : classes.iconButton}
        onClick={() => {
          let newSelected = !selected.clap;
          setSelected({
            ...selected,
            clap: newSelected,
          });
          return props.reactionUpvoteHandler(
            'clapCount',
            props.postType,
            props.index,
            props.postId,
            props.userId,
            newSelected,
          );
        }}
      >
        <Badge badgeContent={clapCount} className={classes.badge}>
          <Emoji text=":clapping_hands:" />
        </Badge>
      </IconButton>
      <IconButton
        className={selected.confused ? classes.selfIconButton : classes.iconButton}
        onClick={() => {
          let newSelected = !selected.confused;
          setSelected({
            ...selected,
            confused: newSelected,
          });
          return props.reactionUpvoteHandler(
            'confusedCount',
            props.postType,
            props.index,
            props.postId,
            props.userId,
            newSelected,
          );
        }}
      >
        <Badge badgeContent={confusedCount} className={classes.badge}>
          <Emoji text=":confused:" />
        </Badge>
      </IconButton>
    </div>
  );
};

export default EmojiBar;
