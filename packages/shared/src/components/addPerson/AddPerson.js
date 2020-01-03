import React, { useState, useRef } from "react";
import {
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
      margin: theme.spacing(2, 0, 0, 0),
      justifyContent: "center"
    }
  }
}));

const AddPerson = props => {
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const classes = useStyles();
  const inputRef = useRef(null);

  return (
    <div className={classes.listItemWrapper}>
      <div className={classes.name}>
        <OutlinedInput
          onClick={() => {
            if (input.length <= 0) inputRef.current.value = "";
          }}
          onChange={() => setInput(event.target.value)}
          className={classes.nameInput}
          defaultValue="Enter name"
          inputRef={inputRef}
        />

        <IconButton
          color="primary"
          className={classes.icon}
          onClick={() => setScore(score - 1)}
        >
          <RemoveIcon fontSize="inherit" />
        </IconButton>
        <OutlinedInput
          className={classes.scoreField}
          type="number"
          value={score}
          onChange={() => setScore(parseInt(event.target.value))}
        />
        <IconButton
          color="primary"
          className={classes.icon}
          onClick={() => {
            setScore(score + 1);
          }}
        >
          <AddIcon fontSize="inherit" />
        </IconButton>
      </div>
      <Button
        disabled={input.length <= 0}
        className={classes.addButton}
        onClick={() => {
          setScore(0);
          setInput("");
          inputRef.current.value = "";
          props.onSubmit(input, score);
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
