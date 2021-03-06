import * as actionsTypesMerchants from '../actionsTypes/actionsTypesMerchants';

export const setMerchantList = payload => {
  return {
    type: actionsTypesMerchants.SET_MERCHANT_LIST,
    payload,
  };
};

export const setCurrentMerchant = payload => {
  return {
    type: actionsTypesMerchants.SET_CURRENT_MERCHANT,
    payload,
  };
};
