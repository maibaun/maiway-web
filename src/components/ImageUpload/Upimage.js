import { storage } from 'firebase';
import React from 'react';
import Firebase from 'firebase';
import {
    Button,
    createStyles,
    Grid,
    makeStyles,
    RootRef,
    TextField,
    Theme,
  } from "@material-ui/core";

class Upimage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {file: '',imagePreviewUrl: ''};
     
    }
    handleQuery(){
      const rootRef = Firebase.database().ref();
      const res = Firebase.firestore();
      const db = Firebase.firestore();

      const admin=
      res.database()
      .ref('/places')
      .orderByChild('en_name')
      .startAt('ceb')
      .endAt("ceb\uf8ff")
      .once('value')
      .then(c => res.send(c.val()));

      // const search = rootRef.child("en_name").orderByChild('category').startAt('Cebu').endAt('Cebu\uf8ff')

      console.log(admin)

      // // db.collection("places")
      // // .where("category" ,"==", 5)
      // // .get().then(function(querySnapshot) {      
      // //   console.log(querySnapshot.size); 
        // db.collection("en_name")
        //   .orderBy("category")
        //   .equalTo("test")
        //   .on('places', function(snapshot){
        //     if (snapshot.val() == null) {
        //       console.log("not avail")
        //     }else{
        //       console.log("email");
        //       const key = snapshot.key;
        //       const childData = snapshot.val();
        //     }
        //   })

     
    
      
      
      
      // console.log("dddddddddd",data)
      // const js = JSON.stringify(data)
      // console.log("asdasdasdasd",js)
      // const jsp = JSON.parse(js)
      // console.log("fffff", jsp)
      // db.collection("tour_packages").doc().set(jsp)

      // db.collection("tour_packages")
      //   .orderBy("address","desc")
      //   .limit(20)
      //   .onSnapshot(function(snapshot) {
      //       snapshot.forEach(function(doc) {
      //           // const js = doc.data()
      //           console.log(">>>", JSON.stringify(doc.data()))     
      //           // const jss = JSON.stringify(js)
      //           // console.log(js)
        
      //           // db.collection("places").doc().set(doc.data())
      //       });
      //   });  
      
    }

    _handleSubmit(e){
        e.preventDefault();
      

        const db = Firebase.firestore();
        const storageRef = Firebase.storage().ref();
        const myRef = Firebase.database().ref();        
        const files = this.state.file;
        // const documentId = docRef;

        db.collection("places")
        .orderBy("created_at", "desc")
        .limit(1)
        .onSnapshot(function(snapshot) {
            snapshot.forEach(function(doc) {
              console.log("11111",doc.id);
              const dat = doc.id;
        db.collection("places").doc(dat).get().then((docRef) => { console.log(docRef.id, "/////////",docRef.data()) })
        .catch((error) => { })
        console.log("`````````````````",files)
        const uploadTask = storageRef.child(`places/${dat}/${dat}`).put(files);
        uploadTask.on('state_changed', function(snapshot){
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case Firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case Firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
           
          }, function(error) {
          }, function() {
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              console.log('File available at', downloadURL);
        
            });
          });
          alert("Image Successfully Uplaoded!");
        });
        });
    }


    _handleImageChange(e) {
      e.preventDefault();
  
      let reader = new FileReader();
      let file = e.target.files[0];
  
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
  
      reader.readAsDataURL(file)
    }
  
    render() {
      let {imagePreviewUrl} = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} />);
      } else {
        $imagePreview = (<div className="previewText"></div>);
      }
  
      return (
        

        <div className="previewComponent">
          <form onSubmit={(e)=>this._handleSubmit(e)}>

          <div>
          <TextField
            style={{marginTop: '20px'}}
            type="file"
            variant="outlined"
            id="file" 
            onChange={(e)=>this._handleImageChange(e)}
            />
            <div>
              <Button variant="contained"  onClick={(e)=>this._handleSubmit(e)} color="primary" >
                Upload Image
              </Button>
            </div>
            
          </div>
            {/* <input className="fileInput" 
              type="file" 
              onChange={(e)=>this._handleImageChange(e)} /> */}


              
            {/* <button className="submitButton" 
              type="submit" 
              onClick={(e)=>this._handleSubmit(e)}>Upload Image</button> */}
           
          </form>
          {/* <input type='submit'
          value="Get"
          onClick={this.handleQuery} /> */}

          {/* <div className="imgPreview" >

            {$imagePreview}
          </div> */}
        </div>
      )
    }
  }
    
//   ReactDOM.render(<Upimage/>, document.getElementById("mainApp"));
export default Upimage;