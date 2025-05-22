import { 
  RESET_ROTATION, 
  ROTATE_PHOTO, 
  PAN_ZOOM_PHOTO, 
  SET_PHOTO,
  Photo,
  ResetRotationAction,
  RotatePhotoAction,
  PanZoomPhotoAction,
  SetPhotoAction
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

export const setPhoto = (photo: Photo): SetPhotoAction => ({
  type: SET_PHOTO,
  payload: photo
});
