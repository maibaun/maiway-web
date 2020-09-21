const IS_LOGGENIN = "IS_LOGGENID" as const;

export type loginProps = boolean | null;

const isLoginnendAction = (data: loginProps) => ({
  type: IS_LOGGENIN,
  payload: data,
});

type actionType = ReturnType<typeof isLoginnendAction>;
// action
export const setLoginnedIn = (data: loginProps) => {
  return isLoginnendAction(data);
};

const initState: loginProps = false;
// reducer
const loginReducer = (state = initState, action: actionType) => {
  switch (action.type) {
    case IS_LOGGENIN:
      return action.payload;

    default:
      return state;
  }
};

export default loginReducer;
