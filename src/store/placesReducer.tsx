import axios from "axios";
import { FQsearchpage } from "../fQuery";

const LOADING_PAGE = "LOADING_PAGE";
const SEARCH_PAGE = "SEARCH_PAGE";
const UPDATE_PAGE = "UPDATE_PAGE";
const FAIL_PAGE = "FAIL_PAGE";

// const queryAction = <T extends {}>(data: T) => ({
//   type: QUERY,
//   payload: data,
// });
// action type
const loadingPageAction = () => ({
  type: LOADING_PAGE,
  payload: "",
});

const searchPageAction = (data: any) => ({
  type: SEARCH_PAGE,
  payload: data,
});
const updatePageAction = (data: any) => ({
  type: UPDATE_PAGE,
  payload: data,
});

const failPageAction = () => ({
  type: FAIL_PAGE,
  payload: "",
});

export type actionType =
  | ReturnType<typeof loadingPageAction>
  | ReturnType<typeof searchPageAction>
  | ReturnType<typeof updatePageAction>
  | ReturnType<typeof failPageAction>;

// search action
export const searchPageRequest = (params: any) => {
  return async (dispatch: any) => {
    dispatch(loadingPageAction());
    try {
      // const result = await axios.get("/api/fstore/searchpage", {
      //   params,
      // });
      const result = await FQsearchpage(params);
      dispatch(searchPageAction(result));
    } catch (e) {
      dispatch(failPageAction());
    }
  };
};

export const updatePage = (params: any) => {
  return (dispatch: any) => {
    dispatch(updatePageAction(params));
  };
};

export interface StateProps {
  status: string;
  rowData?: any;
  comRowData?: any;
}

const initState: StateProps = {
  status: "",
  rowData: null,
  comRowData: null,
};

// reducer
const placesReducer = (state = initState, action: actionType) => {
  switch (action.type) {
    case LOADING_PAGE:
      return { status: "WAITING" };
    case SEARCH_PAGE:
      return {
        status: "SUCCESS",
        rowData: action.payload,
      };
    case UPDATE_PAGE:
      return {
        status: "SUCCESS",
        rowData: {
          data: state.rowData?.data.map((row: any) => {
            let newRow = {};
            if (row.key === action.payload.key) {
              // console.log("row.key");
              newRow = { ...row, ...action.payload };
            } else {
              newRow = { ...row };
            }
            return newRow;
          }),
        },
      };
    case FAIL_PAGE:
      return {
        status: "FAILURE",
      };
    default:
      return state;
  }
};

export default placesReducer;
