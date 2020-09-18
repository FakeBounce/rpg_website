import React from 'react';
import './Merchant.css';
import PropTypes from 'prop-types';
import useMerchants from '../../hooks/useMerchants';
import { useSelector } from 'react-redux';

const Merchant = ({
  index,
  name,
  isDiscovered,
  items,
  icon,
  job,
  description,
}) => {
  const { setIsItemShowed, setCurrentMerchant } = useMerchants();
  const { currentMerchant } = useSelector(store => ({
    currentMerchant: store.merchants.currentMerchant,
  }));

  const showItems = index => {
    setIsItemShowed(true);
    setCurrentMerchant(index);
  };

  return (
    <div
      className={`merchant ${
        currentMerchant === index ? 'merchant-is-selected' : ''
      }`}
      onClick={isDiscovered ? () => showItems(items, index) : () => {}}
    >
      <img
        src={
          isDiscovered
            ? './merchants/' + icon
            : './common/unknown_image_white.png'
        }
        alt={description}
        className='merchant-icon'
      />
      <div className='merchant-text'>
        {isDiscovered ? name + ' (' + job + ')' : '???'}
      </div>
      <div className='merchant-text'>{description}</div>
    </div>
  );
};

Merchant.defaultProps = {
  isDiscovered: false,
  description: '',
};

Merchant.propTypes = {
  index: PropTypes.number.isRequired,
  isDiscovered: PropTypes.bool,
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  job: PropTypes.string.isRequired,
  description: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Merchant;
