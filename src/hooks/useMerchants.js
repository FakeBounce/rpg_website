import { useDispatch } from 'react-redux';
import {
  SET_IS_ITEM_SHOWED,
  SET_CURRENT_MERCHANT,
  SET_CURRENT_MERCHANT_ITEM,
  ENHANCE_WEAPON
} from '../redux/actionsTypes/actionsTypesMerchants';

const useMerchants = () => {
  const dispatch = useDispatch();

  const setIsItemShowed = bool => {
    dispatch({ type: SET_IS_ITEM_SHOWED, payload: bool });
  };

  const setCurrentMerchant = index => {
    dispatch({ type: SET_CURRENT_MERCHANT, payload: index });
  };

  const setCurrentMerchantItem = index => {
    dispatch({ type: SET_CURRENT_MERCHANT_ITEM, payload: index });
  };

  const enhanceWeapons = (enhancePrice, weaponsTab, itemsTab, merchantList) => {
    dispatch({
      type: ENHANCE_WEAPON,
      payload: { enhancePrice, weaponsTab, itemsTab, merchantList },
    });
  };

  return {
    setIsItemShowed,
    setCurrentMerchant,
    setCurrentMerchantItem,
    enhanceWeapons,
  };
};

export default useMerchants;
