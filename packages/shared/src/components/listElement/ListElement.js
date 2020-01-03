import React, { useState } from "react";
import {
  IconButton,
  TextField,
  Typography,
  OutlinedInput,
  makeStyles
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const useStyles = makeStyles(theme => ({
  score: { display: "flex", alignItems: "center" },
  scoreField: {
    [theme.breakpoints.up("sm")]: {
      maxWidth: "72px"
    }
  },
  name: { display: "flex", alignItems: "center" },
  icon: {
    marginRight: theme.spacing(2),
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
  textfield: {
    maxWidth: "50%"
  },
  listItemWrapper: {
    borderBottom: "1px solid #e0e0e0",
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(2, 0),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1, 0)
    }
  }
}));

const ListElement = props => {
  const classes = useStyles();
  const [editMode, toggleEditMode] = useState(false);
  const [input, setInput] = useState(props.name);
  const [score, setScore] = useState(props.score);

  function getId(input) {
    if (
      props.tableEntries.filter(entry => entry.data().name === input).length > 0
    )
      return props.tableEntries.filter(entry => entry.data().name === input)[0]
        .id;
    else return "0";
  }

  const item = () => {
    return (
      <>
        <div className={classes.name}>
          <IconButton
            className={classes.icon}
            onClick={() => toggleEditMode(true)}
          >
            <EditIcon color="primary" fontSize="inherit" />
          </IconButton>
          <Typography className={classes.number} variant={props.variant}>
            {props.index}
          </Typography>
          <Typography variant={props.variant}>{props.name}</Typography>
        </div>
        <div className={classes.score}>
          <Typography variant={props.variant}>{props.score}</Typography>
        </div>
      </>
    );
  };

  const itemEdit = () => {
    return (
      <>
        <div className={classes.name}>
          <IconButton
            className={classes.icon}
            onClick={() => {
              props.onSubmit(getId(input), input, score);
              toggleEditMode(false);
            }}
          >
            <DoneIcon color="primary" fontSize="inherit" />
          </IconButton>
          <OutlinedInput
            className={classes.textfield}
            type="text"
            value={input}
            onChange={() => setInput(event.target.value)}
          />
        </div>
        <div className={classes.score}>
          <IconButton
            className={classes.icon}
            onClick={() => {
              setScore(score - 1);
            }}
          >
            <RemoveIcon color="primary" fontSize="inherit" />
          </IconButton>
          <OutlinedInput
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
            <AddIcon color="primary" fontSize="inherit" />
          </IconButton>
        </div>
      </>
    );
  };

  return (
    <div className={classes.listItemWrapper}>
      {editMode ? itemEdit() : item()}
    </div>
  );
};

export default ListElement;
