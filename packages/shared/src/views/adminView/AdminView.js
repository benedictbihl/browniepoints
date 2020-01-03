import React from "react";
import HeaderContainer from "shared/src/components/header/HeaderContainer";
import ListElementContainer from "shared/src/components/listElement/ListElementContainer";
import AddPersonContainer from "shared/src/components/addPerson/AddPersonContainer";
import SignInMask from "shared/src/components/signInMask/SignInMask";
import { Paper, makeStyles, Container } from "@material-ui/core";
import ShareScoreboardContainer from "shared/src/components/shareScoreboard/ShareScoreboardContainer";

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

const AdminView = props => {
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
      <HeaderContainer />
      <Container className={classes.list}>
        {mainContent()}
        <ShareScoreboardContainer />
      </Container>
      <Container className={classes.addPerson} maxWidth="md">
        <AddPersonContainer />
      </Container>
    </Paper>
  );
};

export default AdminView;
