import React from 'react';

import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  makeStyles,
  Container,
} from '@material-ui/core';

function createData(name, score) {
  return {name, score};
}

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 450,
  },
  tableContainer: {
    margin: theme.spacing(4, 0),
  },
}));

const ScoreTable = props => {
  const classes = useStyles();
  const rows = [];
  props.scores.map(entry => rows.push(createData(entry.name, entry.score)));
  return (
    <Container maxWidth="md">
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Brownie points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ScoreTable;
