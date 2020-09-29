import axios from "axios";

const REQUEST_DELETE_FILE = "REQUEST_DELETE_FILE";
const SUCCESS_DELETE_FILE = "SUCCESS_DELETE_FILE";
const FAILURE_DELETED_FILE = "FAILURE_DELETED_FILE";

// action type
const requestDeleteFileAction = () => ({
  type: REQUEST_DELETE_FILE,
  payload: [],
});
const successDeleteFileAction = (filePath: []) => ({
  type: SUCCESS_DELETE_FILE,
  payload: filePath,
});
const failureDeleteFileAction = (filePath: []) => ({
  type: FAILURE_DELETED_FILE,
  payload: filePath,
});

// export const deleteFile = (files: any) => (dispatch: any) => {
//   // dispatch(requestDeleteFileAction());
//   if (files.length) {
//     files.forEach(async (file: any) => {
//       // console.log(file);
//       try {
//         const result = await axios.get("/api/fstore/deleteimage", {
//           params: { filename: file.filePath },
//         });
//         console.log(result.data.success);
//         if (result.data.success) {
//           dispatch(successDeleteFileAction(file.filePath));
//         } else {
//           dispatch(failureDeleteFileAction(file.filePath));
//         }
//       } catch (error) {
//         console.log(error);
//         dispatch(failureDeleteFileAction(file.filePath));
//       }
//     });
//   }
// };

export const deleteMultiFile = (files: []) => async (dispatch: any) => {
  // dispatch(requestDeleteFileAction());
  if (files.length) {
    try {
      const result = await axios.post("/api/fstore/deletemultiimage", {
        fileList: files,
      });

      dispatch(successDeleteFileAction(result.data.fileList));
    } catch (error) {
      console.log(error);
      dispatch(failureDeleteFileAction(files));
    }
  }
};

type actionType =
  | ReturnType<typeof requestDeleteFileAction>
  | ReturnType<typeof successDeleteFileAction>
  | ReturnType<typeof failureDeleteFileAction>;

const initState: any = {
  filePath: [],
};
// reducer
const fileDeleteReducer = (state = [], action: actionType) => {
  switch (action.type) {
    case REQUEST_DELETE_FILE:
      return [];
    case SUCCESS_DELETE_FILE:
      return [...action.payload];
    case FAILURE_DELETED_FILE:
      return [...state];
    default:
      return state;
  }
};

export default fileDeleteReducer;
