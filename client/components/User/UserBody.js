import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { orange } from "@material-ui/core/colors";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import { Button } from "@material-ui/core";
import OtherUser from "./OtherUser";
import SelfUser from "./SelfUser";

const UserBody = (props) => {
  const { data, user } = props;
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
        {user && data.name != undefined ? (
          user.id != data.id ? (
            (console.log("kendisi değil",data), (<OtherUser data={data} />))
          ) : (
            (console.log("kendisi",data), (<SelfUser data={data} />))
          )
        ) : (
          console.log("user yok",data)
        )}
      </Grid>
    </Grid>
  );
};

export default UserBody;
