import axios from "axios";

const COMMON_LOADING = "COMMON_LOADING";
const COMMON_SEARCH = "COMMON_SEARCH";
const COMMON_FAIL = "COMMON_FAIL";

// action type
const loadingAction = () => ({
  type: COMMON_LOADING,
  payload: "",
});

const searchAction = (data: any) => ({
  type: COMMON_SEARCH,
  payload: data,
});
const failAction = () => ({
  type: COMMON_FAIL,
  payload: "",
});

type actionType =
  | ReturnType<typeof loadingAction>
  | ReturnType<typeof searchAction>
  | ReturnType<typeof failAction>;

// action
export const commonRequest = (params: any) => {
  return async (dispatch: any) => {
    dispatch(loadingAction());
    try {
      const result = await axios.get("/api/fstore/common", {
        params,
      });
      // console.log("abc", result.data);
      dispatch(searchAction(result.data));
    } catch (e) {
      dispatch(failAction());
    }
  };
};

export interface StateProps {
  status: string;
  comRowData?: any;
}

const initState: StateProps = {
  status: "",
  comRowData: null,
};
// reducer
const fsCommonReducer = (state = initState, action: actionType) => {
  switch (action.type) {
    case COMMON_LOADING:
      return { status: "WAITING" };
    case COMMON_SEARCH:
      return {
        status: "SUCCESS",
        comRowData: action.payload,
      };
    case COMMON_FAIL:
      return {
        status: "FAILURE",
      };
    default:
      return state;
  }
};

export default fsCommonReducer;
