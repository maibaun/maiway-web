import React, { Component, useState, useEffect } from 'react';
import Firebase from 'firebase'
import XLSX from 'xlsx';
import { make_cols } from './MakeColumns';
import { SheetJSFT } from './types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import Upimage from '../Upload/../ImageUpload/Upimage';

class ExcelReader extends Component {
  constructor(props) {
    super(props);
    // this.ref = Firebase.firestore().collection("places");
    // this.unsubscribe = null;
    this.state = {


    }
    
    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFile2 = this.handleFile2.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
  }
 
  handleChange(e) {
    const files = e.target.files;
    if (files && files[0]) this.setState({ file: files[0] });
  };
   
  handleChange2(e) {
    const files = e.target.files;
    if (files && files[0]) this.setState({ file: files[0] });
  };

  handleFile() {
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
      db.collection("places").doc().set({
        country_code: data[0].CountryCode,
        category: data[0].CategoryNo,
        en_name: data[0].NameEn,
        kr_name: data[0].NameKr,
        cn_name: data[0].NameCn,
        tc_name: data[0].NameTc,
        fr_name: data[0].NameFr,
        jp_name: data[0].NameJp,
        ph_name: data[0].NamePh,
        en_descr: data[0].DescriptionEn,
        kr_descr: data[0].DescriptionKr,
        cn_descr: data[0].DescriptionCn,
        tc_descr: data[0].DescriptionTc,
        fr_descr: data[0].DescriptionFr,
        jp_descr: data[0].DescriptionJp,
        ph_descr: data[0].DescriptionPh,
        address: data[0].Address,
        latitude: data[0].Latitude,
        longitude: data[0].Longitude,
        photos: [],
        formatted_phone_number: data[0].PhoneNo,
        Locality: data[0].Locality,
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
        store_reference: data[0].store_reference,
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



 
  render() {
    return (
      <div>
        {/* <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={this.handleFile}>
              Image
            </Button>
            <input type="file" className="form-control" id="file" accept={SheetJSFT} onChange={this.handleChange} />
          </Grid> */}

        <div>
          <TextField
          type="file"
          variant="outlined"
          id="file" 
          accept={SheetJSFT}
          onChange={this.handleChange}
          />
          {/* <div>
            <Button variant="contained"  style={{position:"absolute", top:256, width:107, height: 40}} color="primary" onClick={this.handleFile}>
              Save
            </Button>
          </div> */}
        </div>
        
        {/* <br />
        <input type="file" className="form-control" id="file" accept={SheetJSFT} onChange={this.handleChange} />
        <br />
        <br /> */}

        
        {/* <label htmlFor="file">This is for the store_menus</label>
        <br />
        <input type="file" className="form-control" id="file" accept={SheetJSFT} onChange={this.handleChange} />
        <br />
        <br /> */}
  
        {/* <input type='submit' 
          value="Save"
          onClick={this.handleFile} /> */}
          <div>
            <Button variant="contained"  style={{position:"absolute", top:267, width:107, height: 40}} color="primary" onClick={this.handleFile}>
              Save
            </Button>
          </div>
            
            {/* <Button variant="contained"  style={{position:"absolute", top:202, width:107, height: 40, marginTop: 100}} color="primary" onClick={this.handleFile2}>
              Savessssss store menu
            </Button> */}
            <div>
            < Upimage/>
          </div>
      </div>
        
    )
  }
}
 
export default ExcelReader;