import {
  SET_MERCHANT_LIST,
  SET_CURRENT_MERCHANT,
  SET_IS_ITEM_SHOWED,
  SET_CURRENT_MERCHANT_ITEM,
  SET_ITEM_DESCRIBED,
  SET_ITEM_DESCRIPTION_SHOWED,
} from '../actionsTypes/actionsTypesMerchants';
import { RESET_APP } from '../actionsTypes/actionsTypesAppState';

const initialState = {
  merchantList: [],
  currentMerchant: -1,
  isItemShowed: false,
  currentItem: -1,
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
    case SET_CURRENT_MERCHANT_ITEM: {
      return {
        ...state,
        currentItem: action.payload,
      };
    }
    case SET_IS_ITEM_SHOWED: {
      return {
        ...state,
        currentMerchant: action.payload,
      };
    }
    case SET_ITEM_DESCRIPTION_SHOWED: {
      return {
        ...state,
        isItemDescriptionShowed: action.payload,
      };
    }
    case SET_ITEM_DESCRIBED: {
      return {
        ...state,
        itemDescribed: action.payload,
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
