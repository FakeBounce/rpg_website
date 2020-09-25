import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import EventItem from './EventItem';
import { sortAlphabetical } from '../Utils/Functions';
import SelectMapper from '../Utils/SelectMapper';
import { itemEventTypes } from '../Utils/Constants';
import { useSelector } from 'react-redux';
import { Input } from 'semantic-ui-react';
import { useEventContext } from '../../contexts/eventContext';

const styledItemList = {
  width: '100%',
  height: 210,
  display: 'inline-block',
  float: 'left',
  position: 'relative',
  overflowY: 'auto',
};

const styledEventItemFormInputsContainer = {
  marginTop: 10,
  marginBottom: 10,
  paddingLeft: 10,
  paddingRight: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const EventItemForm = () => {
  const [orderedItems, setOrderedItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [filterType, setFilterType] = useState('');

  const {
    descriptionEvent,
    setDescriptionEvent,
    quantityEvent,
    setQuantityEvent,
    itemEvent,
    setItemEvent,
  } = useEventContext();

  const { items } = useSelector(store => ({
    items: store.items.items,
  }));

  useEffect(() => {
    const newFilteredItems = [];
    Object.keys(items).map(ikey => {
      if (ikey !== 'runes' && ikey !== 'enhancements') {
        Object.keys(items[ikey]).map(key => {
          return newFilteredItems.push({
            ...items[ikey][key],
            itemType: ikey,
          });
        });
      }
      return null;
    });

    sortAlphabetical(newFilteredItems);
    setFilteredItems(newFilteredItems);
    setOrderedItems([...newFilteredItems]);
  }, []);

  useEffect(() => {
    if (orderedItems.length > 0) {
      const tempFilter = [];
      orderedItems.map(item => {
        if (
          item.name.indexOf(filterText) !== -1 &&
          ((filterType !== '' && item.itemType === filterType) ||
            filterType === '')
        ) {
          tempFilter.push(item);
        }
        return null;
      });
      setFilteredItems([...tempFilter]);
    }
  }, [filteredItems, filterType, filterText]);

  return (
    <div>
      <div>
        Filter :
        <Input
          type='text'
          value={filterText}
          name='filterText'
          placeholder={'Name to filter'}
          onChange={e => {
            setFilterText(e.target.value);
          }}
        />
        <SelectMapper
          mapArray={itemEventTypes}
          value={filterType}
          onChange={setFilterType}
        />
      </div>
      <div style={styledItemList} className='scrollbar'>
        {filteredItems.map(i => {
          return (
            <EventItem
              key={`event-item-${i.itemType}-${i.name}-${i.type}`}
              itemEvent={itemEvent}
              setItemEvent={setItemEvent}
              i={{
                ...i,
                name:
                  i.itemType === 'spells'
                    ? i.name + ' (' + i.type + ')'
                    : i.name,
              }}
              ikey={i.itemType}
            />
          );
        })}
      </div>
      <div style={styledEventItemFormInputsContainer}>
        <Input
          type='number'
          value={quantityEvent}
          name='quantityEvent'
          onChange={e => {
            setQuantityEvent(e.target.value);
          }}
          style={{ maxWidth: '40%' }}
        />
        <Input
          type='text'
          value={descriptionEvent}
          name='descriptionEvent'
          onChange={e => {
            setDescriptionEvent(e.target.value);
          }}
          placeholder='Event description'
          style={{ maxWidth: '50%' }}
        />
      </div>
    </div>
  );
};

EventItemForm.propTypes = {
  descriptionEvent: PropTypes.string.isRequired,
  quantityEvent: PropTypes.number.isRequired,
  itemEvent: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EventItemForm;
