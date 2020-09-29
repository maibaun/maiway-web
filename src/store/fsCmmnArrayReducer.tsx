import { FQcommonArray } from "../fQuery";

const CMMN_ARRAY_LOADING = "CMMN_ARRAY_LOADING" as const;
const CMMN_ARRAY_SEARCH = "CMMN_ARRAY_SEARCH" as const;
const CMMN_ARRAY_FAILED = "CMMN_ARRAY_FAILED" as const;

const loadingCmmnArrayAction = () => ({
  type: CMMN_ARRAY_LOADING,
  payload: "",
});

const searchCmmArrayAction = (data: any) => ({
  type: CMMN_ARRAY_SEARCH,
  payload: data,
});

const failedCmmArrayAction = () => ({
  type: CMMN_ARRAY_FAILED,
  payload: "",
});

export type actionType =
  | ReturnType<typeof loadingCmmnArrayAction>
  | ReturnType<typeof searchCmmArrayAction>
  | ReturnType<typeof failedCmmArrayAction>;

// search action
export const searchCmmnArrayRequest = (params: any) => {
  return async (dispatch: any) => {
    dispatch(loadingCmmnArrayAction());
    try {
      const result = await FQcommonArray(params);
      dispatch(searchCmmArrayAction(result));
    } catch (e) {
      dispatch(failedCmmArrayAction());
    }
  };
};

export interface StateProps {
  status: string;
  rowData?: any;
}

const initState: StateProps = {
  status: "",
  rowData: null,
};

// reducer
const fsCmmnArrayReducer = (state = initState, action: actionType) => {
  switch (action.type) {
    case CMMN_ARRAY_LOADING:
      return { status: "WAITING" };
    case CMMN_ARRAY_SEARCH:
      return {
        status: "SUCCESS",
        rowData: action.payload,
      };
    case CMMN_ARRAY_FAILED:
      return {
        status: "FAILURE",
      };
    default:
      return state;
  }
};

export default fsCmmnArrayReducer;
