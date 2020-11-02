import React, { useCallback, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { CmmnTabPanel, Copyright } from "../components/commons";
import { authSvc, firebaseInstance } from "../fBase";
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
import ApplicationFormtab from "../routes/ApplicationFormtab";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "cenleftter",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  message: {
    color: "red",
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '56ch',
      marginLeft: 25,
    },
    
  },
  customButton2: {
    width: "10vw",
    minWidth: "100px",
    height: "5vh",
    marginLeft: theme.spacing(1),
  },
  bottom: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  
}));
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

function Login({ callLoading }: any) {
  const classes = useStyles();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaa", inputs)
  // const [inputss, setInputss] = useState({
  //   fname: "",
  //   lname: "",
  //   address: "",
  //   emailadd: "",
  //   contact: "",
  //   dob: "",
  //   valueGender: "",
  // });

  const { email, password } = inputs;
  const [message, setMessage] = useState("");
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState('');
  const [fname, setFname] = React.useState("");
  const [lname, setLname] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [emailadd, setEmailadd] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [dob, setDob] = React.useState("");
  const [valueGender, setValueGender] = React.useState("");

  const [selectedID, setSelectedID] = useState(null);
 


  const handleOpen = () => {
    setOpen(true);
  };
  const handleNew = () => {
    setSelectedID(null);
    handleOpen();
  };
  // const [inputs, setInputs] = useState({

  // })
 
  const handleChangeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueGender((event.target as HTMLInputElement).value);
  };

  const handleChangeUser = (event: React.ChangeEvent<{ value: unknown }>) => {
    setType(event.target.value as string);

  };
  const handleChangeFname = (event: React.ChangeEvent<{ value: unknown }>) => {
        setFname(event.target.value as string);
        // const db = Firebase.firestore();
        // db.collection("user_role").doc().set(
        //   fname
        // )
    
  };

  const handleChangeLname = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLname(event.target.value as string);
  };

  const handleChangeAddress = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAddress(event.target.value as string);
  };

  const handleChangeEmailadd = (event: React.ChangeEvent<{ value: unknown }>) => {
    setEmailadd(event.target.value as string);
  };

  const handleChangeContact = (event: React.ChangeEvent<{ value: unknown }>) => {
    setContact(event.target.value as string);
  };

  const handleChangeDob = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDob(event.target.value as string);
  };
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    setInputs((prevState) => ({ ...prevState, [name]: value }));

  };
 
  const onSubmit = async () => {
    // event.preventDefault();
    try {
      callLoading("WAITING");
      let data;
      // if (newAccount) {
      // data = await authSvc.createUserWithEmailAndPassword(email, password);
      // } else {
      data = await authSvc.signInWithEmailAndPassword(email, password);
      // }
    } catch (error) {
      setMessage(error.message);
    } finally {
      callLoading("SUCCESS");
    }
  };

  // const onCreLogClick = () => setNewAccount((prevState) => !prevState);

  const onCreateapplicaton = () =>{


  }

  const onSocialClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const target = event.currentTarget as HTMLButtonElement;
    const { name } = target;

    let provider: any;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    }
    // else if (name === "github") {
    //   provider = new firebaseInstance.auth.GithubAuthProvider();
    // } else if (name === "facebook") {
    //   provider = new firebaseInstance.auth.FacebookAuthProvider();
    // }
    const data = await authSvc.signInWithPopup(provider);
    // console.log(data);
  };

  return (
    <>

      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ACCOUNT LOGIN
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={onChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChange}
              value={password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSubmit}
            >
              LOGIN
            </Button>
            < ApplicationFormtab/>  
      
            {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                  Want to be part of us?
                
                </Button> */}
                {/* < ApplicationPopup/> */}
           
            {/* <Button
              variant="contained"
              color="primary"
              className={classes.customButton2}
              onClick={handleNew}
            ></Button> */}
            {/* <Grid container> */}
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              {/* <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid> */}
              {/* <Button
                type="button"
                name="google"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={onSocialClick}
              >
                Sign in with Google
              </Button> */}
              {/* <Button
                type="button"
                // name="facebook"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                // onClick={onCreateapplicaton}
              >
                Want to have an role?
              </Button> */}
             
         {/* <div>
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
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={type}
                        onChange={handleChangeUser}
                        label="Select Type"
                        style={{width: 500, color: 'green'}}                 
                      >               
                        <MenuItem value={"1"}>Guide</MenuItem>
                        <MenuItem value={"2"}>Store owner</MenuItem>
                        <MenuItem value={"3"}>Driver</MenuItem>
                      </Select>
                      <TextField 
                        id="firstname"  
                        label="First Name" 
                        variant="outlined" 
                        value={fname}
                        onChange={handleChangeFname}
                        />
                        <TextField 
                        id="lastname"  
                        label="Last Name" 
                        variant="outlined"
                        value={lname}
                        onChange={handleChangeLname}
                         />                        
                        <RadioGroup aria-label="gender" name="gender" value={valueGender} onChange={handleChangeGender}>
                          <FormControlLabel value="male" control={<BlueRadio />} label="Male" />  
                          <FormControlLabel value="female" control={<Radio />} label="Female" />                    
                          <FormControlLabel value="other" control={<GreenRadio />} label="Other" />
                        </RadioGroup>
                        <TextField
                        id="address"  
                        label="Address" 
                        variant="outlined" 
                        value={address}
                        onChange={handleChangeAddress}
                        />

                        <TextField 
                        type="email"
                        id="emailaddress"  
                        label="Email Address" 
                        variant="outlined" 
                        value={emailadd}
                        onChange={handleChangeEmailadd}

                        />
                        <TextField 
                        id="contactnumber"  
                        label="Contact Number" 
                        variant="outlined" 
                        value={contact}
                        onChange={handleChangeContact}
                        />

                        <TextField 
                        id="dob"  
                        type="date" 
                        variant="outlined"
                        value={dob}
                        onChange={handleChangeDob}
                        />

                        <Button  color="primary" variant="contained" style={{ width: 500}}>
                          Submit
                        </Button>
                        <Button onClick={handleClose} color="secondary" autoFocus variant="contained" style={{ width: 500}}>
                          Cancel
                        </Button>
                    </form>
                    </DialogContentText>
                  </DialogContent>
                </Dialog>
              </div> */}
               
              {/* <Typography
                component="div"
                variant="h6"
                className={classes.message}
              >
                {message}
              </Typography>
            </Grid> */}
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>

    </>
  );
}

export default Login;
