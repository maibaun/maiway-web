import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import "dotenv/config";
import { Button, CardContent, FormControl, FormControlLabel, Grid, InputAdornment, OutlinedInput, TextField, withStyles } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Axios from "axios";
import Link from '@material-ui/core/Link';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Radio, { RadioProps } from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { blue, green } from "@material-ui/core/colors";
import Firebase, { app } from 'firebase';
import Swal from "sweetalert2";
import { Dns } from "@material-ui/icons";
import firebase from "firebase";
import { types } from "util";
import Stepperform from  '../routes/Stepperform';
import { v4 as uuidv4 } from 'uuid';
import { auth } from 'firebase'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    customButton2: {
      width: "8vw",
      minWidth: "80px",
      height: "3.5vh",
      marginLeft: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
    bottom: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "flex-end",
    },
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '56ch',
        marginLeft: 25,
      },
    },
    workinfo:{
      color: 'black',
    },
    legaldoc:{
      color: 'black',
    },
  })
);

// const GreenRadio = withStyles({
//     root: {
//       color: green[400],
//       '&$checked': {
//         color: green[600],
//       },
//     },
//     checked: {},
//   })((props: RadioProps) => <Radio color="default" {...props} />);

//   const BlueRadio = withStyles({
//     root: {
//       color: blue[400],
//       '&$checked': {
//         color: blue[600],
//       },
//     },
//     checked: {},
//   })((props: RadioProps) => <Radio color="default" {...props} />);

  function Step2application({
}: any) {


  const [inputs, setInputs] = useState({
    usertype: "",
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    setInputs((prevState) => ({ ...prevState, [name]: value }));

  };
  const classes = useStyles();
  const [usertype, setUsertype] = useState<any>();
  const [position, setPosition] = useState("");
  const [compname, seTCompname] = useState("");
  const [coe, setCoe] = useState("");
  const [orcr, setOrcr] = useState("");
  const [driver, setDriver] = useState("");
  const [storename, setStorename] = useState("");
  const [storeowner, setStoreowner] = useState("");
  const [storeaddress, setStoreaddress] = useState("");
  const [buspermit, setBuspermit] = useState("");
  const [open, setOpen] = React.useState(false);


  // useEffect(() => {
  //   const db = Firebase.firestore()


  // }, [])



  const onSave2 = () => {
    const db = firebase.firestore()
    db.collection("credentials").doc().set({
      position,
      compname,
      coe,
      orcr,
      driver,
      storename,
      storeowner,
      storeaddress,
      buspermit,
      created_at: new Date()
    })
    .then(function() {
          alert("successfully submitted!");
          console.log("Document successfully written!");
    })
      .catch(function(error) {
          alert(error);
          console.error("Error writing document: ", error);
    });
 
  };



  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
    <div>
        <Grid container className={classes.root} spacing={0}>
          <Grid item xs={12}>
            {/* <FormControl> */}
                <Grid container className={classes.workinfo}>
                    <div>
                      <FormControl variant="outlined" >
                        <InputLabel htmlFor="outlined-age-native-simple">Select Type of User</InputLabel>
                          <Select
                            className="select"
                            value={usertype}
                            onChange={e => {
                              setUsertype(e.target.value);
                            }}
                            label="Select Type"
                            style={{width:425}}
                          >
                            <MenuItem value={0}>
                            <em>Select</em>
                            </MenuItem>
                            <MenuItem value={1}>Guide</MenuItem>
                            <MenuItem value={2}>Store owner</MenuItem>
                            <MenuItem value={3}>Driver</MenuItem>
                          </Select>
                      </FormControl>
                    </div>
                  </Grid>
                  <Grid container className={classes.workinfo}>
                    <div id="workinfo">
                      <h4>Work Information</h4>
                      <div>
                        <TextField
                          label="Company Name"
                          id="compname"
                          type="text"
                          className="compname"
                          variant="outlined"
                          value={compname}
                            onChange={e => {
                              seTCompname(e.target.value);
                            }}
                          style={{marginBottom:20, width: 200, marginRight: 23}}
                        />
                        <TextField
                          label="Position"
                          type="text"
                          variant="outlined"
                          className="position"
                          id="position"
                          value={position}
                            onChange={e => {
                              setPosition(e.target.value);
                            }}
                          style={{marginBottom:20, width: 200}}
                        />
                      </div>

                      <div>
                        <div>Certificate of Employment</div>
                      <TextField
                          type="file"
                          variant="outlined"
                          className="coe"
                          id="coe"
                          value={coe}
                            onChange={e => {
                              setCoe(e.target.value);
                            }}
                          style={{width:425}}
                        />
                      </div>
                    </div>
                  </Grid>
                  <Grid container className={classes.legaldoc}>
                    <div>
                      <h4>Legal Documents</h4>
                      <div>
                        <div style={{display: 'flex'}}>OR / CR From LTO (optional)</div>
                        <TextField
                          type="file"
                          variant="outlined"
                          className="orcr"
                          id="orcr"
                          value={orcr}
                            onChange={e => {
                              setOrcr(e.target.value);
                            }}
                          style={{width:425}}
                        />
                      </div>
                      <div>
                        <div>Driver'e License</div>
                        <TextField
                            type="file"
                            variant="outlined"
                            id="driver"
                            className="driver"
                            value={driver}
                            onChange={e => {
                              setDriver(e.target.value);
                            }}
                            style={{width:425}}
                          />
                      </div>
                    </div>
                  </Grid>
                  <Grid container className={classes.legaldoc}>
                    <div>
                      <h4>Store Owner Documents</h4>

                      <div>
                        <TextField
                            label="Store Name"
                            type="text"
                            variant="outlined"
                            id="storename"
                            className="storename"
                            value={storename}
                            onChange={e => {
                              setStorename(e.target.value);
                            }}
                            style={{width:425}}
                          />
                        <TextField
                            label="Store Owner"
                            type="text"
                            variant="outlined"
                            className="storeowner"
                            id="storeowner"
                            value={storeowner}
                            onChange={e => {
                              setStoreowner(e.target.value);
                            }}
                            style={{width:425, marginTop: 20}}
                          />
                        <TextField
                            label="Store Address"
                            type="text"
                            variant="outlined"
                            className="storeaddress"
                            id="storeaddress"
                            value={storeaddress}
                            onChange={e => {
                              setStoreaddress(e.target.value);
                            }}
                            style={{width:425, marginTop: 20}}
                          />
                      </div>
                      <div>
                        <div style={{display: 'flex'}}>Business Permits</div>
                        <TextField
                          type="file"
                          variant="outlined"
                          className="buspermit"
                          id="buspermit"
                          value={buspermit}
                            onChange={e => {
                              setBuspermit(e.target.value);
                            }}
                          style={{width:425}}
                        />
                      </div>
                    </div>
                  </Grid>
                    <Button  className='sub' color="primary" variant="contained" style={{ width: 425, marginTop: '20px'}} onClick={onSave2}>
                      Submit
                    </Button>
          {/* </FormControl> */}

          </Grid>
        </Grid>

    </div>
    </>
  );
}

export default React.memo(Step2application);



