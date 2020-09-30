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

import { saveRequest, updateRequest } from "../../store/cudReducer";
import { setUploadFile, resetUploadFile } from "../../store/fileUploadReducer";
import { deleteMultiFile } from "../../store/fileDeleteReducer";
import { CommonPopup, DraggableDialog, MapContainer2 } from "../commons";
import { dbSvcProps } from "../../fBase";

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
    address: "",
    latitude: "",
    longitude: "",
    en_name: "",
    fr_name: "",
    jp_name: "",
    kr_name: "",
    ph_name: "",
    cn_name: "",
    tc_name: "",
    en_descr: "",
    fr_descr: "",
    jp_descr: "",
    kr_descr: "",
    ph_descr: "",
    cn_descr: "",
    tc_descr: "",
  });

  const [openMap, setOpenMap] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const {
    address,
    latitude,
    longitude,
    en_name,
    fr_name,
    jp_name,
    kr_name,
    ph_name,
    cn_name,
    tc_name,
    en_descr,
    fr_descr,
    jp_descr,
    kr_descr,
    ph_descr,
    cn_descr,
    tc_descr,
  } = inputs;

  const [country, setCountry] = useState("");
  const [category, setCategory] = useState(0);
  const [latLng, setLatLng] = useState<any>({ lat: "", lng: "" });

  useEffect(() => {
    if (open && selectedRow) {
      setInputs({
        address: selectedRow.address || "",
        latitude: selectedRow.geo.latitude || 0,
        longitude: selectedRow.geo.longitude || 0,
        en_name: selectedRow.en_name || "",
        fr_name: selectedRow.fr_name || "",
        jp_name: selectedRow.jp_name || "",
        kr_name: selectedRow.kr_name || "",
        ph_name: selectedRow.ph_name || "",
        cn_name: selectedRow.cn_name || "",
        tc_name: selectedRow.tc_name || "",
        en_descr: selectedRow.en_descr || "",
        fr_descr: selectedRow.fr_descr || "",
        jp_descr: selectedRow.jp_descr || "",
        kr_descr: selectedRow.kr_descr || "",
        ph_descr: selectedRow.ph_descr || "",
        cn_descr: selectedRow.cn_descr || "",
        tc_descr: selectedRow.tc_descr || "",
      });
      setCountry(selectedRow.country_code || "");
      setCategory(selectedRow.category || 0);
    }
    return () => {
      setInputs({
        address: "",
        latitude: "",
        longitude: "",
        en_name: "",
        fr_name: "",
        jp_name: "",
        kr_name: "",
        ph_name: "",
        cn_name: "",
        tc_name: "",
        en_descr: "",
        fr_descr: "",
        jp_descr: "",
        kr_descr: "",
        ph_descr: "",
        cn_descr: "",
        tc_descr: "",
      });
      setCountry("");
      setCategory(0);
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
    setCategory(ev.target.value as number);
  };

  const handleSave = async () => {
    const params = {
      address,
      geo: new dbSvcProps.GeoPoint(parseFloat(latitude), parseFloat(longitude)),
      en_name,
      fr_name,
      jp_name,
      kr_name,
      ph_name,
      cn_name,
      tc_name,
      en_descr,
      fr_descr,
      jp_descr,
      kr_descr,
      ph_descr,
      cn_descr,
      tc_descr,
      country_code: country,
      category,
    };
    if (!selectedRow) {
      // 신규
      await fnSave("places", { ...params, picture: "", tags: [], video: "" });
      handleClose();
    } else {
      // 업데이트
      // const obj2 = { ...obj, doc: selectedRow.key };
      const doc = selectedRow.key;
      await fnUpdate("places", doc, params);
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
                      commonList["category"].map((row: any) => (
                        <MenuItem key={row.key} value={row.category_cd}>
                          {row.category_nm}
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
                        <MenuItem key={row.key} value={row.Ctry_Code}>
                          {row.Ctry_Name}
                        </MenuItem>
                      ))}
                  </Select>

                  {/* <Select
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
                  </Select> */}
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
                    id="en_name"
                    name="en_name"
                    label="En_name"
                    fullWidth
                    value={en_name}
                    onChange={onChange}
                  />
                  <TextField
                    required
                    id="fr_name"
                    name="fr_name"
                    label="Fr_name"
                    fullWidth
                    value={fr_name}
                    onChange={onChange}
                  />
                  <TextField
                    required
                    id="jp_name"
                    name="jp_name"
                    label="Jp_name"
                    fullWidth
                    value={jp_name}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12} className={classes.gridCustom}>
                  <TextField
                    required
                    id="kr_name"
                    name="kr_name"
                    label="Kr_name"
                    fullWidth
                    value={kr_name}
                    onChange={onChange}
                  />
                  <TextField
                    required
                    id="ph_name"
                    name="ph_name"
                    label="Ph_name"
                    fullWidth
                    value={ph_name}
                    onChange={onChange}
                  />
                  <TextField
                    required
                    id="cn_name"
                    name="cn_name"
                    label="Cn_name"
                    fullWidth
                    value={cn_name}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12} className={classes.gridCustom}>
                  <TextField
                    required
                    id="tc_name"
                    name="tc_name"
                    label="Tc_name"
                    fullWidth
                    value={tc_name}
                    onChange={onChange}
                  />
                </Grid>
                <TextField
                  multiline
                  id="en_descr"
                  value={en_descr}
                  onChange={onChange}
                  name="en_descr"
                  label="En_descr"
                  fullWidth
                  style={{
                    maxHeight: "120px",
                    overflowY: "auto",
                    marginTop: "3px",
                  }}
                />
                <TextField
                  multiline
                  id="fr_descr"
                  value={fr_descr}
                  onChange={onChange}
                  name="fr_descr"
                  label="Fr_descr"
                  fullWidth
                  style={{
                    maxHeight: "120px",
                    overflowY: "auto",
                    marginTop: "3px",
                  }}
                />
                <TextField
                  multiline
                  id="jp_descr"
                  value={jp_descr}
                  onChange={onChange}
                  name="jp_descr"
                  label="Jp_descr"
                  fullWidth
                  style={{
                    maxHeight: "120px",
                    overflowY: "auto",
                    marginTop: "3px",
                  }}
                />
                <TextField
                  multiline
                  id="kr_descr"
                  value={kr_descr}
                  onChange={onChange}
                  name="kr_descr"
                  label="Kr_descr"
                  fullWidth
                  style={{
                    maxHeight: "120px",
                    overflowY: "auto",
                    marginTop: "3px",
                  }}
                />
                <TextField
                  multiline
                  id="ph_descr"
                  value={ph_descr}
                  onChange={onChange}
                  name="ph_descr"
                  label="Ph_descr"
                  fullWidth
                  style={{
                    maxHeight: "120px",
                    overflowY: "auto",
                    marginTop: "3px",
                  }}
                />

                <TextField
                  multiline
                  id="cn_descr"
                  value={cn_descr}
                  onChange={onChange}
                  name="cn_descr"
                  label="Cn_descr"
                  fullWidth
                  style={{
                    maxHeight: "120px",
                    overflowY: "auto",
                    marginTop: "3px",
                  }}
                />

                <TextField
                  multiline
                  id="tc_descr"
                  value={tc_descr}
                  onChange={onChange}
                  name="tc_descr"
                  label="Tc_descr"
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
  if (state.placesReducer) {
    const { rowData } = state.placesReducer;
    selectedRow = rowData?.filter(
      (row: any) => row.key === ownProps.selectedID
    )[0];
  }
  return {
    selectedRow: selectedRow,
    userInfo: state.statusReducer,
    commonList: state.fsCmmnArrayReducer.rowData,
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
