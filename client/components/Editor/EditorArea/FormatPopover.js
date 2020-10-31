import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import Tooltip from '@material-ui/core/Tooltip';
import ListIcon from '@material-ui/icons/List';
import TextFormatIcon from '@material-ui/icons/TextFormat';
import Zoom from '@material-ui/core/Zoom';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formattingPopover: {
    padding: 10,
  },
  typography: {
    padding: theme.spacing(1),
  },
  bold: {
    fontWeight: 'bold',
    color: '#ff921e',
    padding: theme.spacing(0.5),
    fontSize: 16,
  },
  tipsIcon: {
    marginLeft: 20,
    cursor: 'pointer',
    transition: 'all 0.25s ease-in-out',
    '&:hover': {
      color: '#ff921e',
    },
  },
  listIcon: {
    verticalAlign: 'middle',
  },
}));

const FormatPopover = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Tooltip TransitionComponent={Zoom} title="Öneriler" arrow>
        <TextFormatIcon
          aria-describedby={id}
          variant="contained"
          onClick={handleClick}
          fontSize="large"
          className={classes.tipsIcon}
        />
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div className={classes.formattingPopover}>
          <Typography className={classes.typography}>
            Kod parçaları için{' '}
            <span className={classes.bold}>
              {'<'}
              {' >'}
            </span>{' '}
            kullanabilirsiniz.
          </Typography>
          <Typography className={classes.typography}>
            Vurgu yapmak istediğiniz kelimeler için <span className={classes.bold}>B </span>
            kullanabilirsiniz.
          </Typography>
          <Typography className={classes.typography}>
            Listeleme yapmak için
            <span className={`${classes.bold} ${classes.listIcon}`}>
              <ListIcon />
            </span>
            kullanabilirsiniz.
          </Typography>
        </div>
      </Popover>
    </div>
  );
};

export default FormatPopover;
