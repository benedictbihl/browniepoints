import React, { useState } from "react";
import {
  TextField,
  makeStyles,
  IconButton,
  Button,
  OutlinedInput
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const useStyles = makeStyles(theme => ({
  score: { display: "flex", alignItems: "center" },
  scoreField: { maxWidth: "100px", backgroundColor: "#fff" },
  nameInput: { backgroundColor: "#fff" },
  name: { display: "flex", alignItems: "center" },
  icon: {
    fontSize: "2rem",
    [theme.breakpoints.down("sm")]: {
      marginRight: "0"
    }
  },
  number: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      margin: "0"
    }
  },
  addButton: {
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2, 0)
    }
  },
  listItemWrapper: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    margin: theme.spacing(4, 0),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2, 0),
      justifyContent: "center"
    }
  }
}));

const AddPerson = props => {
  const [input, setInput] = useState("Add someone");
  const [score, setScore] = useState(0);
  const classes = useStyles();

  function getId(input) {
    if (
      props.tableEntries.filter(entry => entry.data().name === input).length > 0
    )
      return props.tableEntries.filter(entry => entry.data().name === input)[0]
        .id;
    else return "0";
  }
  if (props.disabled) return <></>;

  return (
    <div className={classes.listItemWrapper}>
      <div className={classes.name}>
        <OutlinedInput
          placeholder={input}
          onChange={() => setInput(event.target.value)}
          className={classes.nameInput}
        />

        <IconButton
          disabled={props.disabled}
          className={classes.icon}
          onClick={() => setScore(score - 1)}
        >
          <RemoveIcon fontSize="inherit" />
        </IconButton>
        <OutlinedInput
          placeholder={score}
          className={classes.scoreField}
          type="number"
          value={score}
          onChange={() => setScore(parseInt(event.target.value))}
        />
        <IconButton
          className={classes.icon}
          onClick={() => {
            setScore(score + 1);
          }}
        >
          <AddIcon fontSize="inherit" />
        </IconButton>
      </div>
      <Button
        className={classes.addButton}
        onClick={() => {
          setScore(0);
          setInput("");
          props.onSubmit(getId(input), input, score);
        }}
        variant="contained"
        size="large"
        color="primary"
      >
        Add Person
      </Button>
    </div>
  );
};

export default AddPerson;
