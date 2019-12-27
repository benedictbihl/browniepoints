import React, {useState} from 'react';
import {
  Button,
  Slider,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  margin: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const AddPoints = props => {
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const classes = useStyles();

  const marks = [
    {
      value: 1,
      label: '1',
    },
    {
      value: 2,
      label: '2',
    },
    {
      value: 10,
      label: '10',
    },
  ];

  function valuetext(value) {
    return `${value} point(s)`;
  }
  function valueLabelFormat(value) {
    return marks.findIndex(mark => mark.value === value) + 1;
  }

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Paper className={classes.paper}>
          <Typography align={'center'} component="h1" variant="h5">
            Add Brownie Points
          </Typography>
          <div className={classes.margin}>
            <Typography align={'left'} gutterBottom>
              Select amount
            </Typography>
            <Slider
              onChangeCommitted={(event, value) => setScore(value)}
              defaultValue={1}
              valueLabelFormat={valueLabelFormat}
              getAriaValueText={valuetext}
              style={{width: 300}}
              step={null}
              valueLabelDisplay="auto"
              marks={marks}
              min={0}
              max={10}
              align={'left'}
            />
          </div>
          <div className={classes.margin}>
            <Autocomplete
              onInputChange={() =>
                setInput(
                  event.type === 'click'
                    ? event.target.innerText
                    : event.target.value,
                )
              }
              id="combo-box-demo"
              options={props.tableEntries}
              getOptionLabel={option => option.data().name}
              freeSolo
              renderInput={params => (
                <TextField
                  {...params}
                  label="Select or Add Person"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          </div>
          <Grid>
            <Button
              onClick={() =>
                props.onSubmit(
                  props.tableEntries.filter(
                    entry => entry.data().name === input,
                  )[0].id,
                  input,
                  score,
                )
              }
              variant="contained"
              color="primary">
              Add Points
            </Button>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default AddPoints;
