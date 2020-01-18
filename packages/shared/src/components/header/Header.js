import React from "react";
import { Typography, makeStyles, IconButton } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles(theme => ({
  headlineWrapper: {
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    flexFlow: "column",
    alignItems: "stretch",
    color: "white"
  },
  subHeadlineWrapper: {
    backgroundColor: theme.palette.secondary.dark
  },
  buttonSet: {
    display: "flex",
    justifyContent: "space-between",
  },
  h1: {
    margin: theme.spacing(0, 2),
    fontSize: "30px",
    fontWeight: "500"
  },
  h2: {
    fontSize: "20px",
    fontWeight: "100",
    marginBottom: "25px"
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
        <IconButton
          size="large"
          color="secondary"
          className={classes.button}
          onClick={() => props.signOut()}
        >
          <ExitToAppIcon />
        </IconButton>
      </>
    );
  };

  const returnToOwnBoardButton = () => {
    return (
      <>
        <IconButton
          href="/"
          size="large"
          color="secondary"
          className={classes.button}
          onClick={() => {}}
        ><HomeIcon />
        </IconButton>
      </>
    );
  };
  return (
    <>
      <div className={classes.headlineWrapper}>
        <div className={classes.buttonSet}>
          {props.returnToOwnBoardButton && returnToOwnBoardButton()}
          {props.signOutButton && signOutButton()}
        </div>
        <Typography className={classes.h1} variant="h2" gutterBottom>
          Brownie Points
        </Typography>
        <Typography className={classes.h2} variant="h3">
          {`${getUserName()} Scoreboard`}
        </Typography>
      </div>
    </>
  );
};

export default Header;
