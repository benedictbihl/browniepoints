import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  h1: {
    backgroundColor: theme.palette.primary.main,
    paddingBottom: theme.spacing(2)
  },
  h2: { backgroundColor: theme.palette.secondary.main }
}));

const Header = () => {
  const classes = useStyles();
  return (
    <div>
      <Typography className={classes.h1} variant="h2">
        Brownie Points Tracker 🔥
      </Typography>

      <Typography className={classes.h2} variant="h3" gutterBottom>
        Iga's Scoreboard
      </Typography>
    </div>
  );
};

export default Header;
