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
import Firebase from 'firebase';
import { Button, FormControlLabel, makeStyles, TextField, withStyles } from '@material-ui/core';
import React from 'react';
  
  
  
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
  interface BasicLoginTab {
    firstname: string;
    lastname: string;
    gender: number | string;
    address: string;
    emailaddress: string;
    contactnumber: string;
    dob: string;
    // handleCountryChange: (ev: React.ChangeEvent<{ value: unknown }>) => void;
    // handleCategoryChange: (ev: React.ChangeEvent<{ value: unknown }>) => void;
    // onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    // onLatLngChang: (latLng: any, address: string, geoDeg: string) => void;
    // handleClearMap: () => void;
    // addImg: (newImg: AttachmentType[]) => void;
    // deleteImg: (args: any) => void;
    
  }
  
  function BasicLoginTab({
    firstname,
    lastname,
    gender,
    address,
    emailaddress,
    contactnumber,
    dob,
  }: BasicLoginTab) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [valueGender, setValueGender] = React.useState('a');

    const handleClose = () => {
        setOpen(false);
      };
    
    const handleChangeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueGender((event.target as HTMLInputElement).value);
    };
  
  
    return (
        <div>
                <Button variant="outlined" color="primary" >
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
                    <form className={classes.root}  noValidate autoComplete="off">
                    <InputLabel id="demo-simple-select-outlined-label">Select Type of User</InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        // value={type}
                        // onChange={handleChangetype}
                        label="Select Type"
                        style={{width: 500, color: 'green'}}                 
                      >
                        <MenuItem value="" >
                          <em>Select</em>
                        </MenuItem>
                        <MenuItem value={"1"} >Guide</MenuItem>
                        <MenuItem value={"2"}>Store owner</MenuItem>
                        <MenuItem value={"3"}>Driver</MenuItem>
                      </Select>
                      <TextField 
                        id="firstname"  
                        label="First Name" 
                        variant="outlined" 
                        value="firstname"
                        // onChange={handleChange}
                        />
                        <TextField 
                        id="lastname"  
                        label="Last Name" 
                        variant="outlined"
                        value="lastname"
                         />                        
                        <RadioGroup aria-label="gender" name="gender" value={valueGender} onChange={handleChangeGender}>
                          <FormControlLabel value="1" control={<BlueRadio />} label="Male" />  
                          <FormControlLabel value="2" control={<Radio />} label="Female" />                    
                          <FormControlLabel value="3" control={<GreenRadio />} label="Other" />
                        </RadioGroup>
                        <TextField
                        id="address"  
                        label="Address" 
                        variant="outlined"
                        value="address" 
                        />
                        <TextField 
                        id="emailaddress"  
                        label="Email Address" 
                        variant="outlined" 
                        value="emailaddress"
                        />
                        <TextField 
                        id="contactnumber"  
                        label="Contact Number" 
                        variant="outlined"
                        value="contactnumber"
                        />

                        <TextField 
                        id="dob"  
                        type="date" 
                        variant="outlined"
                        value="dob"
                         />
                         <Button color="primary" variant="contained">
                          Submit
                        </Button>
                        <Button onClick={handleClose} color="secondary" autoFocus variant="contained">
                          Cancel
                        </Button>
                    </form>
                    </DialogContentText>
                  </DialogContent>
                  {/* <DialogActions>
                    
                    <Button onClick={handleClose} color="secondary" autoFocus variant="contained">
                      Cancel
                    </Button>
                  </DialogActions> */}
                
                </Dialog>
              </div>
    );
  }
  
  export default BasicLoginTab;
  