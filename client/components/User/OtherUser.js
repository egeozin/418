import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { orange } from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: 25,
    marginTop: 25,
  },
  media: {
    maxWidth: 400,
    height: 0,
    paddingTop: "56.25%", // 16:9
    display: "block",
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  avatar: {
    backgroundColor: orange[500],
    width: 70,
    height: 70,
  },
  avatarContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  TextFieldContainer: {
    marginBottom: 20,
    "& .MuiInputBase-root.Mui-disabled": {
      color: "rgba(255, 255, 255, 1)",
    },
    "& .MuiFormLabel-root.Mui-disabled": {
      color: "rgba(255, 255, 255, 1)",
    },
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "white !important",
  },
}));

const OtherUser = (props) => {
  const classes = useStyles();
  const { data, user, handleChange } = props;
  return (
    <Grid container item>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        item
        xs={12}
      >
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          item
          xs={12}
        >
          <Grid className={classes.avatarContainer} item xs={12}>
            <Avatar aria-label="recipe" className={classes.avatar}>
              {data.name.charAt(0).toUpperCase()}
            </Avatar>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          item
          xs={8}
          className={classes.formInputContainer}
        >
          <TextField
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline,
              },
            }}
            className={classes.TextFieldContainer}
            id="outlined-multiline-flexible-1"
            label="Kullanıcı Adı"
            multiline
            disabled={user ? (user.id != data.id ? true : false) : true}
            rowsMax={4}
            value={data.username}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          item
          xs={8}
          className={classes.formInputContainer}
        >
          <TextField
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline,
              },
            }}
            className={classes.TextFieldContainer}
            id="outlined-multiline-flexible-2"
            label="Ad Soyad"
            multiline
            disabled={user ? (user.id != data.id ? true : false) : true}
            InputLabelProps={{
              shrink: true,
            }}
            rowsMax={4}
            value={data.name}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          item
          xs={8}
          className={classes.formInputContainer}
        >
          <TextField
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline,
              },
            }}
            className={classes.TextFieldContainer}
            id="outlined-multiline-flexible-3"
            label="Email"
            multiline
            disabled={user ? (user.id != data.id ? true : false) : true}
            rowsMax={4}
            value={data.email}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OtherUser;
