import React, { useState, useEffect } from "react";
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
  score: {
    display: "flex",
    alignItems: "center",
    fontSize: "11px",
  },
  scoreField: {
    [theme.breakpoints.down("md")]: {
      width: "50px"
    }
  },
  dot: {
    background: "#FAB715",
    borderRadius: "50%",
    width: "5px",
    height: "5px",
    marginLeft: "3px",
  },
  profileImage: {
    borderRadius: "50%",
    height: "36px",
    width: "36px",
    marginRight: "15px",
  },
  name: {
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    fontSize: "16px",
  },
  nameText: {
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
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
    fontSize: "11px",
    color: "grey",
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      margin: "0"
    },
    width: "30px"
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
      padding: theme.spacing(1.5, 0)
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
  },
}));

const ListElement = props => {
  const classes = useStyles();
  const [editMode, toggleEditMode] = useState(false);
  const [score, setScore] = useState(props.score);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  useEffect(() => {
    setScore(props.score);
  }, [props.score]);
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
          <Typography className={classes.number}>
            {props.index}
          </Typography>
          {/* Use unique profile image, identified by name. */}
          <img className={classes.profileImage} src={`https://api.adorable.io/avatars/150/${props.name}.png`}/>
          <Typography variant={props.variant}>{props.name}</Typography>
        </div>
        <div className={classes.score}>
          <Typography variant={props.variant}>{props.score}</Typography>
          <div className={classes.dot}></div>
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
          <Typography className={classes.nameText} variant={props.variant}>
            {props.name}
          </Typography>
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
