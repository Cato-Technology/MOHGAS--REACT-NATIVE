import { HIDE_LOADER, SHOW_LOADER } from './constants';

const INITIAL_STATE = {
  loading: false,
  eventData: [],
  eventError: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_LOADER:
      return {
        ...state,
        loading: true,
      };
    case HIDE_LOADER:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
