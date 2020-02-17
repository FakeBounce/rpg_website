import * as actionsTypesMerchants from "../actionsTypes/actionsTypesMerchants";

export const setMerchantList = payload => {
  return {
    type: actionsTypesMerchants.SET_MERCHANT_LIST,
    payload,
  };
};
