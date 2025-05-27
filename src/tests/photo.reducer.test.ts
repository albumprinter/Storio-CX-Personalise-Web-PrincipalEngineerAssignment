import photoReducer from '../store/photo/reducer';
import { 
  resetRotation, 
  rotatePhoto, 
  panZoomPhoto, 
  setPhoto,
  addFilter,
  removeFilter,
  loadSavedPhotoSuccess
} from '../store/photo/actions';
import { PhotoFilter, PhotoState } from '../store/photo/types';

describe('Photo Reducer', () => {
  const initialState: PhotoState = {
    photo: null
  };

  const samplePhoto = {
    dimensions: {
      width: 500,
      height: 300
    },
    source: 'data:image/png;base64,...',
    rotation: 0,
    filters: [] as PhotoFilter[]
  };

  it('should return the initial state', () => {
    expect(photoReducer(undefined, { type: 'UNKNOWN' } as any)).toEqual(initialState);
  });

  it('should handle SET_PHOTO', () => {
    expect(
      photoReducer(initialState, setPhoto(samplePhoto))
    ).toEqual({
      photo: samplePhoto
    });
  });

  it('should handle RESET_ROTATION when photo exists', () => {
    const stateWithPhoto: PhotoState = {
      photo: {
        ...samplePhoto,
        rotation: 90
      }
    };

    expect(
      photoReducer(stateWithPhoto, resetRotation())
    ).toEqual({
      photo: {
        ...samplePhoto,
        rotation: 0
      }
    });
  });

  it('should not change state on RESET_ROTATION when no photo exists', () => {
    expect(
      photoReducer(initialState, resetRotation())
    ).toEqual(initialState);
  });

  it('should handle ROTATE_PHOTO when photo exists', () => {
    const stateWithPhoto: PhotoState = {
      photo: samplePhoto
    };

    const newRotation = 45;

    expect(
      photoReducer(stateWithPhoto, rotatePhoto(newRotation))
    ).toEqual({
      photo: {
        ...samplePhoto,
        rotation: newRotation
      }
    });
  });

  it('should not change state on ROTATE_PHOTO when no photo exists', () => {
    expect(
      photoReducer(initialState, rotatePhoto(90))
    ).toEqual(initialState);
  });

  it('should handle PAN_ZOOM_PHOTO when photo exists', () => {
    const stateWithPhoto: PhotoState = {
      photo: samplePhoto
    };

    const newWidth = 800;
    const newHeight = 600;

    expect(
      photoReducer(stateWithPhoto, panZoomPhoto(newWidth, newHeight))
    ).toEqual({
      photo: {
        ...samplePhoto,
        dimensions: {
          width: newWidth,
          height: newHeight
        }
      }
    });
  });

  it('should not change state on PAN_ZOOM_PHOTO when no photo exists', () => {
    expect(
      photoReducer(initialState, panZoomPhoto(800, 600))
    ).toEqual(initialState);
  });

  it('should handle ADD_FILTER when photo exists and filter is not already applied', () => {
    const stateWithPhoto: PhotoState = {
      photo: samplePhoto
    };

    expect(
      photoReducer(stateWithPhoto, addFilter(PhotoFilter.SEPIA))
    ).toEqual({
      photo: {
        ...samplePhoto,
        filters: [PhotoFilter.SEPIA]
      }
    });
  });

  it('should not add duplicate filters on ADD_FILTER', () => {
    const stateWithPhotoAndFilter: PhotoState = {
      photo: {
        ...samplePhoto,
        filters: [PhotoFilter.SEPIA]
      }
    };

    expect(
      photoReducer(stateWithPhotoAndFilter, addFilter(PhotoFilter.SEPIA))
    ).toEqual(stateWithPhotoAndFilter);
  });

  it('should not change state on ADD_FILTER when no photo exists', () => {
    expect(
      photoReducer(initialState, addFilter(PhotoFilter.SEPIA))
    ).toEqual(initialState);
  });

  it('should handle REMOVE_FILTER when photo exists and filter is applied', () => {
    const stateWithPhotoAndFilter: PhotoState = {
      photo: {
        ...samplePhoto,
        filters: [PhotoFilter.SEPIA, PhotoFilter.BLACK_AND_WHITE]
      }
    };

    expect(
      photoReducer(stateWithPhotoAndFilter, removeFilter(PhotoFilter.SEPIA))
    ).toEqual({
      photo: {
        ...samplePhoto,
        filters: [PhotoFilter.BLACK_AND_WHITE]
      }
    });
  });

  it('should not change state on REMOVE_FILTER when filter does not exist', () => {
    const stateWithPhotoAndFilter: PhotoState = {
      photo: {
        ...samplePhoto,
        filters: [PhotoFilter.BLACK_AND_WHITE]
      }
    };

    expect(
      photoReducer(stateWithPhotoAndFilter, removeFilter(PhotoFilter.SEPIA))
    ).toEqual(stateWithPhotoAndFilter);
  });

  it('should not change state on REMOVE_FILTER when no photo exists', () => {
    expect(
      photoReducer(initialState, removeFilter(PhotoFilter.SEPIA))
    ).toEqual(initialState);
  });

  it('should handle LOAD_SAVED_PHOTO_SUCCESS', () => {
    const loadedPhoto = {
      ...samplePhoto,
      rotation: 180,
      filters: [PhotoFilter.BLACK_AND_WHITE]
    };

    expect(
      photoReducer(initialState, loadSavedPhotoSuccess(loadedPhoto))
    ).toEqual({
      photo: loadedPhoto
    });
  });
});