import { 
  resetRotation,
  rotatePhoto,
  panZoomPhoto,
  setPhoto,
  addFilter,
  removeFilter,
  loadSavedPhoto,
  loadSavedPhotoSuccess
} from '../store/photo/actions';

import {
  RESET_ROTATION,
  ROTATE_PHOTO,
  PAN_ZOOM_PHOTO,
  SET_PHOTO,
  ADD_FILTER,
  REMOVE_FILTER,
  LOAD_SAVED_PHOTO,
  LOAD_SAVED_PHOTO_SUCCESS,
  PhotoFilter
} from '../store/photo/types';

describe('Photo Actions', () => {
  it('should create a reset rotation action', () => {
    const expectedAction = {
      type: RESET_ROTATION
    };
    
    expect(resetRotation()).toEqual(expectedAction);
  });

  it('should create a rotate photo action', () => {
    const rotation = 90;
    const expectedAction = {
      type: ROTATE_PHOTO,
      payload: { rotation }
    };
    
    expect(rotatePhoto(rotation)).toEqual(expectedAction);
  });

  it('should create a pan zoom photo action', () => {
    const width = 800;
    const height = 600;
    const expectedAction = {
      type: PAN_ZOOM_PHOTO,
      payload: {
        dimensions: { width, height }
      }
    };
    
    expect(panZoomPhoto(width, height)).toEqual(expectedAction);
  });

  it('should create a set photo action with record in history by default', () => {
    const photo = {
      dimensions: { width: 800, height: 600 },
      source: 'data:image/png;base64,...',
      rotation: 0,
      filters: []
    };
    
    const expectedAction = {
      type: SET_PHOTO,
      payload: photo,
      meta: {
        recordInHistory: true
      }
    };
    
    expect(setPhoto(photo)).toEqual(expectedAction);
  });

  it('should create a set photo action with record in history false when specified', () => {
    const photo = {
      dimensions: { width: 800, height: 600 },
      source: 'data:image/png;base64,...',
      rotation: 0,
      filters: []
    };
    
    const expectedAction = {
      type: SET_PHOTO,
      payload: photo,
      meta: {
        recordInHistory: false
      }
    };
    
    expect(setPhoto(photo, false)).toEqual(expectedAction);
  });

  it('should create an add filter action', () => {
    const filter = PhotoFilter.SEPIA;
    const expectedAction = {
      type: ADD_FILTER,
      payload: { filter }
    };
    
    expect(addFilter(filter)).toEqual(expectedAction);
  });

  it('should create a remove filter action', () => {
    const filter = PhotoFilter.BLACK_AND_WHITE;
    const expectedAction = {
      type: REMOVE_FILTER,
      payload: { filter }
    };
    
    expect(removeFilter(filter)).toEqual(expectedAction);
  });

  it('should create a load saved photo action', () => {
    const expectedAction = {
      type: LOAD_SAVED_PHOTO
    };
    
    expect(loadSavedPhoto()).toEqual(expectedAction);
  });

  it('should create a load saved photo success action', () => {
    const photo = {
      dimensions: { width: 800, height: 600 },
      source: 'data:image/png;base64,...',
      rotation: 0,
      filters: []
    };
    
    const expectedAction = {
      type: LOAD_SAVED_PHOTO_SUCCESS,
      payload: photo
    };
    
    expect(loadSavedPhotoSuccess(photo)).toEqual(expectedAction);
  });
});