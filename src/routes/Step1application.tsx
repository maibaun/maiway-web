import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import "dotenv/config";
import { Button, CardContent, FormControl, FormControlLabel, Grid, TextField, useMediaQuery, withStyles } from "@material-ui/core";
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
import '../../src/Style.css'


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

  function Step1application({
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
  const [startDate, setStartDate] = useState(new Date());

  
  return (
    <>
    <div className="bodya">
        <Grid container className={classes.root} spacing={0}>
        <Grid item xs={12}>
        <Grid container >
        <div className='bodya'>
            <FormControl variant="outlined" >
              <InputLabel htmlFor="outlined-age-native-simple">Select Type of User</InputLabel>
                <Select
                   className="select"
                  value={usertype}
                  onChange={e => {
                    setUsertype(e.target.value);
                  }}
                  label="Select Type"
                  style={{color: 'black' , maxWidth: 450}}
                >
                  <MenuItem value={0}>
                  <em>Select</em>
                  </MenuItem>
                  <MenuItem value={1}>Guide</MenuItem>
                  <MenuItem value={2}>Store owner</MenuItem>
                  <MenuItem value={3}>Driver</MenuItem>
                </Select>
                <br/>
              <div style={{
                           marginRight: 11,
                           borderTopLeftRadius:10,
                           borderTopRightRadius:10,
                           }}>
                    <TextField
                      className="fname"
                      style={{marginTop:'5px',  width: 450}}
                      id="firstname"
                      label="First Name"
                      variant="outlined"
                      value={f_name}
                      onChange={e => {
                        setFname(e.target.value);
                      }}
                    />
                <TextField
                  style={{marginTop:'20px',  width: 450}}
                  className="lname"
                  id="lastname"
                  label="Last Name"
                  variant="outlined"
                  value={l_name}
                  onChange={e => {
                    setLname(e.target.value);
                  }}
                />
                <div style={{color: 'black'}}>Date of Birth</div>
                  <TextField
                    className='dob'
                    style={{marginTop:'20px',  width: 450}}
                    id="dob"
                    variant="outlined"
                    type="date"
                    value={dob}
                    onChange={e => {
                      setDob(e.target.value);
                    }}
                  />
                  {/* <Select
                    label="year"
                    style={{width:124, marginTop: 20, margin: 10, marginLeft:10}}
                  >
                  </Select>
                  <Select
                    label="year"
                    style={{width:124 ,margin:10, marginLeft: 18}}
                  >
                  </Select>
                  <Select
                    label="year"
                    style={{width:124, margin:10, marginLeft: 20}}
                  >
                  </Select> */}
                    <div  style={{color:'black'}}>
                    Gender
                    <RadioGroup aria-label="gender" name="gender"  value={gender} onChange={e => {
                              setGender(e.target.value);
                            }}>
                    <FormControlLabel value="male" control={<BlueRadio />} label="Male" />
                    <div className='fem' >
                    <FormControlLabel value="female" control={<Radio />} label="Female" style={{position:"absolute", right:250, top:340}}/>
                    </div>
                    {/* <FormControlLabel value="other" control={<GreenRadio />} label="Other" /> */}
                    </RadioGroup>
                      {/* Gender
                      <BlueRadio value={gender} onChange={e => {
                              setGender(e.target.value);
                            }}

                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'C' }}
                      />
                      Male
                      
                      <Radio
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'C' }}
                        
                      />
                      Female */}
                    </div>
                  </div>

                  <div style={{
                               marginTop: 10, 
                               marginRight: 11,
                               borderBottomLeftRadius:10,
                               borderBottomRightRadius:10,
                               paddingBottom:4}}>

                  <TextField
                    style={{marginTop:'30px',  width: 450}}
                    className='address'
                    id="address"
                    label="address"
                    variant="outlined"
                    value={address}
                    onChange={e => {
                      setAddress(e.target.value);
                    }}
                  />

                  <TextField
                    style={{marginTop:'20px', width: 450}}
                    className='emailadd'
                    type="email"
                    id="emailaddress"
                    label="Email Address"
                    variant="outlined"
                    value={email}
                                  onChange={e => {
                                    setEmailadd(e.target.value);
                                  }}
                    />

                    <TextField
                    style={{marginTop:'20px', width: 450}}
                    className='contact'
                    id="contactnumber"
                    label="Contact Number"
                    variant="outlined"
                    value={contact}
                    onChange={e => {
                      setContact(e.target.value);
                    }}
                    />
                  </div>
                  <Grid container className={classes.workinfo}>
                    <div id="workinfo">
                      <h4>Work Information</h4>
                      <div>
                        <TextField
                          label="Company Name"
                          id="comname"
                          type="text"
                          className="comname"
                          variant="outlined"
                          value={compname}
                            onChange={e => {
                              seTCompname(e.target.value);
                            }}
                            style={{width: 450}}
                        />
                      </div>
                      <div>
                        <TextField
                          label="Position"
                          type="text"
                          variant="outlined"
                          className="pos"
                          id="position"
                          value={position}
                            onChange={e => {
                              setPosition(e.target.value);
                            }}
                            style={{marginTop:'20px', width: 450}}
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
                          style={{width:450}}
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
                          style={{width:450}}
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
                            style={{width:450}}
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
                            style={{width:450}}
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
                            style={{width:450, marginTop: 20}}
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
                            style={{width:450, marginTop: 20}}
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
                          style={{width:450}}
                        />
                      </div>
                    </div>
                  </Grid>
                    <Button  className='sub' color="primary" variant="contained" style={{ width: 450, marginTop: '20px'}} onClick={onSave}>
                      Submit
                    </Button>
                {/* <RadioGroup aria-label="gender" name="gender"  value={gender} onChange={e => {
                              setGender(e.target.value);
                            }}>
                <FormControlLabel value="male" control={<BlueRadio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="other" control={<GreenRadio />} label="Other" />
                </RadioGroup>
                 */}
              
            
              {/* <div style={{marginTop: '30px', marginBottom: '30px'}}>
              <Button  className='sub' color="primary" variant="contained" style={{ width: 450, marginBottom: '10px'}} onClick={onSave}>
                Submit
              </Button>
              
            </div> */}

          </FormControl>
          

        </div>

        </Grid>
        </Grid>
        </Grid>

    </div>
    </>
  );
}


export default React.memo(Step1application);



