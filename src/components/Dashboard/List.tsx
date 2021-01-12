import React from "react";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Firebase from 'firebase'
import { useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

function List() {

    const classes = useStyles();
    const [users, setUsers] = useState<any>([]);
    const db = Firebase.firestore();
      
      
    db.collection("places")
    .where("country_code" ,"==", "IR")
    .get().then(function(querySnapshot) {     
         const cd = querySnapshot.size; 
      console.log(cd); 
   });

  return(
    <div className={classes.root}>
        <Grid container spacing={3}>
            <Grid item xs={3}>
            <Paper className={classes.paper}>IR
            
            </Paper>
            </Grid>
            <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
            </Grid>
            <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
            </Grid>
            <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
            </Grid>
        </Grid>
    </div>
  )

}

export default List;
