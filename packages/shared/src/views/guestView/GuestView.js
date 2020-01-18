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
    overflowY: "auto",
    marginTop: "20px",
  },
  addPerson: {
    backgroundColor: theme.palette.secondary.dark
  },
  share: {},
  first: {
    color: "white",
    background: "#E2AA00",
    borderRadius: "50%",
    width: "21px",
    height: "21px",
    lineHeight: "21px",
  },
  second: {
    color: "white",
    background: "#B6B6B6",
    borderRadius: "50%",
    width: "21px",
    height: "21px",
    lineHeight: "21px"
  },
  third: {
    color: "white",
    background: "#9E501C",
    borderRadius: "50%",
    width: "21px",
    height: "21px",
    lineHeight: "21px"
  },
  further: {
    borderRadius: "50%",
    width: "21px",
    height: "21px",
    lineHeight: "21px"
  },
}));

const trophies = (classes, index) => {
  switch (index) {
    case 0:
      return <div className={classes.first}>{ index + 1 }</div>;
    case 1:
      return <div className={classes.second}>{ index + 1 }</div>;
    case 2:
      return <div className={classes.third}>{ index + 1 }</div>;

    default:
      return <div className={classes.further}>{ index + 1 }</div>;
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
              index={trophies(classes, index)}
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
