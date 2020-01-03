import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import {
  makeStyles,
  Fab,
  Dialog,
  DialogTitle,
  TextField,
  Container,
  Button
} from "@material-ui/core";

import ShareIcon from "@material-ui/icons/Share";

const useStyles = makeStyles(theme => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(18),
    right: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      bottom: theme.spacing(21)
    }
  },
  wrapper: {
    marginBottom: theme.spacing(3),
    display: "flex",
    flexFlow: "column",
    alignItems: "center"
  },
  button: {
    marginTop: theme.spacing(2)
  }
}));

const ShareScoreboard = props => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  return (
    <>
      <Fab
        color="primary"
        className={classes.fab}
        onClick={() => setOpen(true)}
      >
        <ShareIcon />
      </Fab>
      <Dialog
        onClose={() => setOpen(false)}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogTitle id="simple-dialog-title">
          Share your scoreboard via this link:
        </DialogTitle>
        <Container className={classes.wrapper}>
          <TextField
            id="outlined-read-only-input"
            defaultValue={props.link}
            InputProps={{
              readOnly: true
            }}
            variant="filled"
            fullWidth
          />
          <CopyToClipboard text={props.link}>
            <Button
              size="large"
              className={classes.button}
              variant="contained"
              color="primary"
            >
              Copy link to clipboard
            </Button>
          </CopyToClipboard>
        </Container>
      </Dialog>
    </>
  );
};

export default ShareScoreboard;
