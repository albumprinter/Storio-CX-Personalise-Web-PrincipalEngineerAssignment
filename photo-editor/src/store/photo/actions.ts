import { 
  RESET_ROTATION, 
  ROTATE_PHOTO, 
  PAN_ZOOM_PHOTO, 
  SET_PHOTO,
  ADD_FILTER,
  REMOVE_FILTER,
  LOAD_SAVED_PHOTO,
  LOAD_SAVED_PHOTO_SUCCESS,
  Photo,
  PhotoFilter,
  ResetRotationAction,
  RotatePhotoAction,
  PanZoomPhotoAction,
  SetPhotoAction,
  AddFilterAction,
  RemoveFilterAction,
  LoadSavedPhotoAction,
  LoadSavedPhotoSuccessAction
} from './types';

// Action creators
export const resetRotation = (): ResetRotationAction => ({
  type: RESET_ROTATION
});

export const rotatePhoto = (rotation: number): RotatePhotoAction => ({
  type: ROTATE_PHOTO,
  payload: {
    rotation
  }
});

export const panZoomPhoto = (width: number, height: number): PanZoomPhotoAction => ({
  type: PAN_ZOOM_PHOTO,
  payload: {
    dimensions: {
      width,
      height
    }
  }
});

export const setPhoto = (photo: Photo, recordInHistory: boolean = true): SetPhotoAction => ({
  type: SET_PHOTO,
  payload: photo,
  meta: {
    recordInHistory
  }
});

export const addFilter = (filter: PhotoFilter): AddFilterAction => ({
  type: ADD_FILTER,
  payload: {
    filter
  }
});

export const removeFilter = (filter: PhotoFilter): RemoveFilterAction => ({
  type: REMOVE_FILTER,
  payload: {
    filter
  }
});

export const loadSavedPhoto = (): LoadSavedPhotoAction => ({
  type: LOAD_SAVED_PHOTO
});

export const loadSavedPhotoSuccess = (photo: Photo): LoadSavedPhotoSuccessAction => ({
  type: LOAD_SAVED_PHOTO_SUCCESS,
  payload: photo
});
