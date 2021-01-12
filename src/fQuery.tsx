import { dbSvc } from "./fBase";
import { dbSvcProps, storageSvc } from "./fBase";
import { v4 as uuidv4 } from "uuid";
import { AttachmentType } from "./components/Places/PlacesPopup";

const FQcheckUser = async (uid: string) => {
  try {
    let rows: any = [];

    const snapshot = await dbSvc
      .collection("users")
      .where("uid", "==", uid)
      .get();

    snapshot.forEach((doc) => {
      const childData = doc.data();
      rows.push({ ...childData });
    });
    return rows;
    //   handleSearchResponse(res, rows);
  } catch (err) {
    console.log(err);
    return [];
    //   handleSearchResponse(res, null, error);
  }
};

// const FQcommon = async (doc: string) => {
//   try {
//     let rows = [];

//     const snapshot = await dbSvc.collection(doc).get();

//     snapshot.forEach((doc) => {
//       const childData = doc.data();
//       const id = doc.id;
//       rows.push({ ...childData, key: id });
//     });

//     //   handleSearchResponse(res, rows);
//   } catch (e) {
//     //   handleSearchResponse(res, null, error);
//   }
// };

/**
 * FQcommonArray 타입
 */
interface FQcommonArrayProps {
  doc: string;
  orderBy: string;
}

/**
 * 공통으로 사용하는 collection 조회
 */
const FQcommonArray = async (params: FQcommonArrayProps[]) => {
  try {
    const arrComms = params.map(async (param: FQcommonArrayProps) => {
      const snapshots = await dbSvc
        .collection(param.doc)
        .orderBy(param.orderBy)
        .get();
      let rows: any = [];
      snapshots.forEach((snap) => {
        const childData = snap.data();
        const id = snap.id;
        rows.push({ ...childData, key: id });
      });
      let arrReturnVal: any = {};
      arrReturnVal[param.doc] = rows;
      return arrReturnVal;
    });

    const arrCommons = await Promise.all(arrComms);

    let commonObj: any = {};
    for (let i = 0; i < arrCommons.length; i++) {
      const key = Object.keys(arrCommons[i])[0];
      commonObj[key] = arrCommons[i][key];
    }
    commonObj["category"].unshift({
      category_cd: 0,
      category_nm: "No Mapping",
      key: "0",
    });
    return commonObj;
  } catch (err) {
    console.log(err);
    return null;
  }
};

// optimized pagination
const FQsearchpage = async ({
  col,
  where,
  startPage,
  maxPage,
  lastRow,
}: any) => {
  try {
    // console.log(col, where, startPage, maxPage, lastRow);
    startPage = parseInt(startPage, 10);
    maxPage = parseInt(maxPage, 10);
    let rows: any = [];
    let dbRef: any = dbSvc.collection(col);

    // let limitOrderBy = "";
    where.forEach((field: any) => {
      const fieldKey = Object.keys(field)[0];
      if (fieldKey) {
        // if (limitOrderBy === "") {
        //   limitOrderBy = fieldKey;
        // }
        const filter =
          (Object.keys(field)[1] && field[Object.keys(field)[1]]) || "==";
        // console.log(filter);
        // console.log(fieldKey, field[fieldKey]);
        if (field[fieldKey] !== "" || filter !== "==") {
          dbRef = dbRef.where(`${fieldKey}`, filter, field[fieldKey]);
        }
      }
    });

    let snapshot;
    if (startPage === 0) {
      snapshot = await dbRef.orderBy("created_at", "desc").limit(maxPage).get(); // 1부터 들어오면 조건없이 start조건 없이 할것~!!!!
    } else {
      const lastDoc = await dbSvc.collection(col).doc(lastRow.key).get();
      const next = dbRef
        .orderBy("created_at", "desc")
        .startAfter(lastDoc)
        .limit(maxPage);
      snapshot = await next.get();
    }

    snapshot.forEach((doc: any) => {
      const childData = doc.data();
      const id = doc.id;
      rows.push({ ...childData, key: id });
    });
    return rows;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const FQsave = async ({ col, params }: any) => {
  try {
    const doc = dbSvc.collection(col).doc(); // 문서번호 자동 채번

    await doc.set({
      ...params,
    });

    // handleCudResponse(res);
  } catch (error) {
    // handleCudResponse(res, error);
  }
};

const FQupdate = async ({ col, doc, params }: any) => {
  // console.log(col, doc, params);
  doc = doc.replace(/ /g, "");
  try {
    await dbSvc
      .collection(col)
      .doc(doc)
      .set(
        {
          ...params,
        },
        { merge: true }
      );
  } catch (err) {
    console.log(err);
  }
};

interface FQdeleteProps {
  col: string;
  doc: string;
}
const FQdelete = async ({ col, doc }: FQdeleteProps) => {
  doc = doc.replace(/ /g, "");
  try {
    await dbSvc.collection(col).doc(doc).delete();
  } catch (err) {
    console.log(err);
  }
};

/**
 * Geopoint
 * @param latitude
 * @param longitude
 */
const FQGeoPoint = (latitude: string, longitude: string) => {
  if (!latitude || !longitude) {
    return null;
  } else {
    return new dbSvcProps.GeoPoint(parseFloat(latitude), parseFloat(longitude));
  }
};

/**
 * Timestamp Now
 */
const FQtimestampNow = () => dbSvcProps.Timestamp.now();

/**
 * get image url
 */
const downloadImageToStorage = async (photos: string[]) => {
  const arrPhotoUrl = photos.map(async (photo) => {
    const photoUrl = await storageSvc.ref(photo).getDownloadURL();
    return { img: photoUrl, orgImg: photo };
  });

  const arrPhoto = await Promise.all(arrPhotoUrl);
  return arrPhoto;
};

/**
 * deprecated
 * upload image files
 * @description please use uploadImageToStorage2
 */
const uploadImageToStorage = async (photos: AttachmentType[]) => {
  const arrUploadImg = photos.map(async (photo) => {
    const uuid4 = uuidv4();
    const imgUrl = `places/${uuid4}/${uuid4}_01.${photo.ext}`;
    const attachmentRef = storageSvc.ref().child(imgUrl);
    await attachmentRef.putString(photo.img, "data_url");
    console.log("uuid", uuid4)
    console.log("imgurl", imgUrl)
    return imgUrl;
  });

  const resultImgUrls = await Promise.all(arrUploadImg);
  return resultImgUrls;
};

export interface AttachmentType2 {
  collection: string;
  img: string;
  ext?: string;
  isNew?: boolean;
  orgImg?: string;
}
/**
 * new upload image files
 */
const uploadImageToStorage2 = async (photos: AttachmentType2[]) => {
  const arrUploadImg = photos.map(async (photo) => {
    const uuid4 = uuidv4();
    const imgUrl = `${photo.collection}/${uuid4}/${uuid4}.${photo.ext}`;
    const attachmentRef = storageSvc.ref().child(imgUrl);
    const response = await attachmentRef.putString(photo.img, "data_url");
    const imgDownloadUrl = await response.ref.getDownloadURL();
    return { imgUrl, imgDownloadUrl };
  });

  const resultImgUrls = await Promise.all(arrUploadImg);
  return resultImgUrls;
};

const deleteImageToStorage = async (refUrl: string) => {
  await storageSvc.refFromURL(refUrl).delete();
};

type LpadType = number | string;
function Lpad(arg: LpadType): string {
  switch (typeof arg) {
    case "number":
      if (arg < 10) {
        return `0${arg}`;
      }
      break;
    case "string":
      if (arg.length < 2) {
        return `0${arg}`;
      }
      break;
    default:
      return String(arg);
  }

  return String(arg);
}

type formatType =
  | "yyyy-MM-dd"
  | "yyyyMMdd"
  | "yyyy-MM-dd hh:mm:ss"
  | "yyyyMMddhhmmss";
function FQgetDate(oDate: any, format?: formatType) {
  format = format || "yyyy-MM-dd";
  const curDay = oDate.toDate();
  const curFullYear = String(curDay.getFullYear());
  const curMonth = Lpad(curDay.getMonth() + 1);
  const curDate = Lpad(curDay.getDate());
  const curHour = Lpad(curDay.getHours());
  const curMinutes = Lpad(curDay.getMinutes());
  const curSeconds = Lpad(curDay.getSeconds());
  switch (format) {
    case "yyyyMMdd":
      return `${curFullYear}${curMonth}${curDate}`;
    case "yyyy-MM-dd":
      return `${curFullYear}-${curMonth}-${curDate}`;
    case "yyyy-MM-dd hh:mm:ss":
      return `${curFullYear}-${curMonth}-${curDate} ${curHour}:${curMinutes}:${curSeconds}`;
    case "yyyyMMddhhmmss":
      return `${curFullYear}${curMonth}${curDate}${curHour}${curMinutes}${curSeconds}`;
  }
}

export {
  FQcheckUser,
  FQcommonArray,
  FQsearchpage,
  FQsave,
  FQupdate,
  FQdelete,
  FQGeoPoint,
  FQtimestampNow,
  downloadImageToStorage,
  uploadImageToStorage,
  uploadImageToStorage2,
  deleteImageToStorage,
  FQgetDate,
};