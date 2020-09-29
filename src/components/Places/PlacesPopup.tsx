import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  Modal,
  Backdrop,
  Fade,
  Button,
  CardContent,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
} from "@material-ui/core";

import { saveRequest, updateRequest } from "../../store/fireStoreReducer";
import { setUploadFile, resetUploadFile } from "../../store/fileUploadReducer";
import { deleteMultiFile } from "../../store/fileDeleteReducer";
import { CommonPopup, DraggableDialog, MapContainer2 } from "../commons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      maxWidth: 960,
      maxHeight: 800,
      overflow: "auto",
    },
    customButton2: {
      width: "8vw",
      minWidth: "80px",
      height: "3.5vh",
      marginLeft: theme.spacing(1),
    },
    customButton3: {
      width: "6vw",
      minWidth: "60px",
      height: "3.3vh",
      marginLeft: theme.spacing(1),
    },
    bottom: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    uploadBottom: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      marginBottom: "5px",
    },
    gridCustom: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    formControl: {
      margin: theme.spacing(1),
      // minWidth: 120,
    },
    customCardContent: {
      padding: "16px 0",
    },
    container: {
      maxHeight: 220,
    },
  })
);

function PlacesPopup({
  open,
  handleClose,
  fnSave,
  fnUpdate,
  selectedRow,
  commonList,
}: any) {
  const classes = useStyles();
  const [inputs, setInputs] = useState({
    name_ch: "",
    name_en: "",
    name_ja: "",
    name_ko: "",
    name_malaysia: "",
    name_sp: "",
    name_tamil: "",
    name_thailand: "",

    // category: "",
    address: "",
    details_en: "",
    details_es: "",
    details_ja: "",
    details_ko: "",
    details_tl: "",
    details_zh: "",
    // type: "",
    latitude: "",
    longitude: "",
  });

  const [openMap, setOpenMap] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const {
    name_ch,
    name_en,
    name_ja,
    name_ko,
    name_malaysia,
    name_sp,
    name_tamil,
    name_thailand,

    // category,
    address,
    details_en,
    details_es,
    details_ja,
    details_ko,
    details_tl,
    details_zh,
    // type,
    latitude,
    longitude,
  } = inputs;

  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [latLng, setLatLng] = useState<any>({ lat: "", lng: "" });

  useEffect(() => {
    if (open && selectedRow) {
      setInputs({
        name_ch: selectedRow.name_ch || "",
        name_en: selectedRow.name_en || "",
        name_ja: selectedRow.name_ja || "",
        name_ko: selectedRow.name_ko || "",
        name_malaysia: selectedRow.name_malaysia || "",
        name_sp: selectedRow.name_sp || "",
        name_tamil: selectedRow.name_tamil || "",
        name_thailand: selectedRow.name_thailand || "",
        // country: selectedRow.country || "",
        // category: selectedRow.category || "",
        address: selectedRow.address || "",
        details_en: selectedRow.details_en || "",
        details_es: selectedRow.details_es || "",
        details_ja: selectedRow.details_ja || "",
        details_ko: selectedRow.details_ko || "",
        details_tl: selectedRow.details_tl || "",
        details_zh: selectedRow.details_zh || "",
        // type: selectedRow.type || "",
        latitude: selectedRow.latitude || "",
        longitude: selectedRow.longitude || "",
      });
      setCountry(selectedRow.country || "");
      setCategory(selectedRow.category || "");
      setType(selectedRow.type || "");
    }
    return () => {
      setInputs({
        name_ch: "",
        name_en: "",
        name_ja: "",
        name_ko: "",
        name_malaysia: "",
        name_sp: "",
        name_tamil: "",
        name_thailand: "",
        // country: "",
        // category: "",
        address: "",
        details_en: "",
        details_es: "",
        details_ja: "",
        details_ko: "",
        details_tl: "",
        details_zh: "",
        // type: "",
        latitude: "",
        longitude: "",
      });
      setCountry("");
      setCategory("");
      setType("");
    };
  }, [open]);

  if (!open) {
    return null;
  }

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = ev.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleCountryChange = (ev: React.ChangeEvent<{ value: unknown }>) => {
    setCountry(ev.target.value as string);
  };
  const handleCategoryChange = (ev: React.ChangeEvent<{ value: unknown }>) => {
    setCategory(ev.target.value as string);
  };
  const handleTypeChange = (ev: React.ChangeEvent<{ value: unknown }>) => {
    setType(ev.target.value as string);
  };

  const handleSave = async () => {
    const params = {
      name_ch,
      name_en,
      name_ja,
      name_ko,
      name_malaysia,
      name_sp,
      name_tamil,
      name_thailand,
      country,
      category,
      address,
      details_en,
      details_es,
      details_ja,
      details_ko,
      details_tl,
      details_zh,
      type,
      latitude,
      longitude,
    };
    if (!selectedRow) {
      // 신규
      await fnSave("t_spots", { ...params, picture: "", tags: [], video: "" });
      handleClose();
    } else {
      // 업데이트
      // const obj2 = { ...obj, doc: selectedRow.key };
      const doc = selectedRow.key;
      await fnUpdate("t_spots", doc, params);
      handleClose({ ...selectedRow, ...params });
    }
  };

  /**
   * confirm 팝업 open
   */
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  /**
   * confirm 팝업 close
   */
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleUpdate = async () => {
    setOpenDialog(false);
    await handleSave();
    // console.log("updte");
  };

  /**
   * map 팝업 close
   */
  const handleCloseMap = (params: any) => {
    // params.key && updatePage(params);
    setOpenMap(false);
  };

  const onLatLngChang = (latLng: any, address: any) => {
    // console.log(latLng);
    setInputs((prevState) => ({
      ...prevState,
      latitude: latLng.lat,
      longitude: latLng.lng,
      address,
    }));
    setOpenMap(false);
  };

  /**
   * map 팝업 open
   */
  const handleOpenMap = () => {
    if (latitude && longitude) {
      setOpenMapDefault();
    } else if (!country) {
      alert("first select country");
    } else {
      setOpenMapDefault();
    }
  };

  const setOpenMapDefault = () => {
    const selCountry = commonList["country"].filter(
      (ctry: any) => ctry.Ctry_Name === country
    );

    const arrLatLng = selCountry[0].Ctry_Latlng.split(",");

    arrLatLng &&
      setLatLng({
        lat: parseFloat(arrLatLng[0]),
        lng: parseFloat(arrLatLng[1]),
      });
    arrLatLng && setOpenMap(true);
  };

  const handleClearMap = () => {
    setInputs((prevState) => ({ ...prevState, latitude: "", longitude: "" }));
  };
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Typography variant="h6" gutterBottom>
              New / Modify
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid item xs={12} className={classes.gridCustom}>
                  {/* <TextField
                    required
                    id="category"
                    name="category"
                    label="Category"
                    fullWidth
                    value={category}
                    onChange={onChange}
                  /> */}
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="category"
                    label="Category"
                    value={category}
                    fullWidth
                    onChange={handleCategoryChange}
                    required
                  >
                    <MenuItem value="none" disabled>
                      Category
                    </MenuItem>
                    {commonList &&
                      commonList["tspot_category"].map((row: any) => (
                        <MenuItem key={row.key} value={row.category}>
                          {row.category}
                        </MenuItem>
                      ))}
                  </Select>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="country"
                    label="Country"
                    value={country}
                    fullWidth
                    onChange={handleCountryChange}
                    required
                  >
                    <MenuItem value="none" disabled>
                      Country
                    </MenuItem>
                    {commonList &&
                      commonList["country"].map((row: any) => (
                        <MenuItem key={row.key} value={row.Ctry_Name}>
                          {row.Ctry_Name}
                        </MenuItem>
                      ))}
                  </Select>
                  {/* <TextField
                    id="type"
                    value={type}
                    onChange={onChange}
                    name="type"
                    label="Type"
                    fullWidth
                  /> */}
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="type"
                    label="Type"
                    value={type}
                    fullWidth
                    onChange={handleTypeChange}
                    required
                  >
                    <MenuItem value="none" disabled>
                      Type
                    </MenuItem>
                    {commonList &&
                      commonList["tspot_type"].map((row: any) => (
                        <MenuItem key={row.key} value={row.type}>
                          {row.type}
                        </MenuItem>
                      ))}
                  </Select>
                </Grid>

                <TextField
                  required
                  id="address"
                  name="address"
                  label="Address"
                  fullWidth
                  value={address}
                  onChange={onChange}
                />
                <Grid item xs={12} className={classes.gridCustom}>
                  <TextField
                    disabled
                    id="latitude"
                    name="latitude"
                    label="Latitude"
                    fullWidth
                    value={latitude}
                    onChange={onChange}
                  />
                  <TextField
                    disabled
                    id="longitude"
                    name="longitude"
                    label="Longitude"
                    fullWidth
                    value={longitude}
                    onChange={onChange}
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
                    onClick={handleClearMap}
                  >
                    Clear
                  </Button>
                </Grid>
                <Grid item xs={12} className={classes.gridCustom}>
                  <TextField
                    required
                    id="name_ch"
                    name="name_ch"
                    label="Name_ch"
                    fullWidth
                    value={name_ch}
                    onChange={onChange}
                  />
                  <TextField
                    required
                    id="name_en"
                    name="name_en"
                    label="Name_en"
                    fullWidth
                    value={name_en}
                    onChange={onChange}
                  />
                  <TextField
                    required
                    id="name_ja"
                    name="name_ja"
                    label="Name_ja"
                    fullWidth
                    value={name_ja}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12} className={classes.gridCustom}>
                  <TextField
                    required
                    id="name_ko"
                    name="name_ko"
                    label="Name_ko"
                    fullWidth
                    value={name_ko}
                    onChange={onChange}
                  />
                  <TextField
                    required
                    id="name_malaysia"
                    name="name_malaysia"
                    label="Name_malaysia"
                    fullWidth
                    value={name_malaysia}
                    onChange={onChange}
                  />
                  <TextField
                    required
                    id="name_sp"
                    name="name_sp"
                    label="Name_sp"
                    fullWidth
                    value={name_sp}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12} className={classes.gridCustom}>
                  <TextField
                    required
                    id="name_tamil"
                    name="name_tamil"
                    label="Name_tamil"
                    fullWidth
                    value={name_tamil}
                    onChange={onChange}
                  />
                  <TextField
                    required
                    id="name_thailand"
                    name="name_thailand"
                    label="Name_thailand"
                    fullWidth
                    value={name_thailand}
                    onChange={onChange}
                  />
                </Grid>
                <TextField
                  multiline
                  id="details_en"
                  value={details_en}
                  onChange={onChange}
                  name="details_en"
                  label="Details_en"
                  fullWidth
                  style={{
                    maxHeight: "120px",
                    overflowY: "auto",
                    marginTop: "3px",
                  }}
                />
                <TextField
                  multiline
                  id="details_es"
                  value={details_es}
                  onChange={onChange}
                  name="details_es"
                  label="Details_es"
                  fullWidth
                  style={{
                    maxHeight: "120px",
                    overflowY: "auto",
                    marginTop: "3px",
                  }}
                />
                <TextField
                  multiline
                  id="details_ja"
                  value={details_ja}
                  onChange={onChange}
                  name="details_ja"
                  label="Details_ja"
                  fullWidth
                  style={{
                    maxHeight: "120px",
                    overflowY: "auto",
                    marginTop: "3px",
                  }}
                />
                <TextField
                  multiline
                  id="details_ko"
                  value={details_ko}
                  onChange={onChange}
                  name="details_ko"
                  label="Details_ko"
                  fullWidth
                  style={{
                    maxHeight: "120px",
                    overflowY: "auto",
                    marginTop: "3px",
                  }}
                />
                <TextField
                  multiline
                  id="details_tl"
                  value={details_tl}
                  onChange={onChange}
                  name="details_tl"
                  label="Details_tl"
                  fullWidth
                  style={{
                    maxHeight: "120px",
                    overflowY: "auto",
                    marginTop: "3px",
                  }}
                />

                <TextField
                  multiline
                  id="details_zh"
                  value={details_zh}
                  onChange={onChange}
                  name="details_zh"
                  label="Details_zh"
                  fullWidth
                  style={{
                    maxHeight: "120px",
                    overflowY: "auto",
                    marginTop: "3px",
                  }}
                />
              </Grid>
            </Grid>

            <CardContent>
              <div className={classes.bottom}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.customButton2}
                  onClick={handleClickOpenDialog}
                >
                  Save
                </Button>
              </div>
            </CardContent>
          </div>
        </Fade>
      </Modal>
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
          onLatLngChang={onLatLngChang}
        />
      </CommonPopup>
      <DraggableDialog
        handleCloseDialog={handleCloseDialog}
        openDialog={openDialog}
        handleYesDialog={handleUpdate}
        alertTitle={"Update"}
        alertMsg={"Update?"}
      />
    </>
  );
}

function mapStateToProps(state: any, ownProps: any) {
  let selectedRow = [];
  if (state.fsSearchPageReducer.rowData) {
    const { data } = state.fsSearchPageReducer.rowData;
    selectedRow = data?.filter(
      (row: any) => row.key === ownProps.selectedID
    )[0];
  }
  return {
    selectedRow: selectedRow,
    userInfo: state.statusReducer,
    commonList: state.fsCountryReducer.rowData?.data,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    fnSave: (col: string, params: any) => dispatch(saveRequest(col, params)),
    fnUpdate: (col: string, doc: string, params: any) =>
      dispatch(updateRequest(col, doc, params)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(PlacesPopup);
