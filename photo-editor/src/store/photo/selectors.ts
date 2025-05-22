import { createSelector } from 'reselect';
import { RootState } from '../index';
import { Photo } from './types';

// Select the photo state
const selectPhotoState = (state: RootState) => state.photo;

// Select the photo
export const selectPhoto = createSelector(
  [selectPhotoState],
  (photoState) => photoState.photo
);
