import React, { Component, useEffect, useState } from "react";
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
import { Block, Dns, TvSharp } from "@material-ui/icons";
import firebase from "firebase";
import { types } from "util";
import Stepperform from  '../routes/Stepperform';
import { v4 as uuidv4 } from 'uuid';
import { auth } from 'firebase'
import '../../src/Style.css'
import ReactDOM from "react-dom";


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

const DropDown = ({ selectedValue, disabled, options, onChange }:any) => {
  return (
            <>
            <InputLabel htmlFor="outlined-age-native-simple"></InputLabel>
              <Select
                
                className="select"
                onChange={onChange} disabled={disabled}
              >{
                options.map((o:any) => <option value={o} selected={o === selectedValue}>{o}</option>)

                }
              </Select>
      </>
  );
}


class Dialogcontent extends Component<{},
  { value: string, 
    type: any, 
    selectedNumber: string, 
    selectedName: string, 
    usertype: any,
    email: any, 
    f_name: string,
    l_name: string,
    dob: string,
    gender: string,
    address: string,
    contact: string,
    workinformation: string,
    position: string,
    coe: any,
    orcr: any,
    driverslicense: any,
    storename: string,
    storeowner: string,
    storeaddress: string,
    businesspermit: string,
    uid:string,
    token: any
  }> {
  
  constructor(props:any) {
    super(props);
    this.state = {
      type:["Tour Guides", "Store Owners", "Drivers"],
      selectedNumber: '',
      selectedName: '',
      value: '',
      email:'',
      usertype:'',
      f_name: '',
      l_name: '',
      dob: '',
      gender: '',
      address:'',
      contact: '',
      workinformation: '',
      position: '',
      coe: '',
      orcr: '',
      driverslicense: '',
      storename: '',
      storeowner: '',
      storeaddress:'',
      businesspermit: '',
      uid:'',
      token: (Math.random().toString(36).toUpperCase().substring(4))
    }

    this.onNumbersChange =    this.onNumbersChange.bind(this);
    this.onNamesChange =      this.onNamesChange.bind(this);
    this.handleFname =        this.handleFname.bind(this);
    this.handleLname =        this.handleLname.bind(this);
    this.handleDob =          this.handleDob.bind(this);
    this.handleGender =       this.handleGender.bind(this);
    this.handleAddress =      this.handleAddress.bind(this);
    this.handleContact =      this.handleContact.bind(this);
    this.handlePostion =      this.handlePostion.bind(this);
    this.handleCoe =          this.handleCoe.bind(this);
    this.handleOrcr =         this.handleOrcr.bind(this);
    this.handleDrivers =      this.handleDrivers.bind(this);
    this.handleWorkinfo =     this.handleWorkinfo.bind(this);
    this.handleStorename =    this.handleStorename.bind(this);
    this.handleStoreowner =   this.handleStoreowner.bind(this);
    this.handleStoreaddress = this.handleStoreaddress.bind(this);
    this.handleBusiness =     this.handleBusiness.bind(this);
    this.handleUsertype =     this.handleUsertype.bind(this);
    this.handleInputEmail =   this.handleInputEmail.bind(this);
    this.handleData =         this.handleData.bind(this);
    
  }



  handleFname = (e: { target: { name: any; value: any; }; }) => {
    this.setState({...this.state, [e.target.name]: e.target.value})
  }
  handleLname = (e: { target: { name: any; value: any; }; }) => {
    this.setState({...this.state, [e.target.name]: e.target.value})
  }
  handleDob = (e: { target: { name: any; value: any; }; }) => {
    this.setState({...this.state, [e.target.name]: e.target.value})
  }
  handleGender = (e: { target: { name: any; value: any; }; }) => {
    this.setState({...this.state, [e.target.name]: e.target.value})
  }
  handleAddress = (e: { target: { name: any; value: any; }; }) => {
    this.setState({...this.state, [e.target.name]: e.target.value})
  }
  handleContact = (e: { target: { name: any; value: any; }; }) => {
    this.setState({...this.state, [e.target.name]: e.target.value})
  }
  handleWorkinfo = (e: { target: { name: any; value: any; }; }) => {
    this.setState({...this.state, [e.target.name]: e.target.value})
  }
  handlePostion = (e: { target: { name: any; value: any; }; }) => {
    this.setState({...this.state, [e.target.name]: e.target.value})
  }
  handleCoe = (e: { target: { name: any; value: any; }; }) => {
    this.setState({...this.state, [e.target.name]: e.target.value})
  }
  handleOrcr = (e: { target: { name: any; value: any; }; }) => {
    this.setState({...this.state, [e.target.name]: e.target.value})
  }
  handleDrivers = (e: { target: { name: any; value: any; }; }) => {
    this.setState({...this.state, [e.target.name]: e.target.value})
  }
  handleStorename = (e: { target: { name: any; value: any; }; }) => {
    this.setState({...this.state, [e.target.name]: e.target.value})
  }
  handleStoreowner = (e: { target: { name: any; value: any; }; }) => {
    this.setState({...this.state, [e.target.name]: e.target.value})
  }
  handleStoreaddress = (e: { target: { name: any; value: any; }; }) => {
    this.setState({...this.state, [e.target.name]: e.target.value})
  }
  handleBusiness = (e: { target: { name: any; value: any; }; }) => {
    this.setState({...this.state, [e.target.name]: e.target.value})
  }
  handleUsertype = (e: { target: { name: any; value: any; }; }) => {
    this.setState({...this.state, [e.target.name]: e.target.value})
  }
  handleInputEmail= (e: { target: { name: string; value: string; }; }) =>{
    this.setState({...this.state, [e.target.name]: e.target.value})
  }


  handleData(event: any){
 
    event.preventDefault();
    const {email} = this.state;
    const {token} = this.state;
    // const token:any = '';
    const db = firebase.firestore();

    firebase.auth().createUserWithEmailAndPassword(email, token).then(
      ()=>{
        db.collection('users').doc().set({
          f_name:           this.state.f_name,
          l_name:           this.state.l_name,
          email:            this.state.email,
          token:            this.state.token,
          dob:              this.state.dob,
          gender:           this.state.gender,
          address:          this.state.address,
          contact:          this.state.contact,
          workinformation:  this.state.workinformation,
          position:         this.state.position,
          coe:              this.state.coe,
          orcr:             this.state.orcr,
          driverslicense:   this.state.driverslicense,
          storename:        this.state.storename,
          storeowner:       this.state.storeowner,
          storeaddress:     this.state.storeaddress,
          businesspermit:   this.state.businesspermit,
          usertype:         this.state.usertype,
          uid:"",
          status:0,
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
  }

  onNumbersChange(e:any) {
    this.setState({ selectedNumber: e.target.value });
  }
  
  // handleUsertype(e:any) {
    
  //   // this.setState({ usertype: e.target.value });
  // }

  onNamesChange(e:any) {
    this.setState({ selectedName: e.target.value });
  }



  render() {
    const { numbers, names,type, selectedNumber, selectedName } : any = this.state;

    return (
      <div >
        <Grid  >
        <Grid item xs={12}>
        <Grid container >
        <div className="bodya">
          <FormControl variant="outlined" style={{width: '450px'}}>
          <InputLabel htmlFor="outlined-age-native-simple">Where you goin to join our team?</InputLabel>
            <DropDown
              // id="usertype"
              // name="usertype"
              options={type}
              // value={this.state.usertype}
              selectedValue={selectedNumber}
              onChange={this.onNumbersChange}
              // onChange={this.handleUsertype}
            />
            
        
        <div style={{
          marginRight: 11,
          borderTopLeftRadius:10,
          borderTopRightRadius:10,
        }}>

        {/* <TextField
          className="usertype"
          style={{marginTop:'20px',  width: 450}}
          id="usertype"
          label="Number"
          variant="outlined"
          name="usertype"
          value={this.state.usertype}
          onChange={this.handleUsertype}
          />     */}
       
          {/* <div style={{marginTop: '10px'}}>
          <FormControl variant="outlined" style={{width: '450px',marginTop: '10px'}}>
          <InputLabel htmlFor="outlined-age-native-simple"> Type of User</InputLabel>
                <Select
                  id="usertype"
                  name="usertype"
                  // value={this.state.usertype}
                  // onChange={()=>this.handleUsertype}
                  style={{color: 'black' , maxWidth: 450}}
                >
                  <MenuItem value={0}>
                  <em>Select</em>
                  </MenuItem>
                  <MenuItem value={1}>Guide</MenuItem>
                  <MenuItem value={2}>Store owner</MenuItem>
                  <MenuItem value={3}>Driver</MenuItem>
                </Select>
            </FormControl>
          </div> */}

          

          <TextField
          className="fname"
          style={{marginTop:'20px',  width: 450}}
          id="firstname"
          label="First Name"
          variant="outlined"
          name="f_name"
          value={this.state.f_name}
          onChange={this.handleFname}
          />
          <TextField
          style={{marginTop:'20px',  width: 450}}
          className="lname"
          id="lastname"
          label="Last Name"
          variant="outlined"
          name="l_name"
          value={this.state.l_name}
          onChange={this.handleLname}
          />
          <div style={{color: 'black'}}>Date of Birth</div>
          <TextField
          className='dob'
          style={{marginTop:'20px',  width: 450}}
          id="dob"
          variant="outlined"
          type="date"
          name="dob"
          value={this.state.dob}
          onChange={this.handleDob}
          />
          <div  style={{color:'black'}}>
          Gender
          <RadioGroup aria-label="gender" name="gender" 
          value={this.state.gender}
          onChange={this.handleGender}

                            >
          <FormControlLabel value="male" control={<BlueRadio />} label="Male" />
          <div className='fem' >
          <FormControlLabel value="female" control={<Radio />} label="Female" style={{position:"absolute", right:250, top:324}}/>
          </div>
          </RadioGroup>
          </div>
        </div>
        <div style={{
          marginTop: 10, 
          marginRight: 11,
          borderBottomLeftRadius:10,
          borderBottomRightRadius:10,
          paddingBottom:4}}>

                  <TextField
                    style={{marginTop:'1px',  width: 450}}
                    className='address'
                    id="address"
                    label="address"
                    variant="outlined"
                    name="address"
                    value={this.state.address}
                    onChange={this.handleAddress}
                  />

                  <TextField
                    style={{marginTop:'20px', width: 450}}
                    className='emailadd'
                    type="email"
                    id="emailaddress"
                    label="Email Address"
                    variant="outlined"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleInputEmail}
                    />

                    <TextField
                    style={{marginTop:'20px', width: 450}}
                    className='contact'
                    id="contactnumber"
                    label="Contact Number"
                    variant="outlined"
                    name="contact"
                    value={this.state.contact}
                    onChange={this.handleContact}
                    />
                  </div>
                  <Grid container >
                    <div id="workinfo">
                      <h4>Work Information</h4>
                      <div>
                        <TextField
                          label="Company Name"
                          id="comname"
                          type="text"
                          className="comname"
                          variant="outlined"
                          name="workinformation"
                          value={this.state.workinformation}
                          onChange={this.handleWorkinfo}
                          disabled={selectedNumber == 'Drivers' || selectedNumber== "Store Owners"}
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
                          name="position"
                          value={this.state.position}
                          onChange={this.handlePostion}
                          disabled={selectedNumber == 'Drivers' || selectedNumber== "Store Owners"}
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
                          name="coe"
                          value={this.state.coe}
                          onChange={this.handleCoe}
                          disabled={selectedNumber == 'Drivers' || selectedNumber== "Store Owners"}
                          style={{width:450}}
                        />
                      </div>
                    </div>
                  </Grid>
                  <Grid container >
                    <div>
                      <h4>Legal Documents</h4>
                      <div>
                        <div style={{display: 'flex'}}>OR / CR From LTO (optional)</div>
                        <TextField
                          type="file"
                          variant="outlined"
                          className="orcr"
                          id="orcr"
                          name="orcr"
                          value={this.state.orcr}
                          onChange={this.handleOrcr}
                          disabled={selectedNumber == 'Tour Guides' || selectedNumber== "Store Owners"}
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
                            name="driverslicense"
                            value={this.state.driverslicense}
                            onChange={this.handleDrivers}
                            disabled={selectedNumber == 'Tour Guides' || selectedNumber== "Store Owners"}
                            style={{width:450}}
                          />
                      </div>
                    </div>
                  </Grid>
                  <Grid container >
                    <div>
                      <h4>Store Owner Documents</h4>

                      <div>
                        <TextField
                            label="Store Name"
                            type="text"
                            variant="outlined"
                            id="storename"
                            className="storename"
                            style={{width:450}}
                            name="storename"
                            value={this.state.storename}
                            onChange={this.handleStorename}
                            disabled={selectedNumber == 'Tour Guides' || selectedNumber== "Drivers"}
                          />
                        <TextField
                            label="Store Owner"
                            type="text"
                            variant="outlined"
                            className="storeowner"
                            id="storeowner"
                            style={{width:450, marginTop:20}}
                            name="storeowner"
                            value={this.state.storeowner}
                            onChange={this.handleStoreowner}
                            disabled={selectedNumber == 'Tour Guides' || selectedNumber== "Drivers"}
                          />
                        <TextField
                            label="Store Address"
                            type="text"
                            variant="outlined"
                            className="storeaddress"
                            id="storeaddress"
                            style={{width:450, marginTop:20}}
                            name="storeaddress"
                            value={this.state.storeaddress}
                            onChange={this.handleStoreaddress}
                            disabled={selectedNumber == 'Tour Guides' || selectedNumber== "Drivers"}
                          />
                      </div>
                      <div>
                        <div style={{display: 'flex'}}>Business Permits</div>
                        <TextField
                          type="file"
                          variant="outlined"
                          className="buspermit"
                          id="buspermit"
                          name="businesspermit"
                          value={this.state.businesspermit}
                          onChange={this.handleBusiness}
                          disabled={selectedNumber == 'Tour Guides' || selectedNumber== "Drivers"}
                          style={{width:450}}
                        />
                      </div>
                    </div>
                  </Grid>
              </FormControl>
              </div>
            </Grid>
            <Button  className='sub' color="primary" variant="contained" style={{ width: 450, marginTop: '20px'}} 
            onClick={this.handleData}
            >
            Submit
           </Button>
            </Grid>
            </Grid>
   
      </div>
    );
  }
}

export default Dialogcontent;




// function Dialogcontent({
// }: any) {
  
//   const state = {
//     selectedOption: null,
//   };

//   const [inputs, setInputs] = useState({
//     usertype: "",
//   });

//   const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const {
//       target: { name, value },
//     } = event;
//     setInputs((prevState) => ({ ...prevState, [name]: value }));

//   };
//   // const classes = useStyles();
//   // const [usertype, setUsertype] = useState<any>();
//   // const [fname, setFname] = useState("");
//   // const [lname, setLname] = useState("");
//   // const [address, setAddress] = useState("");
//   // const [email, setEmailadd] = useState("");
//   // const [uid, setUid] = useState();
//   // const [token, setToken] = useState( Math.random().toString(36).toUpperCase().substring(4));
//   // // const [password, setPassword] = useState(uid);
//   // const [contact, setContact] = useState("");
//   // const [gender, setGender] = useState("");
//   // const [users, setUsers] = useState<any>();
//   // const [dob, setDob] = useState("");
//   // const [status, setStatus] =useState(0)
//   // const [open, setOpen] = React.useState(false);

//   const classes = useStyles();
//   const [usertype, setUsertype] = useState<any>();
//   const [f_name, setFname] = useState("");
//   const [l_name, setLname] = useState("");
//   const [address, setAddress] = useState("");
//   const [email, setEmailadd] = useState("");
//   const [uid, setUid] = useState();
//   const [token, setToken] = useState(Math.random().toString(36).toUpperCase().substring(4));
//   // const [password, setPassword] = useState(uid);
//   const [contact, setContact] = useState("");
//   const [gender, setGender] = useState("");
//   const [users, setUsers] = useState<any>();
//   const [dob, setDob] = useState("");
//   const [status, setStatus] =useState(0)

//   const [position, setPosition] = useState("");
//   const [compname, seTCompname] = useState("");
//   const [coe, setCoe] = useState("");
//   const [orcr, setOrcr] = useState("");
//   const [driver, setDriver] = useState("");
//   const [storename, setStorename] = useState("");
//   const [storeowner, setStoreowner] = useState("");
//   const [storeaddress, setStoreaddress] = useState("");
//   const [buspermit, setBuspermit] = useState("");
//   const [open, setOpen] = React.useState(false);
  

//   useEffect(() => { 
//     const db = Firebase.firestore()
    

//   }, [])
  
//   // const handlePw = () =>{
//   //    const pw = Math.random().toString(36).substring(4);
//   // }

//   const onSave = () => {

  
//     const db = firebase.firestore()
//     // const uid = firebase.auth().uid;
//     firebase.auth().createUserWithEmailAndPassword(email, token).then(
//       ()=>{
//         db.collection('users').doc().set({
//           usertype,
//           f_name,
//           l_name,
//           address,
//           email,
//           uid: "",
//           token,
//           contact,
//           gender,
//           dob,
//           status,
//           position,
//           compname,
//           coe,
//           orcr,
//           driver,
//           storename,
//           storeowner,
//           storeaddress,
//           buspermit,
//           created_at: new Date()
//         })
//         Swal.fire({
//             position: 'center',
//             icon: 'success',
//             title: 'Submitted Successfully!',
//             showConfirmButton: false,
//             timer: 5000
//           })
//       }
//     )

//   };
//   const test = [
//     {
//       label: "opt1",
//       value: 1
//     },
//     {
//       label: "opt2",
//       value:2
//     },
//     {
//       label: "opt3",
//       value:3
//     }
//   ];


//   const handleOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };
//   const handleClickOpen = () => {
//     setOpen(true);
//   };
 

//   const handleClick = (e: { target: { value: any; }; }) =>{
//     setUsertype(e.target.value)
//     const type = e.target.value;
//     if(type === 1){
      
//       alert(type)
//     }else if(type === 2){

//       alert(type)
//     }else if(type ===3){

//       alert(type)
//     }else{
      
//       alert("please Select User Type")
//     }
//   }

//   return (
//     <>
//     <div>
//     <div className="bodya">
//         <Grid container className={classes.root} spacing={0}>
//         <Grid item xs={12}>
//         <Grid container >
//         <div className='bodya'>
//             <FormControl variant="outlined" >
//               <InputLabel htmlFor="outlined-age-native-simple">Select Type of User</InputLabel>
//                 <Select
//                    className="select"
//                   // value={usertype}
//                   // onChange={handleClick}
//                   // onChange={e => {
//                   //   setUsertype(e.target.value);
//                   // }}
//                   label="Select Type"
//                   style={{color: 'black' , maxWidth: 450}}
//                 >
//                   <MenuItem value={0}>
//                   <em>Select</em>
//                   </MenuItem>
//                   <MenuItem value={1}>Guide</MenuItem>
//                   <MenuItem value={2}>Store owner</MenuItem>
//                   <MenuItem value={3}>Driver</MenuItem>
//                 </Select>
//                 <br/>
//               <div style={{
//                            marginRight: 11,
//                            borderTopLeftRadius:10,
//                            borderTopRightRadius:10,
//                            }}>
//                     <TextField
//                       className="fname"
//                       style={{marginTop:'5px',  width: 450}}
//                       id="firstname"
//                       label="First Name"
//                       variant="outlined"
//                       value={f_name}
//                       onChange={e => {
//                         setFname(e.target.value);
//                       }}
//                     />
//                 <TextField
//                   style={{marginTop:'20px',  width: 450}}
//                   className="lname"
//                   id="lastname"
//                   label="Last Name"
//                   variant="outlined"
//                   value={l_name}
//                   onChange={e => {
//                     setLname(e.target.value);
//                   }}
//                 />
//                 <div style={{color: 'black'}}>Date of Birth</div>
//                   <TextField
//                     className='dob'
//                     style={{marginTop:'20px',  width: 450}}
//                     id="dob"
//                     variant="outlined"
//                     type="date"
//                     value={dob}
//                     onChange={e => {
//                       setDob(e.target.value);
//                     }}
//                   />
//                   {/* <Select
//                     label="year"
//                     style={{width:124, marginTop: 20, margin: 10, marginLeft:10}}
//                   >
//                   </Select>
//                   <Select
//                     label="year"
//                     style={{width:124 ,margin:10, marginLeft: 18}}
//                   >
//                   </Select>
//                   <Select
//                     label="year"
//                     style={{width:124, margin:10, marginLeft: 20}}
//                   >
//                   </Select> */}
//                     <div  style={{color:'black'}}>
//                     Gender
//                     <RadioGroup aria-label="gender" name="gender"  value={gender} onChange={e => {
//                               setGender(e.target.value);
//                             }}>
//                     <FormControlLabel value="male" control={<BlueRadio />} label="Male" />
//                     <div className='fem' >
//                     <FormControlLabel value="female" control={<Radio />} label="Female" style={{position:"absolute", right:250, top:330}}/>
//                     </div>
//                     {/* <FormControlLabel value="other" control={<GreenRadio />} label="Other" /> */}
//                     </RadioGroup>
//                       {/* Gender
//                       <BlueRadio value={gender} onChange={e => {
//                               setGender(e.target.value);
//                             }}

//                         name="radio-button-demo"
//                         inputProps={{ 'aria-label': 'C' }}
//                       />
//                       Male
                      
//                       <Radio
//                         name="radio-button-demo"
//                         inputProps={{ 'aria-label': 'C' }}
                        
//                       />
//                       Female */}
//                     </div>
//                   </div>

//                   <div style={{
//                                marginTop: 10, 
//                                marginRight: 11,
//                                borderBottomLeftRadius:10,
//                                borderBottomRightRadius:10,
//                                paddingBottom:4}}>

//                   <TextField
//                     style={{marginTop:'30px',  width: 450}}
//                     className='address'
//                     id="address"
//                     label="address"
//                     variant="outlined"
//                     value={address}
//                     onChange={e => {
//                       setAddress(e.target.value);
//                     }}
                 
//                   />

//                   <TextField
//                     style={{marginTop:'20px', width: 450}}
//                     className='emailadd'
//                     type="email"
//                     id="emailaddress"
//                     label="Email Address"
//                     variant="outlined"
//                     value={email}
//                                   onChange={e => {
//                                     setEmailadd(e.target.value);
//                                   }}
//                     />

//                     <TextField
//                     style={{marginTop:'20px', width: 450}}
//                     className='contact'
//                     id="contactnumber"
//                     label="Contact Number"
//                     variant="outlined"
//                     value={contact}
//                     onChange={e => {
//                       setContact(e.target.value);
//                     }}
//                     />
//                   </div>
//                   <Grid container >
//                     <div id="workinfo">
//                       <h4>Work Information</h4>
//                       <div>
//                         <TextField
//                           label="Company Name"
//                           id="comname"
//                           type="text"
//                           className="comname"
//                           variant="outlined"
//                           value={compname}
//                             onChange={e => {
//                               seTCompname(e.target.value);
//                             }}
//                             style={{width: 450}}
//                         />
//                       </div>
//                       <div>
//                         <TextField
//                           label="Position"
//                           type="text"
//                           variant="outlined"
//                           className="pos"
//                           id="position"
//                           value={position}
//                             onChange={e => {
//                               setPosition(e.target.value);
//                             }}
//                             style={{marginTop:'20px', width: 450}}
//                         />
//                       </div>

//                       <div>
//                         <div>Certificate of Employment</div>
//                       <TextField
//                           type="file"
//                           variant="outlined"
//                           className="coe"
//                           id="coe"
//                           value={coe}
//                             onChange={e => {
//                               setCoe(e.target.value);
//                             }}
//                           style={{width:450}}
//                         />
//                       </div>
//                     </div>
//                   </Grid>
//                   <Grid container >
//                     <div>
//                       <h4>Legal Documents</h4>
//                       <div>
//                         <div style={{display: 'flex'}}>OR / CR From LTO (optional)</div>
//                         <TextField
//                           type="file"
//                           variant="outlined"
//                           className="orcr"
//                           id="orcr"
//                           value={orcr}
//                             onChange={e => {
//                               setOrcr(e.target.value);
//                             }}
//                           style={{width:450}}
//                         />
//                       </div>
//                       <div>
//                         <div>Driver'e License</div>
//                         <TextField
//                             type="file"
//                             variant="outlined"
//                             id="driver"
//                             className="driver"
//                             value={driver}
//                             onChange={e => {
//                               setDriver(e.target.value);
//                             }}
//                             style={{width:450}}
//                           />
//                       </div>
//                     </div>
//                   </Grid>
//                   <Grid container >
//                     <div>
//                       <h4>Store Owner Documents</h4>

//                       <div>
//                         <TextField
//                             label="Store Name"
//                             type="text"
//                             variant="outlined"
//                             id="storename"
//                             className="storename"
//                             value={storename}
//                             onChange={e => {
//                               setStorename(e.target.value);
//                             }}
//                             style={{width:450}}
//                           />
//                         <TextField
//                             label="Store Owner"
//                             type="text"
//                             variant="outlined"
//                             className="storeowner"
//                             id="storeowner"
//                             value={storeowner}
//                             onChange={e => {
//                               setStoreowner(e.target.value);
//                             }}
//                             style={{width:450, marginTop: 20}}
//                           />
//                         <TextField
//                             label="Store Address"
//                             type="text"
//                             variant="outlined"
//                             className="storeaddress"
//                             id="storeaddress"
//                             value={storeaddress}
//                             onChange={e => {
//                               setStoreaddress(e.target.value);
//                             }}
//                             style={{width:450, marginTop: 20}}
//                           />
//                       </div>
//                       <div>
//                         <div style={{display: 'flex'}}>Business Permits</div>
//                         <TextField
//                           type="file"
//                           variant="outlined"
//                           className="buspermit"
//                           id="buspermit"
//                           value={buspermit}
//                             onChange={e => {
//                               setBuspermit(e.target.value);
//                             }}
//                           style={{width:450}}
//                         />
//                       </div>
//                     </div>
//                   </Grid>
//                     <Button  className='sub' color="primary" variant="contained" style={{ width: 450, marginTop: '20px'}} onClick={onSave}>
//                       Submit
//                     </Button>
//                 {/* <RadioGroup aria-label="gender" name="gender"  value={gender} onChange={e => {
//                               setGender(e.target.value);
//                             }}>
//                 <FormControlLabel value="male" control={<BlueRadio />} label="Male" />
//                 <FormControlLabel value="female" control={<Radio />} label="Female" />
//                 <FormControlLabel value="other" control={<GreenRadio />} label="Other" />
//                 </RadioGroup>
//                  */}
              
            
//               {/* <div style={{marginTop: '30px', marginBottom: '30px'}}>
//               <Button  className='sub' color="primary" variant="contained" style={{ width: 450, marginBottom: '10px'}} onClick={onSave}>
//                 Submit
//               </Button>
              
//             </div> */}

//           </FormControl>
          

//         </div>

//         </Grid>
//         </Grid>
//         </Grid>

//     </div> 
//     </div>
//     </>
//   );
// }

// export default React.memo(Dialogcontent);
