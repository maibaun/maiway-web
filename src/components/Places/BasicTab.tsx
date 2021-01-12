/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  createStyles,
  Grid,
  Hidden,
  makeStyles,
  Select,
  TextField,
  Theme,
} from "@material-ui/core";
import { constructor, strict } from "assert";
import { generateKeyPair } from "crypto";
import React, { useRef, useState } from "react";
import {
  CmmnSelect,
  CommonPopup,
  MapContainer2,
  OpeningHours,
} from "../commons";
import SingleLineGridList from "../commons/SingleLineGridImg";
import Geohash from "../Upload/Geohash";
import { AttachmentType } from "./PlacesPopup";
import GoogleMapReact from "google-map-react";
import { Publish } from "@material-ui/icons";
// import { getLatLng } from "react-google-places-autocomplete";
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxHeight: 220,
    },
    customButton2: {
      width: "8vw",
      minWidth: "80px",
      height: "3.5vh",
      marginLeft: theme.spacing(1),
    },
    gridCustom: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  })
);

interface BasicTabProps {
  commonList: any;
  // geoDeg: string;
  g: string;
  GeoHashed: string;
  country: string;
  filter: number | string;
  youtube: string;
  video: string;
  // rating: number | string;
  // user_rating_total: number | string;
  category: number | string;
  address: string;
  latitude: string;
  longitude: string;
  currency: string;
  attachment: AttachmentType[] | null;
  opening_hours: string[];
  handleCountryChange: (ev: React.ChangeEvent<{ value: unknown }>) => void;
  handleFilterChange: (ev: React.ChangeEvent<{value: unknown}>) => void;
  handleCategoryChange: (ev: React.ChangeEvent<{ value: unknown }>) => void;
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  onLatLngChang: (latLng: any, address: string,  GeoHashed: string, g: string ,  youtube: string, video: string) => void;
  handleClearMap: () => void;
  addImg: (newImg: AttachmentType[]) => void;
  deleteImg: (args: any) => void;
  // handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  
}

function BasicTab(this: any, {
  commonList,
  GeoHashed,
  g,
  country,
  filter,
  youtube,
  video,
  // rating, 
  // user_rating_total,
  category,
  address,
  latitude,
  longitude,
  currency,
  attachment,
  opening_hours,
  handleCountryChange,
  handleCategoryChange,
  handleFilterChange,
  onChange,
  onLatLngChang,
  handleClearMap,
  addImg,
  deleteImg,
  // handleChange,
}: BasicTabProps) {
  const classes = useStyles();
  const [latLng, setLatLng] = useState<any>({ lat: "", lng: "" });
  const [openMap, setOpenMap] = useState(false);
  const fileRef = useRef<any>();

  const onSelectCountryChange = (ev: React.ChangeEvent<{ value: unknown }>) => {
    handleCountryChange(ev);

  };
  

  const onSelectCategoryChange = (
    ev: React.ChangeEvent<{ value: unknown }>
  ) => {
    handleCategoryChange(ev);
  };

  const 
  onSelectFilterChange = (
    ev: React.ChangeEvent<{ value: unknown }>
  ) => {
    handleFilterChange(ev);


  };

  const onTextChange = (ev: React.ChangeEvent<HTMLInputElement> )  => {
    onChange(ev);

    // gh = Geohash.encode(latitude,longitude);
    
  };


  const setOpenMapDefault = () => {
    const selCountry = commonList["country"].filter(
      (ctry: any) => ctry.Ctry_Code === country

    ); 

    const arrLatLng = selCountry[0].Ctry_Latlng.split(",");
    arrLatLng &&
      setLatLng({
        lat: parseFloat(arrLatLng[0]),
        lng: parseFloat(arrLatLng[1]),
      });
    arrLatLng && setOpenMap(true);
  
  };

  /**
   * map 팝업 open
   */
  const handleOpenMap = () => {
    if (latitude && longitude) {
      setOpenMapDefault();
    } else if (!country || country === "Select") {
      alert("first select country");
    } else {
      setOpenMapDefault();
    }
  };

  const onClearButtonClick = () => {
    handleClearMap();
  };

  /**
   * map 팝업 close
   */
  const handleCloseMap = (params: any) => {
    // params.key && updatePage(params);
    setOpenMap(false);
  };
  // const onTextChange2 = (ev: React.ChangeEvent<HTMLInputElement> ,GeoHashed: string) => {
  //   console.log("this is GeoHashed", GeoHashed)
  //   onChange(ev);
  // };

  // function getGh(){
  //   console.log()
  // }
  // const onTextChange2 = (ev: React.ChangeEvent<HTMLInputElement>, GeoHashed: string) => {
  //   // onChange(ev);

  //   console.log("333333333333333", GeoHashed)
  // };
  // const [gg, setGg] = useState("");
  const onLatLngChang2 = (latLng: any, address: string, GeoHashed: string, g: string, youtube: string, video: string) => {
    console.log("this is GeoHashed", GeoHashed)
    console.log("this is address", latLng)

    // const gh = Geohash.encode(12, 32)
    // setGg(gh);
    // // const gh = Geohash.encode()
    // console.log("123123123123123", gh)


    onLatLngChang(latLng, address, GeoHashed, g, youtube, video);
    console.log("this is",  GeoHashed)
    console.log("this is",  address)
    setOpenMap(false);
  };


  /**
   * 파일 추가 버튼
   * @desc input file 버튼 실행
   */
  const handleAddFile = () => {
    fileRef.current.click();
  };

  // const [inputs, setInputs] = useState({
  //   usertype: "",
  // });

  // const onChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const {
  //     target: { name, value },
  //   } = event;
  //   setInputs((prevState) => ({ ...prevState, [name]: value }));

  // };
  // const [youtubeurl, setYoutubeurl] = useState("");
  // const [videourl, setVideourl] = useState("");

  /**
   * 파일 추가 input  hidden
   */
  const handleAttachFile = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const target = ev.target as HTMLInputElement;
    const { files } = target;
    if (files) {
      Array.prototype.forEach.call(files, (file: File) => {
        const ext = file.type.split("/")[1];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent: ProgressEvent<FileReader>) => {
          const currentTarget = finishedEvent.currentTarget as FileReader;
          const { result } = currentTarget;
          result && addImg([{ img: result.toString(), ext, isNew: true }]);
        };
        if (Boolean(file)) {
          reader.readAsDataURL(file);
        }
      });
    }
  };

  // const [inputs, setInputs] = useState({
  //   latitude: "",
  //   longitude: "",

  // });

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const {
  //     target: { name, value },
  //   } = event;
  //   console.log("nameeeeeeee",name)
  //   console.log("valueeeeeeeee", value)
  //   setInputs((prevState) => ({ ...prevState, [name]: value }));


  //   // const gh = Geohash.encode(value.latitude, longitude)
  // };
  


  // const [latitude, setLat] = useState("");
  // const [longitude, setLng] = useState("");
  // const [gg, setGg] = useState("");
  // interface LatLngProps {
  //   lat: number;
  //   lng: number;
    
  // }

  const [inputs, setInputs] = useState({
    usertype: "",
  });

  const onChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    setInputs((prevState) => ({ ...prevState, [name]: value }));

  };
  const [gg, setG] = useState("");
  const [lat, setLat] = useState<any>("");
  const [lng, setLng] = useState<any>("");
  const [ratings, setRating] = useState<any>("");
  const [user_rating_totals, setUserRatingTotal]= useState<any>("");
  // const [filter, setFilter] = useState<any>();
  const onSave = () => {
  

    const g = Geohash.encode(lat, lng);
    setG(g);
    console.log("ffffffffffff", g)

  };



    // const onSave = () => {

    //   const gh = Geohash.encode(1,1)
    //   setGg(gh);
    //   // const gh = Geohash.encode()
    //   console.log("123123123123123", gh)
    // }


  // const onSave = () => {

  //   const gh = Geohash.encode(12.36,65.3)
  //   setGg(gh);
  //   // const gh = Geohash.encode()
  //   console.log("123123123123123", gh)
  // }
  // const constructor = ()=>{
  //   this.state = {latitude: "", longitude: ""};
  // }
  // const changeLatitude = (newLat: any) => {
  //   this.setState({latitude: newLat})
  // }
  // const changeLongitude = (newLon: any)=>{
  //     this.setState({longitude: newLon})
  // }

  // const handleClick =()=>{
  //   console.log(this.state.latitude)
  // }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid item xs={12} className={classes.gridCustom}>
            <CmmnSelect
              label="Country"
              value={country || "Select"}
              firstItem="Select"
              itemList={commonList && commonList["country"]}
              keyValue={{ key: "Ctry_Code", value: "Ctry_Name" }}
              onChange={onSelectCountryChange}
            />
            <TextField
              name="currency"
              label="currency"
              fullWidth
              value={currency}
              disabled
            />

            <CmmnSelect
              label="Filter"
              value={filter || "Select"}
              firstItem="Select"
              itemList={commonList && commonList["filter"]}
              keyValue={{ key: "filter_cd", value: "filter_nm" }}
              onChange={onSelectFilterChange}
            />

            <CmmnSelect
              label="Category"
              value={category || "Select"}
              firstItem="Select"
              itemList={commonList && commonList["category"]}
              keyValue={{ key: "category_cd", value: "category_nm" }}
              onChange={onSelectCategoryChange}
            />
       
          </Grid>

          <TextField
            // disabled
            required
            id="address"            
            name="address"
            label="Address"
            fullWidth
            value={address}
            onChange={onTextChange}
          />

              <TextField
                id="latitude"
                name="latitude"
                label="Latitude"
                value={lat}
                onChange={e => {
                  setLat(e.target.value);
                }}
                fullWidth
              />

         
              <TextField
                id="longitude"
                name="longitude"
                label="Longitude"
                value={lng}
                onChange={e => {
                  setLng(e.target.value);
                }}
                fullWidth
              />  
            <Button 
              variant="contained"
              color="secondary"
              onClick={onSave}
            >
                Generate GeoHash
            </Button>
            <TextField
                id=""
                name=""
                label="Copy This and Paste to Geo Hashed"
                 value={gg}
            
                fullWidth
              />  
          <Grid item xs={12} className={classes.gridCustom}>
            <TextField
              // disabled
              id="latitude"
              name="latitude"
              label="Latitude"
              fullWidth
              value={latitude}
              onChange={onTextChange}
            />
            <TextField
              // disabled
              id="longitude"
              name="longitude"
              label="Longitude"
              fullWidth
              value={longitude}
              onChange={onTextChange}
            />
            <TextField
            
            id="g"
            name="g"   
            label="Geo Hashed"
            value={g}
           //  onClick={handleOnClicks}
            onChange={onTextChange}
            fullWidth
           />
            <TextField
              disabled
              id="latitude2"
              name="latitude2"
              label="Latitude2"
              fullWidth
              value={latitude}
              onChange={onTextChange}
              style={{display: 'none'  }}

            />
            <TextField
              disabled
              id="longitude2"
              name="longitude2"
              label="Longitude2"
              fullWidth
              value={longitude}
              onChange={onTextChange}
              style={{display: 'none'  }}
            />  

            <TextField
              disabled
              id="latitude3"
              name="latitude3"
              label="Latitude3"
              fullWidth
              value={latitude}
              onChange={onTextChange}
              style={{display: 'none'  }}

            />
            <TextField
              disabled
              id="longitude3"
              name="longitude3"
              label="Longitude3"
              fullWidth
              value={longitude}
              onChange={onTextChange}
              style={{display: 'none'  }}
            />  

            

            <Button
              variant="contained"
              color="primary"
              className={classes.customButton2}
              onClick={handleOpenMap}
            >
              Spot
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.customButton2}
              onClick={onClearButtonClick}
            >
              Clear
            </Button>
          </Grid>

          <TextField
            id="youtube"
            name="youtube"   
            label="youtube url"
            fullWidth
            value={youtube}
            onChange={onTextChange}
       
          />
          <TextField
            id="video"
            name="video"   
            label="video url"
            fullWidth
            value={video}
            onChange={onTextChange}
       
          />
          {/* <TextField
              // disabled
              id="rating"
              name="rating"
              label="Rating"
              fullWidth
              value={ratings}
              onChange={e => {
                setRating(e.target.value);
              }}
              // onChange={onTextChange}
            />
           <TextField
              // disabled
              id="user_rating_total"
              name="user_rating_total"
              label="User Rating Total"
              fullWidth
              value={user_rating_totals}
              onChange={e => {
                setUserRatingTotal(e.target.value);
              }}
              // onChange={onTextChange}
            /> */}

          <OpeningHours opening_hours={opening_hours} />
          <Grid item xs={12} className={classes.gridCustom}>
            <Button variant="contained" color="primary" onClick={handleAddFile}>
              Image
            </Button>
            <input
              type="file"
              multiple
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleAttachFile}
              ref={fileRef}
            />
          </Grid>
          {
            attachment && (
              <SingleLineGridList imgList={attachment} deleteImg={deleteImg} />
            )
            // attachment.map((img) => (
            //   <div key={img.img}>
            //     <img src={img.img} style={{ width: 100, height: 100 }} />
            //   </div>
            // ))
          }
        </Grid>
      </Grid>
      <CommonPopup
        width={"460px"}
        height={"650px"}
        open={openMap}
        handleClose={handleCloseMap}
      >
        <MapContainer2
          width={"460px"}
          height={"450px"}
          latitude={latitude}
          longitude={longitude}
          defaultLatLng={latLng}
          onLatLngChang={onLatLngChang2}
        />
      </CommonPopup>
    </>
  );
}

export default BasicTab;

