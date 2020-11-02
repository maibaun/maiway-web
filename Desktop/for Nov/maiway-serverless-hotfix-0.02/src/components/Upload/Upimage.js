import { storage } from 'firebase';
import React from 'react';
import Firebase from 'firebase'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
class Upimage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {file: '',imagePreviewUrl: ''};
     
    }
    _handleSubmit(e){
        e.preventDefault();
      

        const db = Firebase.firestore();
        const storageRef = Firebase.storage().ref();
        const myRef = Firebase.database().ref();        
        const files = this.state.file;
        // const documentId = docRef;

        db.collection("places")
        .orderBy("added_at", "desc")
        .limit(1)
        .onSnapshot(function(snapshot) {
            snapshot.forEach(function(doc) {
              console.log("11111",doc.id);
              const dat = doc.id;
        db.collection("places").doc(dat).get().then((docRef) => { console.log(docRef.id, "/////////",docRef.data()) })
        .catch((error) => { })
        
        const uploadTask = storageRef.child('places/' + dat).put(files);
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
        

        <div className="previewComponent" style={{width:100, height: 320 }}>
          <form onSubmit={(e)=>this._handleSubmit(e)}>
            <input className="fileInput" 
              type="file" 
              onChange={(e)=>this._handleImageChange(e)} />
            <button className="submitButton" 
              type="submit" 
              onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
           
          </form>
          <div className="imgPreview" >

            {$imagePreview}
          </div>
        </div>
      )
    }
  }
    
//   ReactDOM.render(<Upimage/>, document.getElementById("mainApp"));
export default Upimage;