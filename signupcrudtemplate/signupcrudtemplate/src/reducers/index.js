
import { combineReducers } from 'redux';

const dummy = () => '';

const initial = {
  data: [],
  editStudent: {},
  viewStudent: {},
  userLoggedIn: JSON.parse(sessionStorage.getItem('user')),
};
const postReducer = (state = initial, action) => {
  switch (action.type) {
    case 'GET_STUDENT_DATA':
      return { ...state, data: action.payload };
    case 'EDIT_STUDENT_DATA':
      return { ...state, editStudent: action.payload };
    case 'VIEW_STUDENT_DATA':
      return { ...state, viewStudent: action.payload };
    case 'LOGIN':
      return { ...state, userLoggedIn: action.payload };
    default:
      return state;
  }
};
export default combineReducers({ dummy, postReducer });
