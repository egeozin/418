import { useState } from "react";
import { Typography, Button } from "@material-ui/core";
import Link from './Link';
import MuiLink from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    privacyText: {
      fontSize:18,
    },
    title: {
        fontFamily: "Hind, sans-serif",
        fontSize: 24,
        fontWeight: 600,
        marginBottom:10
    },
    consentButton: {
        marginTop:20,
        fontSize: 18,
        fontWeight: 500,
        color: "white",
    },
    outLink: {
      fontSize: 18,
      textDecoration: "none",
      color: '#036be8',
      fontFamily: "Lato, sans-serif",
      fontWeight: "600",
      fontStyle: "normal",
      "&:hover": {
        textDecoration: "underline",
        cursor: "pointer"
      },
    },
  }));
  
const Consent = props => {
    const classes = useStyles();
    return (
        <div> 
            <Typography
              className={classes.title}
            >
                Giriş Yap
            </Typography>
            <br/>
            <Typography
              className={classes.privacyText}
            >
              Devam tuşuna basarak kişisel verilerimin işlenmesine ilişkin 
              <Link href="https://drive.google.com/file/d/1MvxTx1zHBDCfd8rTqGVXgnM_IWZZqViF/view" className={classes.outLink}>
                <a target="_blank"> Aydınlatma Metni</a>
              </Link>
              ’ni okuduğumu, anladığımı ve onayladığımı kabul, beyan ve taahhüt ederim. 
            </Typography>
            <br/>
            <Typography
              className={classes.privacyText}
            >
              Devam tuşuna basarak kişisel verilerinin işlenmesine ilişkin 
              <Link href="https://drive.google.com/file/d/1xR2rMXDo_ffPRW9cRAswvjIpZ11nsNA1/view" className={classes.outLink}>
                <a target="_blank"> Açık Rıza Metni</a>
              </Link>’ni okuduğumu, anladığımı ve kişisel verilerimin yurt dışına aktarılmasına rızam olduğunu kabul, beyan ve taahhüt ederim. 
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              className={classes.consentButton}
              onClick={props.handleClick}
            >
                Devam
            </Button>


        </div>
    )
}

export default Consent;