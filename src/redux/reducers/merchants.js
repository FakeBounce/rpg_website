import { SET_MERCHANT_LIST } from "../actionsTypes/actionsTypesMerchants";
import { RESET_APP } from "../actionsTypes/actionsTypesAppState";

const initialState = {
  merchantList: [],
};

const merchants = (state = initialState, action) => {
  switch (action.type) {
    case SET_MERCHANT_LIST: {
      return {
        ...state,
        merchantList: action.payload,
      };
    }
    case RESET_APP: {
      return initialState;
    }
    default:
      return state;
  }
};

export default merchants;
