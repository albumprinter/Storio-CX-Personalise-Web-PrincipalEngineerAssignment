import { takeLatest, debounce, put, select, call } from 'redux-saga/effects';
import {
  SET_PHOTO,
  RESET_ROTATION,
  ROTATE_PHOTO,
  PAN_ZOOM_PHOTO,
  ADD_FILTER,
  REMOVE_FILTER,
  LOAD_SAVED_PHOTO,
  Photo
} from './types';
import { selectPhoto } from './selectors';
import { loadSavedPhotoSuccess } from './actions';
import { clearHistory } from '../history/actions';

const STORAGE_KEY = 'photo_editor_state';
const IMAGE_STORAGE_KEY = 'photo_editor_image';
const DEBOUNCE_TIME = 1000;
const MAX_LOCAL_STORAGE_SIZE = 5 * 1024 * 1024;

const getFromLocalStorage = (key: string): string | null => {
  return localStorage.getItem(key);
};

const setInLocalStorage = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.error(`Error storing data in localStorage (key: ${key}):`, e);
    throw e;
  }
};

const removeFromLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};

const willFitInLocalStorage = (str: string): boolean => {
  const estimatedSize = str.length * 2;
  return estimatedSize < MAX_LOCAL_STORAGE_SIZE;
};

function* savePhotoState(action: any) {
  try {
    // If setting a new photo, clear the history
    if (action.type === SET_PHOTO && (!action.meta || action.meta.recordInHistory)) {
      console.log('Clearing history due to new photo');
      yield put(clearHistory());
    }
    
    const photo: Photo | null = yield select(selectPhoto);
    
    if (photo) {
      if (photo.source) {
        if (willFitInLocalStorage(photo.source)) {
          yield call(setInLocalStorage, IMAGE_STORAGE_KEY, photo.source);
        } else {
          console.warn('Image is too large for localStorage. Only saving settings.');
        }
      }
      
      const storablePhoto = { 
        ...photo,
        source: 'has_stored_image'
      };
      
      yield call(setInLocalStorage, STORAGE_KEY, JSON.stringify(storablePhoto));
      console.log('Photo state and image saved to localStorage');
    } else {
      yield call(removeFromLocalStorage, STORAGE_KEY);
      yield call(removeFromLocalStorage, IMAGE_STORAGE_KEY);
      console.log('Photo state removed from localStorage');
    }
  } catch (error) {
    console.error('Error saving photo state to localStorage:', error);
  }
}

function* loadSavedPhotoState() {
  try {
    const savedPhotoJson: string | null = yield call(getFromLocalStorage, STORAGE_KEY);
    
    if (savedPhotoJson) {
      const savedPhoto: Photo = JSON.parse(savedPhotoJson);
      
      const imageSource: string | null = yield call(getFromLocalStorage, IMAGE_STORAGE_KEY);
      
      if (imageSource) {
        const img = new Image();
        img.src = imageSource;
        
        const imageLoads = new Promise<boolean>((resolve, reject) => {
          img.onload = () => resolve(true);
          img.onerror = () => reject(new Error('Failed to load saved image'));
        });
        
        try {
          yield call(() => imageLoads);
          
          savedPhoto.source = imageSource;
          
          yield put(loadSavedPhotoSuccess(savedPhoto));
          console.log('Successfully restored saved photo with image');
        } catch (imgError) {
          console.error('Error loading saved image:', imgError);
          alert('Found saved photo settings, but the image could not be loaded. Please upload a new image.');
          throw new Error('Failed to load image from storage');
        }
      } else {
        alert('Found saved photo settings! Please upload an image to apply them.');
        console.log('Found saved photo settings in localStorage but no valid image source');
      }
    } else {
      console.log('No saved photo found in localStorage');
    }
  } catch (error) {
    console.error('Error loading photo state from localStorage:', error);
    alert('An error occurred while loading your saved photo');
  }
}

function* watchPhotoChanges() {
  yield takeLatest(SET_PHOTO, savePhotoState);
  
  yield debounce(DEBOUNCE_TIME, [
    RESET_ROTATION,
    ROTATE_PHOTO,
    PAN_ZOOM_PHOTO,
    ADD_FILTER,
    REMOVE_FILTER
  ], savePhotoState);
  
  yield takeLatest(LOAD_SAVED_PHOTO, loadSavedPhotoState);
}

export default function* photoSagas() {
  yield watchPhotoChanges();
}
