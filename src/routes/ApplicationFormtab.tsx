import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import "dotenv/config";
import { Button, CardContent, FormControl, FormControlLabel, Grid, TextField, withStyles } from "@material-ui/core";
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
import { Block, Dns } from "@material-ui/icons";
import firebase from "firebase";
import { types } from "util";
import Stepperform from  '../routes/Stepperform';
import { v4 as uuidv4 } from 'uuid';
import { auth } from 'firebase'
import '../../src/Style.css'
import Dialogcontent from "./Dialogcontent";


const MAP_APIKEY = `${process.env.REACT_APP_MAP_API_KEY}`;
const GEOCODING_APIKEY = `${process.env.REACT_APP_GEOCODING_API_KEY}`;

const K_MARGIN_TOP = 30;
const K_MARGIN_RIGHT = 30;
const K_MARGIN_BOTTOM = 30;
const K_MARGIN_LEFT = 30;

const K_HOVER_DISTANCE = 30;

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
      workinfo:{
        color: 'black',
      },
      legaldoc:{
        color: 'black',
      },
    },
  })
);

const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

const BlueRadio = withStyles({
  root: {
    color: blue[400],
    '&$checked': {
      color: blue[600],
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);
function ApplicationFormtab({
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
  // const classes = useStyles();
  // const [usertype, setUsertype] = useState<any>();
  // const [fname, setFname] = useState("");
  // const [lname, setLname] = useState("");
  // const [address, setAddress] = useState("");
  // const [email, setEmailadd] = useState("");
  // const [uid, setUid] = useState();
  // const [token, setToken] = useState( Math.random().toString(36).toUpperCase().substring(4));
  // // const [password, setPassword] = useState(uid);
  // const [contact, setContact] = useState("");
  // const [gender, setGender] = useState("");
  // const [users, setUsers] = useState<any>();
  // const [dob, setDob] = useState("");
  // const [status, setStatus] =useState(0)
  // const [open, setOpen] = React.useState(false);

  const classes = useStyles();
  const [usertype, setUsertype] = useState<any>();
  const [f_name, setFname] = useState("");
  const [l_name, setLname] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmailadd] = useState("");
  const [uid, setUid] = useState();
  const [token, setToken] = useState( Math.random().toString(36).toUpperCase().substring(4));
  // const [password, setPassword] = useState(uid);
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("");
  const [users, setUsers] = useState<any>();
  const [dob, setDob] = useState("");
  const [status, setStatus] =useState(0)

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
  

  useEffect(() => { 
    const db = Firebase.firestore()
    

  }, [])
  
  // const handlePw = () =>{
  //    const pw = Math.random().toString(36).substring(4);
  // }

  const onSave = () => {

  
    const db = firebase.firestore()
    // const uid = firebase.auth().uid;
    firebase.auth().createUserWithEmailAndPassword(email, token).then(
      ()=>{
        db.collection('users').doc().set({
          usertype,
          f_name,
          l_name,
          address,
          email,
          uid: "",
          token,
          contact,
          gender,
          dob,
          status,
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
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Submitted Successfully!',
            showConfirmButton: false,
            timer: 5000
          })
      }
    )


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



  return (
    <>
      <div>
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                  Want to be part of us?
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <div style={{backgroundColor: 'darkcyan', color: 'white'}}>
                  <DialogTitle id="alert-dialog-title">Application form</DialogTitle>

                  </div>
            

                  <DialogContent>
                      <Dialogcontent/>
                  </DialogContent>
                </Dialog>
              </div>
    </>
  );
}

export default React.memo(ApplicationFormtab);
