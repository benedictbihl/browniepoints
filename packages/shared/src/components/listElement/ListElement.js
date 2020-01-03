import React, { useState } from "react";
import {
  IconButton,
  Typography,
  OutlinedInput,
  DialogTitle,
  Dialog,
  Container,
  Button,
  makeStyles
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteIcon from "@material-ui/icons/Delete";
import red from "@material-ui/core/colors/red";

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
  deleteButton: {
    backgroundColor: red[700],
    color: "#fff"
  },
  deleteIcon: {
    color: red[700]
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
  },
  wrapper: {
    marginBottom: theme.spacing(3),
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(0, 2)
  },
  button: {
    marginTop: theme.spacing(2)
  }
}));

const ListElement = props => {
  const classes = useStyles();
  const [editMode, toggleEditMode] = useState(false);
  const [score, setScore] = useState(props.score);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const item = () => {
    return (
      <>
        <div className={classes.name}>
          {!props.isInGuestView && (
            <IconButton
              className={classes.icon}
              onClick={() => toggleEditMode(true)}
            >
              <EditIcon color="primary" fontSize="inherit" />
            </IconButton>
          )}
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
              props.onSubmit(props.name, score);
              toggleEditMode(false);
            }}
          >
            <DoneIcon color="primary" fontSize="inherit" />
          </IconButton>
          <Typography variant={props.variant}>{props.name}</Typography>
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
          <IconButton
            className={classes.icon}
            onClick={() => setOpenDeleteDialog(true)}
          >
            <DeleteIcon className={classes.deleteIcon} fontSize="inherit" />
          </IconButton>
          <Dialog
            onClose={() => setOpenDeleteDialog(false)}
            aria-labelledby="simple-dialog-title"
            open={openDeleteDialog}
          >
            <DialogTitle id="simple-dialog-title">
              Delete this entry?
            </DialogTitle>
            <Container className={classes.wrapper}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={() => setOpenDeleteDialog(false)}
              >
                Cancel
              </Button>
              <Button
                className={classes.deleteButton}
                variant="contained"
                size="large"
                onClick={() => {
                  toggleEditMode(false);
                  setOpenDeleteDialog(false);
                  props.onDelete(props.name);
                }}
              >
                Delete
              </Button>
            </Container>
          </Dialog>
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
