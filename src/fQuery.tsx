import { dbSvc } from "./fBase";

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

const FQsearchpage = async ({ col, where, startPage, maxPage }: any) => {
  try {
    // console.log(col, where, startPage, maxPage);
    startPage = parseInt(startPage, 10);
    maxPage = parseInt(maxPage, 10);
    let rows: any = [];
    let dbRef: any = dbSvc.collection(col);

    // let limitOrderBy = "";
    where.forEach((field: any) => {
      const fieldKey = Object.keys(field)[0];
      if (field[fieldKey] !== "") {
        // if (limitOrderBy === "") {
        //   limitOrderBy = fieldKey;
        // }
        // const filter =
        //   (Object.keys(field)[1] && field[Object.keys(field)[1]]) || "==";
        // console.log(filter);
        // console.log(fieldKey, field[fieldKey]);
        dbRef = dbRef.where(`${fieldKey}`, "==", field[fieldKey]);
      }
    });

    const total = await dbRef.get();
    const totalCount = total.size;

    let snapshot;

    if (startPage === 1) {
      snapshot = await dbRef.limit(maxPage).get(); // 1부터 들어오면 조건없이 start조건 없이 할것~!!!!
    } else {
      const first = dbRef.limit(startPage - 1);
      const firstSnapshot = await first.get();
      const last = firstSnapshot.docs[firstSnapshot.docs.length - 1];
      // const last = firstSnapshot[firstSnapshot.length - 1].doc;
      // console.log(limitOrderBy);
      // const next = dbRef.startAfter(last.data()[limitOrderBy]).limit(maxPage);
      const next = dbRef.startAfter(last).limit(maxPage);
      snapshot = await next.get();
    }

    snapshot.forEach((doc: any) => {
      const childData = doc.data();
      const id = doc.id;
      rows.push({ ...childData, key: id, totalCount });
    });
    return rows;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const FQupdate = async ({ col, doc, params }: any) => {
  console.log(col, doc, params);
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
export { FQcheckUser, FQcommonArray, FQsearchpage, FQupdate };
