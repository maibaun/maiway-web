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
          </form>
          < ApplicationFormtab/>  
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>

    </>
  );
}

export default Login;
