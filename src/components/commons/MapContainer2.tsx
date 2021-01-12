import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import "dotenv/config";
import { Button, CardContent, Grid, TextField } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Axios from "axios";
import Geohash from "../Upload/Geohash"
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete';


const MAP_APIKEY = `${process.env.REACT_APP_MAP_API_KEY}`;
const GEOCODING_APIKEY = `${process.env.REACT_APP_GEOCODING_API_KEY}`;

const K_MARGIN_TOP = 30;
const K_MARGIN_RIGHT = 30;
const K_MARGIN_BOTTOM = 30;
const K_MARGIN_LEFT = 30;

const K_HOVER_DISTANCE = 30;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    customButton2: {
      width: "8vw",
      minWidth: "80px",
      height: "3.5vh",
      marginLeft: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
    bottom: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "flex-end",
    },
  })
);

const AnyReactComponent = ({ text }: any) => (
  <div style={{ backgroundColor: "blue" }}>
    <LocationOnIcon
      style={{
        color: "red",
        fontSize: "3.5em",
        marginLeft: "-0.5em",
        marginTop: "-1.2em",
      }}
    />
  </div>
);

const center = {
  lat: 14.581137,
  lng: 121.163718,
};

interface LatLngProps {
  lat: number;
  lng: number;
  
}

function MapContainer2({
  width,
  height,
  latitude,
  longitude,
  defaultLatLng,
  onLatLngChang,
  onLatLngChang3,
}: any) {
  const classes = useStyles();
  const [latLng, setLatLng] = useState<null | LatLngProps>(null);
  const [dLatLng, setDlatLng] = useState<any>(null);
  const [address, setAddress] = useState("");
  const [geohash, setGeohash] = useState<null | LatLngProps>(null);
  // const [GeoHashed, setGeohashed] = useState<any>(null);
  const [g, setG] = useState("");

  useEffect(() => {
    latitude = (latitude && parseFloat(latitude)) || null;
    longitude = (longitude && parseFloat(longitude)) || null;
    if (latitude) {
      defaultLatLng.lat = latitude;
      defaultLatLng.lng = longitude;
    }
    setLatLng({ lat: latitude, lng: longitude });
    setDlatLng({ lat: defaultLatLng.lat, lng: defaultLatLng.lng });
    getAddress({ lat: latitude, lng: longitude });

    
    // getGeohash({ lat: latitude, lng: longitude });

  }, []);

  const handleOnClick = (event: GoogleMapReact.ClickEventValue) => {
    const { lat, lng } = event;

    setLatLng({
      lat: parseFloat(lat.toFixed(6)),
      lng: parseFloat(lng.toFixed(6)),
    });
    getAddress({ lat, lng });

    // const setGeohash = () =>{
    //   const g = Geohash.encode(lat,lng);
    //   // const g = Geohash.encode(29.071301,-110.966698);
    //   setG(g);
    //   console.log("a312312312312sd", g)
    // }
    setGeohash({ lat, lng });
    const g = Geohash.encode(lat,lng);
    // const g = Geohash.encode(29.071301,-110.966698);
    setG(g);
    console.log("ffffffffffff", g)

  };


  const handelOnChangeLanLng = () => {
    latLng && onLatLngChang(latLng, address, g);
    console.log("this is for asdasdsadassd" , g)
  };
  const handleOnChildClick = (hoverKey: any, childProps: any) => {
    console.log("aaaaa",hoverKey);
    console.log("bbbbbb",childProps);
  };

  const getAddress = async ({ lat, lng }: any) => {
    const result = await Axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GEOCODING_APIKEY}`
    );
    const {
      data: { results },
    } = result;
    const { formatted_address } = results[0];
    setAddress(formatted_address || "");
  };

  // const handleApiLoaded = (map: any, maps: any) => {
  //   // use map and maps objects
  // };

  // const onTextChange = (ev: React.ChangeEvent<HTMLInputElement> )  => {
  //   onChange(ev);
  // };


  return (
    <>
      <div style={{ height, width: "100%" }}>
        {dLatLng && (
          <GoogleMapReact
            bootstrapURLKeys={{ key: MAP_APIKEY }}
            defaultCenter={{ lat: dLatLng.lat, lng: dLatLng.lng }}
            defaultZoom={11}
            yesIWantToUseGoogleMapApiInternals={true}
            // onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}

            onClick={handleOnClick}
            onChildClick={handleOnChildClick}
        
            // margin={[
            //   K_MARGIN_TOP,
            //   K_MARGIN_RIGHT,
            //   K_MARGIN_BOTTOM,
            //   K_MARGIN_LEFT,
            // ]}
            // hoverDistance={K_HOVER_DISTANCE}
          >
            {latLng && (
              <AnyReactComponent lat={latLng.lat} lng={latLng.lng} text="" />
            )}
          </GoogleMapReact>
        )}
      </div>

      <div className={classes.bottom}>
        <TextField
          disabled
          id="latitude"
          name="latitude"
          label="Latitude"
          fullWidth
          value={latLng?.lat || ""}
        />
        <TextField
          disabled
          id="longitude"
          name="longitude"
          label="Longitude"
          fullWidth
          placeholder="longitude"
          value={latLng?.lng || ""}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.customButton2}
          onClick={handelOnChangeLanLng}
        >
          Confirm
        </Button>
      </div>
      <Grid item xs={12}>
        <TextField
          id="address"
          name="address"
          label="Address"
          fullWidth
          value={address}
          // onChange={onTextChange}
          
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
            id="g"
            name="g"   
            fullWidth
            value={g}
            // style={{display: 'none'  }}

          />
      </Grid>
    </>
  );
}

export default React.memo(MapContainer2);
