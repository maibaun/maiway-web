import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Button, createStyles, FormControl, Grid, makeStyles, Paper, TextField, Theme } from '@material-ui/core';
import ItemTable from './ItemTable';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import GoogleMapReact from "google-map-react";
import firebase from "firebase";


// const MAP_APIKEY = `AIzaSyCfYCam9LoTBqherZAtERrPrkOD1ZzlSzU`;
// const GEOCODING_APIKEY = `${process.env.REACT_APP_GEOCODING_API_KEY}`;

// const K_MARGIN_TOP = 30;
// const K_MARGIN_RIGHT = 30;
// const K_MARGIN_BOTTOM = 30;
// const K_MARGIN_LEFT = 30;

// const K_HOVER_DISTANCE = 30;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
    textField: {
              marginLeft: theme.spacing(1),
              marginRight: theme.spacing(1),
              width: 200,
            },
  }),
);

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     container: {
//       display: 'flex',
//       flexWrap: 'wrap',
//     },
//     textField: {
//       marginLeft: theme.spacing(1),
//       marginRight: theme.spacing(1),
//       width: 200,
//     },
//   }),
// );


function Stores(this: any) {
    const classes = useStyles();

  
    const [inputs, setInputs] = useState({
        usertype: "",
        });
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
        target: { name, value },
        } = event;
        setInputs((prevState) => ({ ...prevState, [name]: value }));
    }
   

    const [storename, setStorename] = useState("");
    const [address, setAddress] = useState("");
    const [hours, setHours] = useState("");
    const [storetag, setStoretags] = useState("");
    const [ratings, setRatings] = useState("");
    const [description, setDescription] = useState("");

    const saveStore = () =>{

        const db = firebase.firestore();
        db.collection('store_infos').doc().set({
            storename,
            address,
            storetag,
            ratings,
            description,
            created_at: new Date()
        })
    }

    function initAutocomplete(){
        const map = new google.maps.Map(
            document.getElementById("map") as HTMLElement,
            {
                center: { lat: -33.8688, lng: 151.2195 },
                zoom: 12,
                mapTypeId: "roadmap",
            }
        );

        const input = document.getElementById("pac-input") as HTMLInputElement;
        const searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        map.addListener("bounds_changed", ()=>{
            searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds);
        });

        let markers: google.maps.Marker[] = [];
        searchBox.addListener("places_changed", ()=>{
            const places = searchBox.getPlaces();

            if(places.length == 0){
                return;
            }

            markers.forEach((marker) =>{
                marker.setMap(null);
            });
            markers = [];

            const bounds = new google.maps.LatLngBounds();
            places.forEach((place) =>{
                if(!place.geometry){
                    console.log("error")
                    return;
                }
                const icon = {
                    url: place.icon as string,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25),
                  };

                markers.push(
                new google.maps.Marker({
                    map,
                    icon,
                    title: place.name,
                    position: place.geometry.location,
                })
                );

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                  } else {
                    bounds.extend(place.geometry.location);
                  }
            });
            map.fitBounds(bounds);
        });

    }



  return (
      <>
       <body>

            <div style={{ padding: 20 , backgroundColor: '#ffffff', borderBottomRightRadius: 10, borderBottomLeftRadius: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
            <Grid container className={classes.root} spacing={2}>
            <FormControl variant="outlined" >
                <Grid item xs={6}>
                <TextField 
                    type="text" 
                    variant="outlined" 
                    label="Store Name" 
                    name="storename" 
                    placeholder="Store Name" 
                    fullWidth 
                    value={storename}
                    onChange={e => {
                    setStorename(e.target.value);
                    }}
                    required
                />
            
                <TextField 
                    id="pac-input"
                    type="text" 
                    variant="outlined" 
                    label="Address" 
                    name="address" 
                    placeholder="Address" 
                    fullWidth 
                    value={address}
                    onChange={e => {
                    setAddress(e.target.value);
                    }}
                    required 
                    style={{marginTop: '10px'}}
                />
                {/* <TextField
                id="pac-input"
                name="pac-input"
                type="text"
                placeholder="Search Place"
                />
                <div id="map" style={{ height: '100px', width: '100%' }}></div> */}
                <div>
                    <h4>Opening Hours</h4>
                <TextField
                    id="time"
                    label="From"
                    type="time"
                    defaultValue="07:30"
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    inputProps={{
                    step: 300, // 5 min
                    }}
                />
                 <TextField
                    id="time"
                    label="To"
                    type="time"
                    defaultValue="07:30"
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    inputProps={{
                    step: 300, // 5 min
                    }}
                />
                </div>
                <TextField 
                    type="text" 
                    variant="outlined" 
                    label="Store Tag" 
                    name="storetags" 
                    placeholder="Store Tag" 
                    fullWidth 
                    required 
                    value={storetag}
                    onChange={e => {
                    setStoretags(e.target.value);
                    }}
                    style={{marginTop: '10px'}}
                />
                <TextField 
                    type="number" 
                    variant="outlined" 
                    label="Ratings" 
                    name="ratings" 
                    placeholder="Ratings" 
                    required 
                    value={ratings}
                    onChange={e => {
                    setRatings(e.target.value);
                    }}
                    style={{marginTop: '10px'}}
                />
                <TextField 
                    type="text" 
                    variant="outlined" 
                    label="Description" 
                    name="description" 
                    placeholder="Description" 
                    fullWidth
                    value={description}
                    onChange={e => {
                    setDescription(e.target.value);
                    }}
                    required 
                    style={{marginTop: '10px'}}
                />
                 <Button 
                    variant="contained"
                    style={{marginTop: '10px', backgroundColor: '#009600', color: 'white'}}
                    onClick={saveStore}
                 >
                    Save Store
                </Button>
                </Grid>
                </FormControl>

            </Grid>
            {/* <Grid item xs={12}>
            
                <TextField 
                        type="text" 
                        variant="outlined" 
                        label="Description" 
                        name="description" 
                        placeholder="Description" 
                        fullWidth
                     
                        required 
                        style={{marginTop: '10px'}}
                    />
            </Grid> */}
  
            </div>
           
{/*         
            <div style={{ padding: 20 }}>
            <Grid container style={{backgroundColor: 'red'}}>
            </Grid>
            </div> */}
        </body>
        {/* <React.Fragment>
            <CssBaseline />
            <Container fixed>
                 <Typography component="div" style={{ backgroundColor: 'red', height: '100vh' }} />
            </Container>
        </React.Fragment> */}
      </>
  )
}

export default Stores;
