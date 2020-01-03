import React from "react";
import { Typography, makeStyles, Button } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles(theme => ({
  headlineWrapper: {
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    flexFlow: "column-reverse",
    alignItems: "flex-end"
  },
  subHeadlineWrapper: {
    backgroundColor: theme.palette.secondary.dark
  }
}));

const Header = props => {
  const classes = useStyles();
  const getUserName = () => {
    return props.userName ? props.userName.split(" ")[0] + "'s" : "";
  };
  const signedInButtonSet = () => {
    return (
      <>
        <Button
          size="large"
          color="secondary"
          className={classes.button}
          onClick={() => props.signOut()}
          startIcon={<ExitToAppIcon />}
        >
          Logout
        </Button>
      </>
    );
  };
  return (
    <>
      <div className={classes.headlineWrapper}>
        <Typography className={classes.h1} variant="h2" gutterBottom>
          Brownie Points Tracker 🔥
        </Typography>
        {props.showSignedInButtonSet && signedInButtonSet()}
      </div>
      <div className={classes.subHeadlineWrapper}>
        <Typography className={classes.h2} variant="h3">
          {`${getUserName()} Scoreboard`}
        </Typography>
      </div>
    </>
  );
};

export default Header;
