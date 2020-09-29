import axios from "axios";

const SET_UPLOAD_FILE = "SET_UPLOAD_FILE";
const SET_UPLOAD_PROGRESS = "SET_UPLOAD_PROGRESS";
const SUCCESS_UPLOAD_FILE = "SUCCESS_UPLOAD_FILE";
const FAILURE_UPLOAD_FILE = "FAILURE_UPLOAD_FILE";
const RESET_UPLOAD_FILE = "RESET_UPLOAD_FILE";

// action type
const setUploadFileAction = (data: any) => ({
  type: SET_UPLOAD_FILE,
  payload: data,
});
const setUploadProgressAction = (id: any, progress: any) => ({
  type: SET_UPLOAD_PROGRESS,
  payload: {
    id,
    progress,
  },
});
const successUploadFileAction = (id: any, result: any) => ({
  type: SUCCESS_UPLOAD_FILE,
  payload: { id, result },
});
const failureUploadFileAction = (id: any) => ({
  type: FAILURE_UPLOAD_FILE,
  payload: id,
});
const resetUploadFileAction = () => ({
  type: RESET_UPLOAD_FILE,
  payload: "",
});
export const resetUploadFile = () => {
  // console.log("reset");
  return resetUploadFileAction();
};
export const setUploadFile = (files: any) => setUploadFileAction(files);
// export const successUploadFile = (id: any) => {
//   return (dispatch: any) => dispatch(setUploadFileAction(id));
// };
// export const failureUploadFile = (id: any) => {
//   return (dispatch: any) => dispatch(setUploadFileAction(id));
// };

export const uploadFile = (files: any) => (dispatch: any) => {
  if (files.length) {
    files.forEach(async (file: any) => {
      // console.log(file);
      const formPayload = new FormData();
      formPayload.append("file", file.file);
      try {
        const result = await axios({
          url: "/api/fstore/fileupload",
          method: "post",
          data: formPayload,
          onUploadProgress: (progress) => {
            const { loaded, total } = progress;
            // console.log(loaded, total);
            const percentageProgress = Math.floor((loaded / total) * 100);
            dispatch(setUploadProgressAction(file.id, percentageProgress - 10));
          },
        });
        dispatch(setUploadProgressAction(file.id, 100));
        // console.log(result.data);
        dispatch(successUploadFileAction(file.id, result.data));
      } catch (error) {
        dispatch(failureUploadFileAction(file.id));
      }
    });
  }
};

type actionType =
  | ReturnType<typeof setUploadFileAction>
  | ReturnType<typeof setUploadProgressAction>
  | ReturnType<typeof successUploadFileAction>
  | ReturnType<typeof failureUploadFileAction>
  | ReturnType<typeof resetUploadFileAction>;

const initState: any = {
  fileProgress: {
    // format will be like below
    // 1: {  --> this interpreted as uploaded file #1
    //   id: 1,
    //   file,
    //   progress: 0,
    // },
  },
};
// reducer
const fileUploadReducer = (state = initState, action: actionType) => {
  switch (action.type) {
    case SET_UPLOAD_FILE:
      return {
        ...state,
        fileProgress: {
          ...state.fileProgress,
          ...modifyFiles(state.fileProgress, action.payload),
        },
      };
    case SET_UPLOAD_PROGRESS:
      return {
        ...state,
        fileProgress: {
          ...state.fileProgress,
          [action.payload.id]: {
            ...state.fileProgress[action.payload.id],
            progress: action.payload.progress,
          },
        },
      };

    case SUCCESS_UPLOAD_FILE:
      return {
        ...state,
        fileProgress: {
          ...state.fileProgress,
          [action.payload.id]: {
            ...state.fileProgress[action.payload.id],
            status: 1,
            ...action.payload.result,
          },
        },
      };
    case FAILURE_UPLOAD_FILE:
      return {
        ...state,
        fileProgress: {
          ...state.fileProgress,
          [action.payload]: {
            ...state.fileProgress[action.payload],
            status: 0,
            progress: 0,
          },
        },
      };
    case RESET_UPLOAD_FILE:
      return {
        fileProgress: {},
      };
    default:
      return state;
  }
};

const modifyFiles = (existingFiles: any, files: any) => {
  let fileToUpload = {};
  for (let i = 0; i < files.length; i++) {
    // console.log(files);
    const nLen = Object.keys(existingFiles).length;
    const id = nLen + i + 1;
    fileToUpload = {
      ...fileToUpload,
      [id]: {
        id,
        file: files[i],
        progress: 0,
      },
    };
  }
  return fileToUpload;
};

export default fileUploadReducer;
