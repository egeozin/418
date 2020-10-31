import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { orange } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import { Button } from '@material-ui/core';
import { useFormik } from 'formik';
import { userValidationSchema } from '../../utils/form';

import InfoField from './InfoField';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: 25,
    marginTop: 25,
  },
  media: {
    maxWidth: 400,
    height: 0,
    paddingTop: '56.25%', // 16:9
    display: 'block',
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  avatar: {
    backgroundColor: orange[500],
    width: 70,
    height: 70,
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 40,
  },

  inputContainer: {
    margin: 'auto',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  button: {
    marginTop: 20,
    borderRadius: 10,
  },

  formContainer: {
    width: '100%',
  },
}));

const updateUser = (userid, username, fullName) =>
  fetch('/api/user/update', {
    method: 'POST',
    body: JSON.stringify({
      userId: userid,
      username: username,
      fullName: fullName,
    }),
  }).then((res) => res.json());

const UserBody = (props) => {
  const classes = useStyles();
  const { data, user, handleChange } = props;
  const [editMode, setEditMode] = useState(false);

  const edit = () => {
    setEditMode(!editMode);
  };

  const onUserDetailSubmit = async (values) => {
    setEditMode(!editMode);
    const { updated, error } = await updateUser(data.id, values.username, values.fullName);
  };

  const cancelHandler = () => {
    setEditMode(false);
    formik.setErrors({});
    formik.values.fullName = data.name;
    formik.values.username = data.username;
  };

  const formik = useFormik({
    initialValues: {
      fullName: data.name,
      username: data.username,
    },
    validationSchema: userValidationSchema(data.username),
    onSubmit: onUserDetailSubmit,
  });

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center" item xs={12}>
      <Grid container direction="row" item xs={12}>
        <Grid className={classes.avatarContainer} item xs={12}>
          {data.photoImageURL ? (
            <Avatar aria-label="recipe" src={data.photoImageURL} className={classes.avatar} />
          ) : (
            <Avatar aria-label="recipe" className={classes.avatar}>
              {data.name ? data.name.charAt(0).toUpperCase() : 'U'}
            </Avatar>
          )}
        </Grid>
      </Grid>
      <Grid
        container
        direction="column"
        xs={6}
        alignItems="center"
        className={classes.inputContainer}
      >
        {user && (
          <>
            <form onSubmit={formik.handleSubmit} className={classes.formContainer}>
              <InfoField
                id="username"
                name="username"
                label="Kullanıcı Adı"
                value={formik.values.username}
                handleChange={formik.handleChange}
                isEditMode={editMode}
                formik={formik}
              />

              <InfoField
                id="fullName"
                name="fullName"
                label="Ad Soyad"
                value={formik.values.fullName}
                handleChange={formik.handleChange}
                isEditMode={editMode}
                formik={formik}
              />
            </form>
            <InfoField label="Email" value={data.email} handleChange={handleChange} />
          </>
        )}
      </Grid>
      <Grid container item xs={6} className={classes.buttonContainer}>
        {user &&
          user.id === data.id &&
          (editMode ? (
            <Button
              type="submit"
              variant="contained"
              size="medium"
              color="primary"
              className={classes.button}
              onClick={formik.handleSubmit}
              disabled={!formik.isValid}
            >
              Kaydet
            </Button>
          ) : (
            <Button
              variant="contained"
              size="medium"
              color="primary"
              className={classes.button}
              onClick={edit}
              disabled={!formik.isValid}
            >
              Profili Düzenle
            </Button>
          ))}
        {user && user.id === data.id && editMode && (
          <Button
            variant="outlined"
            size="medium"
            color="primary"
            className={classes.button}
            onClick={() => cancelHandler()}
          >
            İptal Et
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default UserBody;
