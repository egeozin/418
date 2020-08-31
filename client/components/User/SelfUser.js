import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { orange } from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import OtherUser from "./OtherUser";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';

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
  },
  buttonStyle: {
    alignSelf: "center",
  },
  fab: {
    margin: theme.spacing.unit,
    fontSize: 18,
    fontWeight: "700",
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
}));

const SelfUser = (props) => {
  const classes = useStyles();
  const { data, user } = props;
  const [edit, setEdit] = useState(false);

  const [values, setValues] = React.useState({
    username: data.username,
    name: data.name,
    email: data.email,
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  if (!edit)
    return (
      <>
        <OtherUser data={data} />{" "}
        <Fab
          color="secondary"
          aria-label="Edit"
          variant="extended"
          className={classes.fab}
          onClick={() => {
            setEdit(true);
          }}
        >
          <EditIcon className={classes.extendedIcon} />
          Düzenle
        </Fab>
      </>
    );

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
            className={classes.TextFieldContainer}
            id="outlined-multiline-flexible-1"
            label="Kullanıcı Adı"
            multiline
            rowsMax={4}
            value={values.username}
            onChange={handleChange("username")}
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
            className={classes.TextFieldContainer}
            id="outlined-multiline-flexible-2"
            label="Ad Soyad"
            multiline
            InputLabelProps={{
              shrink: true,
            }}
            rowsMax={4}
            value={values.name}
            onChange={handleChange("name")}
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
            type="email"
            className={classes.TextFieldContainer}
            id="outlined-multiline-flexible-3"
            label="Email"
            multiline
            rowsMax={4}
            value={values.email}
            onChange={handleChange("email")}
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
          <Fab
            onClick={() => {
              setEdit(false);
            }}
            aria-label="Edit"
            variant="extended"
            className={classes.fab}
          >
            <CancelIcon className={classes.extendedIcon} />
            İptal
          </Fab>
          <Fab
            color="primary"
            aria-label="Edit"
            variant="extended"
            className={classes.fab}
            onClick={() => {
              console.log(values);
            }}
          >
            <SaveIcon className={classes.extendedIcon} />
            Kaydet
          </Fab>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SelfUser;
