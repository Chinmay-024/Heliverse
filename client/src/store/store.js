// store.js
import { createStore } from "redux";

// Initial state
const initialState = {
  selectedUsers: [], // Array to store selected users for the team
};

// Reducer function
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER_TO_TEAM":
      return {
        ...state,
        selectedUsers: [...state.selectedUsers, action.payload],
      };
    case "REMOVE_USER_FROM_TEAM":
      return {
        ...state,
        selectedUsers: state.selectedUsers.filter(
          (user) => user._id !== action.payload
        ),
      };
    case "CLEAR_SELECTED_USERS":
      return {
        ...state,
        selectedUsers: [],
      };
    default:
      return state;
  }
};

// Create the Redux store
const store = createStore(rootReducer);

export default store;
