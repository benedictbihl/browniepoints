import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import {Container, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(4),
  },
  text: {
    height: '40px',
    marginLeft: '25%',
    marginRight: '25%',
  },
}));
const AddPointsSkeleton = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Skeleton variant="rect" width={536} height={302}>
          <Skeleton className={classes.text} width="50%" variant="text" />
          <Skeleton width="70%" variant="rect" height={50} />
          <Skeleton width="70%" variant="rect" />
        </Skeleton>
      </Container>
    </div>
  );
};

export default AddPointsSkeleton;
