import React, { useEffect, useState } from "react";
import Firebase, { constructor, firestore } from 'firebase'
import { AddAlarmOutlined, CenterFocusStrong, DragHandle, Link, Spellcheck } from "@material-ui/icons";
import { dbSvc } from "../../fBase";
import { idText } from "typescript";
import emailjs from 'emailjs-com'
import{ init } from 'emailjs-com';
import { timeStamp } from "console";
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { red } from "@material-ui/core/colors";
import { Button, createStyles, Theme, withStyles } from "@material-ui/core";
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import DoneAllTwoToneIcon from '@material-ui/icons/DoneAllTwoTone';
import check from '../icons/check.png';
import Swal from "sweetalert2";
const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    tblcenter: {
        alignContent: "center",
    },
    tableHead: {
     
      backgroundColor: '#09014a',
    }
  });
  
  const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.black,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);
const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);


const User = () => {
    const classes = useStyles();
    const [users, setUsers] = useState<any>([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [uid, setUid] = useState("");
    const [updateuser, setUpdateUser] = useState('');

    useEffect(() => {
        Firebase
          .firestore() 
          .collection("users")
          .orderBy("created_at", "desc")
          .onSnapshot(snapshot => {
            const listItems = snapshot.docs.map(doc => ({
              id : doc.id, 
              ...doc.data()
              
            }));
            setUsers(listItems); //items is equal to listItems
             console.log("ddddd", listItems)
          });
      }, []);

    // useEffect(() => {
    //     Firebase
    //       .firestore() 
    //       .collection("places")
    //       .where("country_code","==","PH")
    //       .orderBy("created_at", "desc").limit(1)
       
         
    //       .onSnapshot(snapshot => {
    //         const listItems = snapshot.docs.map(doc => ({
    //           id : doc.id, 
    //           ...doc.data()
              
    //         }));
    //         setUsers(listItems); //items is equal to listItems
    //          console.log("ddddd", listItems)
    //       });
    //   }, []);



    //   const handleBase32 = () =>{

    //     const vall = 5;
    //     const BITS = Array(16, 8, 4, 2, 1);

    //     const base32char  ="0123456789bcdefghjkmnpqrstuvwxyz";

    //     const valueToBase32Char: any(value: Int): char{
    //         if (value < 0 || value >= BASE32_CHARS.length)
    //             throw IllegalArgumentException("Not a valid base32 value: $value")
    //         return BASE32_CHARS[value]
    //     }
    //     const base32CharToValue(base32char:char): int{
    //         val value = BASE32_CHARS.indexOf(base32Char)
    //             if (value == -1)
    //                 throw IllegalArgumentException("Not a valid base32 char: $base32Char")
    //             return value
    //     }

    //   }

;
  function handleDocId3(this: any, value: any){

    // const uid = Firebase.auth();
    const db = Firebase.firestore();  
    // const { email, password } = this.state;
 
    // Firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error){
    //   db.collection('users_io').doc().set({
  
    //       email: email,
    //       password: password,
     
    //       created_at: new Date()
    //     })
    // })

    // db.collection('users').doc(`${value}`).update({
    //     uid : 'asdasdsadasdasd'
    // })                 
  }
  // "uCP9CZeYyVWnIdrdQtVVdaFmzpy2"

    function handleDocId(value: any){
       
        Swal.fire({
          title: 'Are you Sure You want to Activate this User?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: `Yes`,
        }).then((result) => {        
          if (result.isConfirmed) {
            const db = Firebase.firestore();            
            db.collection('users').doc(`${value}`).update({
                status : 1
            }) 
            Swal.fire('Activated!', '', 'success')
          } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
          }
        })                
    }

    function deleteDocId(value: any){
      const db = Firebase.firestore();            
      db.collection('users').doc(`${value}`).delete() 
      const SwalModal = (Swal);
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          const db = Firebase.firestore();            
          db.collection('places').doc(`${value}`).delete()   
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })      
  }

      function handleEmail(value: any, userType: any, f_name: any, l_name: any){
        if (userType==1){
         userType = "GUIDE"
        }else if  (userType == 2){
         userType= "STORE"
        }else if  (userType == 3){
         userType= "DRIVER"
        }else{
         userType = "USER TYPE NOT FOUND!"
        }

        console.log("handleEmailssss",value)     
        const template_params = {
            "to_email": value, 
            "subject": "This is an Automated Email",
            "message":  "Dear,          " + f_name + "     "+ l_name + '<br>' +
                        "              " + '<br>' +
                        "We appreciate your interest in collaborating with MAI BAUN TECHNOLOGIES INC." + '<br>' +
                        "Your request application to join with LAKWATSA - "+ userType +" dashboard has been successfully received. A representative from our team will get in touch with you soon."+ '<br>' +
                        "              " + '<br>' +
                        "              " + '<br>' +
                        "              " + '<br>' +
                        "(THIS IS AN AUTO-GENERATED E-MAIL RESPONSE. DO NOT REPLY)" + '<br>' +
                        "              " + '<br>' +
                        "For technical related concerns, please contact Maibaun Tour Ph at maibauntourph@gmail.com	" + '<br>' 
        }
        const SERVICE_ID = "maiweb";
        const TEMPLATE_ID = "template_b9dahpu";
        const USER_ID = "user_PB4KpsOSOkmrIN9xSEvzq";
        emailjs.send(SERVICE_ID, TEMPLATE_ID, template_params, USER_ID)
    
         const sendEmail = (e: { target: any; })=> {
            const data = {
              to_email: value,
            };        
            emailjs.send(SERVICE_ID, TEMPLATE_ID, data, USER_ID).then(
              function (response) {
                console.log(response.status, response.text);
              },
              function (err) {
                console.log(err);
              }
            );
          }
      }
        function handleDocId2(value: any){
           
          
          Swal.fire({
            title: 'Are you Sure You want to Fully activate this User?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Yes`,
          }).then((result) => {        
            if (result.isConfirmed) {
              const db = Firebase.firestore();            
              db.collection('users').doc(`${value}`).update({
                  status : 2
              })  
              Swal.fire('This User can now access our dashboard', '', 'success')
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })           
  


        }

       

      const db = Firebase.firestore();
      function handleEmail2(value: any, token: any, userType: any, f_name: any, l_name: any){
        if (userType==1){
         userType = "GUIDE"
        }else if  (userType == 2){
         userType= "STORE"
        }else if  (userType == 3){
         userType= "DRIVER"
        }else{
         userType = "USER TYPE NOT FOUND!"
        }

        console.log("passworrrrrd",token)     
        const template_params = {
            "to_email": value, 
            "subject": "This is an Automated Email",
            "message":  "Dear,          " + f_name + "     "+ l_name + '<br>' +
                        "              " + '<br>' +
                        "We appreciate your interest in joining LAKWATSA-" + userType + '<br>' +
                        "After a thorough review of all your credentials being submitted,  we are delighted to inform you that your request application to join with LAKWATSA- " + userType  + '<br>' +
                        "has been approved." + '<br>' +
                        "Your account is now activated. To proceed, please log-in using the temporary username and password provided below;" + '<br>' +
                        "              " + '<br>' +
                        "              " + '<br>' +
                        "              " + '<br>' +
                        "Username      :"  + value +  '<br>' +
                        "Password      :"  + token +  '<br>' +
                        "              " + '<br>' +
                        "To reset your username and password, please click the link stated ( https://sample.com )" + '<br>' 
        }
        const SERVICE_ID = "maiweb";
        const TEMPLATE_ID = "template_b9dahpu";
        const USER_ID = "user_PB4KpsOSOkmrIN9xSEvzq";
        emailjs.send(SERVICE_ID, TEMPLATE_ID, template_params, USER_ID)
    
         const sendEmail2 = (e: { target: any; })=> {
            const data = {
              to_email: value,
            };        
            emailjs.send(SERVICE_ID, TEMPLATE_ID, data, USER_ID).then(
              function (response) {
                console.log(response.status, response.text);
              },
              function (err) {
                console.log(err);
              }
            );
          }
      }

    return(
        <>
        <h1>All Users</h1>
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table" >
                <TableHead >
                <TableRow>
                    <StyledTableCell style={{color:'white',textAlign:'center'}}>First Name</StyledTableCell>
                    <StyledTableCell style={{color:'white',textAlign:'center'}}>Last Name</StyledTableCell>
                    <StyledTableCell style={{color:'white',textAlign:'center'}}>Address</StyledTableCell>
                    <StyledTableCell style={{color:'white',textAlign:'center'}}>Email Address</StyledTableCell>
                    <StyledTableCell style={{color:'white',textAlign:'center'}}>Contact</StyledTableCell>
                    <StyledTableCell style={{color:'white',textAlign:'center'}}>User Type</StyledTableCell>
                    <StyledTableCell style={{color:'white',textAlign:'center'}}>Status</StyledTableCell>
                    <StyledTableCell style={{color:'white',textAlign:'center'}}>Action</StyledTableCell>
                    <StyledTableCell></StyledTableCell>

                </TableRow>
                </TableHead>
                <TableBody>
                    {
                        Object.keys(users).map(id=>{
                         
                            return <tr key={id}>
                                <StyledTableCell style={{textAlign: "center"}}>{users[id].f_name}</StyledTableCell>
                                <StyledTableCell style={{textAlign: "center"}}>{users[id].l_name}</StyledTableCell>

                                <StyledTableCell style={{textAlign: "center"}}>{users[id].address}</StyledTableCell>
                                <StyledTableCell style={{textAlign: "center"}}>{users[id].email}</StyledTableCell>

                                <StyledTableCell style={{textAlign: "center"}}>{users[id].contact}</StyledTableCell>
                                <StyledTableCell style={{textAlign: "center"}}>{users[id].usertype}</StyledTableCell>
                                <StyledTableCell style={{textAlign: "center"}}>{users[id].status}</StyledTableCell>
                                {/* <StyledTableCell>
                                  < DoneIcon style={{color: 'green'}} onClick={()=>{handleDocId(users[id].id); handleEmail(users[id].email, users[id].usertype, users[id].f_name,users[id].l_name)}}/>
                                </StyledTableCell> */}
                               
                                <StyledTableCell>
                                <DoneAllTwoToneIcon style={{color: 'green'}} onClick={()=>{handleDocId2(users[id].id); handleEmail2(users[id].email, users[id].token, users[id].usertype, users[id].f_name,users[id].l_name)}}/>
                                </StyledTableCell>
                                <StyledTableCell>
                                <CloseIcon  style={{color: 'red'}}onClick={() => deleteDocId(users[id].id)}/>
                                </StyledTableCell>
                            </tr>
                        })
                        
                    }
                </TableBody>
            </Table>
            </TableContainer>
        </>
    );
}
export default User;