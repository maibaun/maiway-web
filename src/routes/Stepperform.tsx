import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { FormControl, FormControlLabel, FormLabel, TextField, withStyles } from '@material-ui/core';
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
import clsx from 'clsx';
import Firebase, { app } from 'firebase';

import firebase from "firebase";
import Swal from "sweetalert2";
import Step1application from './Step1application';
import Step2application from './Step2application';
import '../../src/Style.css'
// import Step1 from '../routes/Step1';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    color: blue[400],
    '&$checked': {
      color: blue[400],
      '& .MuiTextField-root': {
     
        width: '25ch',
      },
   
    },
  },
  button: {
    marginRight: 0,
  },
  instructions: {
    marginTop: 0,
    marginBottom: 0,
  },
  icon: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
  },
  checkedIcon: {
    backgroundColor: '#137cbd',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
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



function getSteps() {
  return [''];
}
// function StyledRadio(props: RadioProps) {
//   const classes = useStyles();
//   return (
//     <Radio
//       className={classes.root}
//       disableRipple
//       color="default"
//       checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
//       icon={<span className={classes.icon} />}
//       {...props}
//     />
//   );
// }



function getStepContent(step: number) {
  
  switch (step) {
    case 0:
      return(
        <div style={{padding:'28px'}}>
          <Step1application/>
    
        </div>
      );
    // case 1:
    //   return (
    //     <div style={{padding:'28px'}}>
    //       <Step2application/>
    //     </div>
    //   );
    // case 2:
    //   return (
    //     <div></div>
    //   );
    // default:
    //   return 'Unknown step';
  }
}
function Stepperform() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();




  // function isStepOptional(step: number) {
  //   return step === 1;
  // }
  // function isStepFailed(step: number) {
  //   return step === 1;
  // }
  // function isStepSkipped(step: number) {
  //   return skipped.has(step);
  // }
  // function handleNext() {
  //   let newSkipped = skipped;
  //   if (isStepSkipped(activeStep)) {
  //     newSkipped = new Set(skipped.values());
  //     newSkipped.delete(activeStep);
  //   }
  //   setActiveStep(prevActiveStep => prevActiveStep + 1);
  //   setSkipped(newSkipped);
  // }
  // function handleBack() {
  //   setActiveStep(prevActiveStep => prevActiveStep - 1);
  // }
  // function handleSkip() {
  //   if (!isStepOptional(activeStep)) {
  //     // You probably want to guard against something like this,
  //     // it should never occur unless someone's actively trying to break something.
  //     throw new Error("You can't skip a step that isn't optional.");
  //   }
  //   setSkipped(prevSkipped => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(activeStep);
  //     return newSkipped;
  //   });
  //   setActiveStep(prevActiveStep => prevActiveStep + 1);
  // }
  // function handleReset() {
  //   setActiveStep(0);
  // }
  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step  key={label} {...stepProps}>
              <StepLabel  {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            {/* <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button> */}
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              {/* <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )} */}
              {/* <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Stepperform;