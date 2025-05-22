// Photo model types

// Photo model interface
export interface Photo {
  dimensions: {
    width: number;
    height: number;
  };
  source: string; // Relative path to the image
  rotation: number;
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

// Action interfaces
export interface ResetRotationAction {
  type: typeof RESET_ROTATION;
}

export interface RotatePhotoAction {
  type: typeof ROTATE_PHOTO;
  payload: {
    rotation: number;
  };
}

export interface PanZoomPhotoAction {
  type: typeof PAN_ZOOM_PHOTO;
  payload: {
    dimensions: {
      width: number;
      height: number;
    };
  };
}

export interface SetPhotoAction {
  type: typeof SET_PHOTO;
  payload: Photo;
}

// Union of all photo action types
export type PhotoActionTypes = 
  | ResetRotationAction 
  | RotatePhotoAction 
  | PanZoomPhotoAction
  | SetPhotoAction;
