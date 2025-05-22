import { 
  PhotoState, 
  PhotoActionTypes,
  RESET_ROTATION,
  ROTATE_PHOTO,
  PAN_ZOOM_PHOTO,
  SET_PHOTO
} from './types';

// Initial state
const initialState: PhotoState = {
  photo: null
};

// Reducer
const photoReducer = (
  state = initialState,
  action: PhotoActionTypes
): PhotoState => {
  switch (action.type) {
    case SET_PHOTO:
      return {
        ...state,
        photo: action.payload
      };
      
    case RESET_ROTATION:
      if (!state.photo) return state;
      return {
        ...state,
        photo: {
          ...state.photo,
          rotation: 0
        }
      };
      
    case ROTATE_PHOTO:
      if (!state.photo) return state;
      return {
        ...state,
        photo: {
          ...state.photo,
          rotation: action.payload.rotation
        }
      };
      
    case PAN_ZOOM_PHOTO:
      if (!state.photo) return state;
      return {
        ...state,
        photo: {
          ...state.photo,
          dimensions: action.payload.dimensions
        }
      };
      
    default:
      return state;
  }
};

export default photoReducer;
