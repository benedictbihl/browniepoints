import React from "react";
import { Paper, makeStyles, Container } from "@material-ui/core";
import HeaderContainer from "shared/src/components/header/HeaderContainer";
import ListElementContainer from "shared/src/components/listElement/ListElementContainer";

const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    maxWidth: "51rem",
    margin: "0 auto",
    position: "relative"
  },
  tableContainer: {
    margin: theme.spacing(4, 0)
  },
  list: {
    flex: "1",
    overflowY: "auto"
  },
  addPerson: {
    backgroundColor: theme.palette.secondary.dark
  },
  share: {}
}));

const trophies = index => {
  switch (index) {
    case 0:
      return "🥇";
    case 1:
      return "🥈";
    case 2:
      return "🥉";

    default:
      return index + 1 + ".";
  }
};

const createData = (name, score) => {
  return { name, score };
};

const GuestView = props => {
  const classes = useStyles();
  const rows = [];
  props.scores.map(entry => rows.push(createData(entry.name, entry.score)));

  const mainContent = () => {
    if (props.withSigninMask) return <SignInMask />;
    else
      return (
        <>
          {rows.map((row, index) => (
            <ListElementContainer
              isInGuestView
              index={trophies(index)}
              name={row.name}
              score={row.score}
              variant="h3"
              key={index}
            />
          ))}
        </>
      );
  };

  return (
    <Paper className={classes.paper}>
      <HeaderContainer
        isInGuestView
        nameOfCurrentlyViewedBoard={props.nameOfCurrentlyViewedBoard}
      />
      <Container className={classes.list}>{mainContent()}</Container>
    </Paper>
  );
};

export default GuestView;
