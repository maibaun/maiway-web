import React, { Component, useState, useEffect } from 'react';
import Firebase from 'firebase'
import XLSX from 'xlsx';
import { make_cols } from './MakeColumns';
import { SheetsJSFT } from './type';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Additems from '../Stores/Additems';
import Stores from '../Stores/Stores';
import SimpleMap from '../Stores/SimpleMap';
import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import Upimage from '../Upload/../ImageUpload/Upimage';

class Store extends Component {
  constructor(props) {
    super(props);
    // this.ref = Firebase.firestore().collection("places");
    // this.unsubscribe = null;
    this.state = {

    }

    this.handleFile2 = this.handleFile2.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleFile3 = this.handleFile3.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    

  }



  handleChange2(e) {
    const files = e.target.files;
    if (files && files[0]) this.setState({ file: files[0] });
  };

  handleChange3(e) {
    const files = e.target.files;
    if (files && files[0]) this.setState({ file: files[0] });
  };

  handleFile2() {
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
 
    reader.onload = (e) => {
      ///// Parse data 
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true });
      ///// Get first worksheet 
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      //// Convert array of arrays
      const data = XLSX.utils.sheet_to_json(ws);
      //// Update state 
      this.setState({ data: data, cols: make_cols(ws['!ref']) }, () => {
        console.log(JSON.stringify(this.state.data, null, 2));
        
      // const myDataStr = data.toString();
      // const test = Object.values( data );
      const myDataStr = JSON.stringify(data);  
      
      console.log(">>>>>>>>>", myDataStr);
      const db = Firebase.firestore();
      db.collection("store_menus").doc().set({
        category: data[0].category,
        cn_descr: data[0].cn_descr,
        cn_name: data[0].cn_name,
        description: data[0].description,
        fr_descr: data[0].fr_descr,
        fr_name: data[0].fr_name,
        jp_descr: data[0].jp_descr,
        jp_name: data[0].jp_name,
        kr_descr: data[0].kr_descr,
        kr_name: data[0].kr_name,
        name: data[0].name,
        orig_price: data[0].orig_price,
        ph_descr: data[0].ph_descr,
        ph_name: data[0].ph_name,
        photos: [],
        promo_price: data[0].promo_price,
        rating: data[0].rating,
        store_id: data[0].store_id,
        store_referance: '/store_infos/' + data[0].store_reference,
        // store_reference: data[0].store_reference,
        tc_descr: data[0].tc_descr,
        tc_name: data[0].tc_name,
        total_likes: data[0].total_likes,
        user_ratings_total: data[0].user_ratings_total,
        created_at: new Date()
      })
      .then(function() {
            alert("successfully uploaded!");
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            alert(error);
            console.error("Error writing document: ", error);
        });
        console.log("000000000000000",  myDataStr);
      });
      
      // console.log(">>>>>>>>>>>>>>>>>", data)
    };
  
    if (rABS) {
      reader.readAsBinaryString(this.state.file);
    } else {
      reader.readAsArrayBuffer(this.state.file);
    };
  }


  handleFile3() {

    // const db = Firebase.firestore();
    // const getuid = db.firestore().collection('users').where('uid', '=', db.auth().currentUser.uid).get()
    // console.log("asdasdsad", getuid)

    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
 
    reader.onload = (e) => {
      ///// Parse data 
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true });
      ///// Get first worksheet 
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      //// Convert array of arrays
      const data = XLSX.utils.sheet_to_json(ws);
      //// Update state 
      this.setState({ data: data, cols: make_cols(ws['!ref']) }, () => {
        console.log(JSON.stringify(this.state.data, null, 2));
        
      // const myDataStr = data.toString();
      // const test = Object.values( data );
      const myDataStr = JSON.stringify(data);  
      
      console.log(">>>>>>>>>", myDataStr);
      const db = Firebase.firestore();
      db.collection("store_infos").doc().set({
        address: data[0].address,
        cn_descr: data[0].cn_descr,
        cn_name: data[0].cn_name,
        description: data[0].description,
        fr_descr: data[0].fr_descr,
        fr_name: data[0].fr_name,
        item_references: '/store_menu/' + data[0].item_references,
        jp_descr: data[0].jp_descr,
        jp_name: data[0].jp_name,
        kr_descr: data[0].kr_descr,
        kr_name: data[0].kr_name,
        l: data[0].l,
        opening_hours: data[0].opening_hours,
        owner_references: '/users/' + data[0].owner_references,
        ph_descr: data[0].ph_descr,
        ph_name: data[0].ph_name,
        ratings: data[0].ratings,
        store_tag: data[0].store_tag,
        tc_descr: data[0].tc_descr,
        tc_name: data[0].tc_name,
        created_at: new Date()
      })
      .then(function() {
            alert("successfully uploaded!");
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            alert(error);
            console.error("Error writing document: ", error);
        });
        console.log("000000000000000",  myDataStr);
      });
      
      // console.log(">>>>>>>>>>>>>>>>>", data)
    };
  
    if (rABS) {
      reader.readAsBinaryString(this.state.file);
    } else {
      reader.readAsArrayBuffer(this.state.file);
    };
  }


 
  render() {
    return (
      <>
        <div>
          {/* <h2> Add Items on Stores</h2>
          <div style={{marginBottom: '100px'}}>
          <Additems/>
          </div> */}
          <h2> Add Store</h2>
          <div style={{marginBottom: '100px'}}>
            {/* <SimpleMap/> */}
            <Stores/>
          </div>
          <Grid container spacing={3}>
            <div><h3>Store Menu </h3></div>
           <div>
              <TextField
                type="file"
                variant="outlined"
                style={{width:450}}
                accept={SheetsJSFT} 
                onChange={this.handleChange2}
              />
              <br/>
              <br/>
              <Button variant="contained"  style={{width:107, height: 40, marginBottom: 5}} color="primary"  onClick={this.handleFile2}>
                Save
              </Button>
              <div>
              {/* < Upimage/> */}
              </div>
            </div>

            <div><h3>Store Info </h3></div>
            <div>
              <TextField
                type="file"
                variant="outlined"
                style={{width:450}}
                accept={SheetsJSFT} 
                onChange={this.handleChange2}
              />
              <br/>
              <br/>
              <Button variant="contained"  style={{width:107, height: 40, marginBottom: 5}} color="primary"  onClick={this.handleFile3}>
                Save
              </Button>
              <div>
              {/* < Upimage/> */}
              </div>
            </div>
          </Grid>
      </div>
      </>
    )
  }
}
 
export default Store;