import { SET_USER_PSEUDO } from "../actionsTypes/actionsTypesUserInfos";

const initialState = {
  pseudo: "",
};

const userInfos = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_PSEUDO: {
      return {
        ...state,
        pseudo: action.payload,
      };
    }
    default:
      return state;
  }
};

export default userInfos;
