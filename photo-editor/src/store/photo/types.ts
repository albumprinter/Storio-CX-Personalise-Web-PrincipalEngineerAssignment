// Photo model types

// Photo filter enum
export enum PhotoFilter {
  SEPIA = 'sepia',
  BLACK_AND_WHITE = 'black_and_white'
}

// Photo model interface
export interface Photo {
  dimensions: {
    width: number;
    height: number;
  };
  source: string; // Relative path to the image
  rotation: number;
  filters: PhotoFilter[]; // Array of filters to apply to the photo
}

// Initial state interface
export interface PhotoState {
  photo: Photo | null;
}

// Action types
export const RESET_ROTATION = 'photo/RESET_ROTATION';
export const ROTATE_PHOTO = 'photo/ROTATE_PHOTO';
export const PAN_ZOOM_PHOTO = 'photo/PAN_ZOOM_PHOTO';
export const SET_PHOTO = 'photo/SET_PHOTO';
export const ADD_FILTER = 'photo/ADD_FILTER';
export const REMOVE_FILTER = 'photo/REMOVE_FILTER';
export const LOAD_SAVED_PHOTO = 'photo/LOAD_SAVED_PHOTO';
export const LOAD_SAVED_PHOTO_SUCCESS = 'photo/LOAD_SAVED_PHOTO_SUCCESS';

// Action interfaces
export interface ResetRotationAction {
  type: typeof RESET_ROTATION;
  [key: string]: any;
}

export interface RotatePhotoAction {
  type: typeof ROTATE_PHOTO;
  payload: {
    rotation: number;
  };
  [key: string]: any;
}

export interface PanZoomPhotoAction {
  type: typeof PAN_ZOOM_PHOTO;
  payload: {
    dimensions: {
      width: number;
      height: number;
    };
  };
  [key: string]: any;
}

export interface SetPhotoAction {
  type: typeof SET_PHOTO;
  payload: Photo;
  meta?: {
    recordInHistory: boolean;
  };
  [key: string]: any;
}

export interface AddFilterAction {
  type: typeof ADD_FILTER;
  filter: PhotoFilter;
  [key: string]: any;
}

export interface RemoveFilterAction {
  type: typeof REMOVE_FILTER;
  payload: {
    filter: PhotoFilter;
  };
  [key: string]: any;
}

export interface LoadSavedPhotoAction {
  type: typeof LOAD_SAVED_PHOTO;
  [key: string]: any;
}

export interface LoadSavedPhotoSuccessAction {
  type: typeof LOAD_SAVED_PHOTO_SUCCESS;
  payload: Photo;
  [key: string]: any;
}

// Union of all photo action types
export type PhotoActionTypes = 
  | ResetRotationAction 
  | RotatePhotoAction 
  | PanZoomPhotoAction
  | SetPhotoAction
  | AddFilterAction
  | RemoveFilterAction
  | LoadSavedPhotoAction
  | LoadSavedPhotoSuccessAction;
