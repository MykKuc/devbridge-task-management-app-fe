import { combineReducers } from '@reduxjs/toolkit';
import { taskStateReducer } from './taskState';

export const allReducers = combineReducers({
  task: taskStateReducer,
});

export default allReducers;
