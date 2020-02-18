import { SET_MERCHANT_LIST, SET_CURRENT_MERCHANT } from "../actionsTypes/actionsTypesMerchants";
import { RESET_APP } from "../actionsTypes/actionsTypesAppState";

const initialState = {
  merchantList: [],
  currentMerchant: -1
};

const merchants = (state = initialState, action) => {
  switch (action.type) {
    case SET_MERCHANT_LIST: {
      return {
        ...state,
        merchantList: action.payload,
      };
    }
    case SET_CURRENT_MERCHANT: {
      return {
        ...state,
        currentMerchant: action.payload,
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
