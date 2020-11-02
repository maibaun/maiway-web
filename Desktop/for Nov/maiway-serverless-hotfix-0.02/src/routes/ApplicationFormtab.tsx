import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import "dotenv/config";
import { Button, CardContent, FormControlLabel, Grid, TextField, withStyles } from "@material-ui/core";
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
  const classes = useStyles();
  const [usertype, setUsertype] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [address, setAddress] = useState("");
  const [emailAdd, setEmailadd] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [status, setStatus] =useState(0)
  const [open, setOpen] = React.useState(false);

  const onSave = () => {
    const db = Firebase.firestore()
    db.collection('user_role').doc().set({
      usertype,
      fname,
      lname,
      address,
      emailAdd,
      contact,
      gender,
      dob,
      status,
      created_at: new Date()
    })

    .then(function() {

      console.log("successfully submitted!");
      })
      .catch(function(error) {
          alert(error);
          console.error("Error submitting: ", error);
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
                  <DialogTitle id="alert-dialog-title">{"Application form"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    <form className={classes.root} noValidate autoComplete="off">
                    <InputLabel id="demo-simple-select-outlined-label">Select Type of User</InputLabel>                      
                      <Select                     
                        // value={usertype}
                        // onChange={e => {
                        //   setUsertype(e.target.value);
                        // }}
                        label="Select Type"
                        style={{width: 500, color: 'green'}}
                      >
                        <MenuItem>
                          <em>Select</em>
                        </MenuItem>
                        <MenuItem >Guide</MenuItem>
                        <MenuItem >Store owner</MenuItem>
                        <MenuItem >Driver</MenuItem>
                      </Select>

                      <TextField
                        id="firstname"
                        label="First Name"
                        variant="outlined"
                        value={fname}
                        onChange={e => {
                          setFname(e.target.value);
                        }}
                        />
                        <TextField
                        id="lastname"
                        label="Last Name"
                        variant="outlined"
                        value={lname}
                        onChange={e => {
                          setLname(e.target.value);
                        }}
                         />
                        <RadioGroup aria-label="gender" name="gender" value={gender} onChange={e => {
                          setGender(e.target.value);
                        }}>
                          <FormControlLabel value="male" control={<BlueRadio />} label="Male" />
                          <FormControlLabel value="female" control={<Radio />} label="Female" />
                          <FormControlLabel value="other" control={<GreenRadio />} label="Other" />
                        </RadioGroup>
                        <TextField
                        id="address"
                        label="Address"
                        variant="outlined"
                        value={address}
                        onChange={e => {
                          setAddress(e.target.value);
                        }}
                        />

                        <TextField
                        type="email"
                        id="emailaddress"
                        label="Email Address"
                        variant="outlined"
                        value={emailAdd}
                        onChange={e => {
                          setEmailadd(e.target.value);
                        }}

                        />
                        <TextField
                        id="contactnumber"
                        label="Contact Number"
                        variant="outlined"
                        value={contact}
                        onChange={e => {
                          setContact(e.target.value);
                        }}
                        />

                        <TextField
                        id="dob"
                        type="date"
                        variant="outlined"
                        value={dob}
                        onChange={e => {
                          setDob(e.target.value);
                        }}
                        />

                        <Button  color="primary" variant="contained" style={{ width: 500}} onClick={onSave}>
                          Submit
                        </Button>
                        <Button onClick={handleClose} color="secondary" autoFocus variant="contained" style={{ width: 500}}>
                          Cancel
                        </Button>
                    </form>
                    </DialogContentText>
                  </DialogContent>
                </Dialog>
              </div>
    </>
  );
}

export default React.memo(ApplicationFormtab);
