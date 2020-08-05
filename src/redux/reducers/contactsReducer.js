import {createReducer} from '@reduxjs/toolkit';

import {addName, deleteContact, changeFilter} from '../actions/index';

const onAddName = (state, action) => [...state, action.payload.contact];

const onDeleteContact = (state, action) => {
  return state.filter(contact => contact.id !== action.payload);
};

const onChangeFilter = (state, action) => {
  return action.payload;
};

export const items = createReducer([], {
  [addName]: onAddName,
  [deleteContact]: onDeleteContact,
});

export const filter = createReducer('', {
  [changeFilter]: onChangeFilter,
});
