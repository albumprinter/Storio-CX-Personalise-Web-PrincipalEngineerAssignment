import { selectPhoto } from '../store/photo/selectors';
import { PhotoFilter } from '../store/photo/types';

describe('Photo Selectors', () => {
  const samplePhoto = {
    dimensions: {
      width: 500,
      height: 300
    },
    source: 'data:image/png;base64,...',
    rotation: 45,
    filters: [PhotoFilter.SEPIA] as PhotoFilter[]
  };

  it('should select photo from state', () => {
    const state = {
      photo: {
        photo: samplePhoto
      },
      history: {
        past: [],
        future: [],
        limit: 20
      }
    };

    expect(selectPhoto(state)).toEqual(samplePhoto);
  });

  it('should return null when no photo exists in state', () => {
    const state = {
      photo: {
        photo: null
      },
      history: {
        past: [],
        future: [],
        limit: 20
      }
    };

    expect(selectPhoto(state)).toBeNull();
  });
});