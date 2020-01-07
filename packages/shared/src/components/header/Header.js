import React from "react";
import { Typography, makeStyles, Button } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";

const useStyles = makeStyles(theme => ({
  headlineWrapper: {
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    flexFlow: "column-reverse",
    alignItems: "stretch"
  },
  subHeadlineWrapper: {
    backgroundColor: theme.palette.secondary.dark
  },
  buttonSet: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row-reverse"
  },
  h1: {
    margin: theme.spacing(0, 2)
  }
}));

const Header = props => {
  const classes = useStyles();
  const getUserName = () => {
    return props.userName ? props.userName.split(" ")[0] + "'s" : "";
  };
  const signOutButton = () => {
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

  const returnToOwnBoardButton = () => {
    return (
      <>
        <Button
          href="/"
          size="large"
          color="secondary"
          className={classes.button}
          onClick={() => {}}
          startIcon={<KeyboardReturnIcon />}
        >
          Return to your Board
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
        <div className={classes.buttonSet}>
          {props.signOutButton && signOutButton()}
          {props.returnToOwnBoardButton && returnToOwnBoardButton()}
        </div>
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
