import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import DashboardList from "./DashList";
import { red } from "@material-ui/core/colors";
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, createStyles, Dialog, DialogActions, DialogContent, DialogTitle, Icon, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, Typography, withStyles } from "@material-ui/core";
import Firebase, { constructor } from 'firebase'
import List from "../Dashboard/List";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    display: "flex",
    overflow: "auto",
    // flexDirection: "column",
    margin: 5,
    height: 180,
  },
  fixedHeight: {
    height: 750,
  },
  gridColor:{
    backgroundColor: 'red',
  },
  root: {
    // minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  dbname:{
    fontSize: 15,
    fontFamily: 'Arial',
    color: '#ffffff',
    marginTop: 100,
    float: "left",
  }
}));

function Dashboard() {
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [users, setUsers] = useState<any>([]);
  
    //   const db = Firebase.firestore();
          
    //   db.collection("users")
    //   .where("created_at","desc")
    //   .get().then(function(querySnapshot) {      
    //     console.log(querySnapshot.size); 
    // });
        

  useEffect(() => {
    Firebase
      .firestore() 
      .collection("places")
      // .where("country_code","==", "IR" )
      .orderBy("created_at", "desc") 
     
      .onSnapshot(snapshot => {
        const listItems = snapshot.docs.map(doc => ({
          id : doc.id, 
          ...doc.data()
          
        }));
        setUsers(listItems); 
      });
  }, []);
  const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

  return (
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item xs={12} md={12} lg={12}>
        <Paper className={fixedHeightPaper}>{/* <MapContainer /> */}
                         
          <Grid item xs={4} >
            <Paper className={classes.paper} style={{ backgroundColor: '#00c0ef'}}>
              <div className={classes.dbname}>                 
                  <Button  color="primary" onClick={handleClickOpen}>
                  All Places
                  </Button>
                  <Dialog 
                    fullScreen
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title"> <h1></h1> </DialogTitle>
                    <DialogContent >

                    <List/>
                  
                    </DialogContent>
                    <DialogActions>
                 
                      <Button onClick={handleClose} color="primary" autoFocus>
                        Close
                      </Button>
                    </DialogActions>
                  </Dialog>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={4} >
          <Paper className={classes.paper} style={{ backgroundColor: '#fcba03'}}>
            </Paper>
          </Grid>
          <Grid item xs={4} >
            <Paper className={classes.paper} style={{ backgroundColor: '#fc2003'}}>
            </Paper>
          </Grid>

        </Paper>
      </Grid>
      {/* Recent Deposits */}
      {/* <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          <DashboardList />
        </Paper>
      </Grid> */}
    </Grid>
  );
}

export default Dashboard;
