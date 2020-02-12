import { SET_USER_PSEUDO, SET_UID } from "../actionsTypes/actionsTypesUserInfos";

const initialState = {
  pseudo: "",
  uid: "",
};

const userInfos = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_PSEUDO: {
      return {
        ...state,
        pseudo: action.payload,
      };
    }
    case SET_UID: {
      return {
        ...state,
        uid: action.payload,
      };
    }
    default:
      return state;
  }
};

export default userInfos;
