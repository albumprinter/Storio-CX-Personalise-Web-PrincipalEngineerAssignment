import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { PhotoFilter } from '../store/photo/types';
import { addFilter, removeFilter } from '../store/photo/actions';
import { AppDispatch } from '../store';
import './FilterControls.css';

const FilterControls: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const photo = useSelector((state: RootState) => state.photo.photo);
  
  const handleFilterChange = (filter: PhotoFilter) => {
    if (!photo) return;
    
    const isFilterApplied = photo.filters.includes(filter);
    
    if (isFilterApplied) {
      dispatch(removeFilter(filter));
    } else {
      dispatch(addFilter(filter));
    }
  };
  
  if (!photo) {
    return null;
  }
  
  return (
    <div className="filter-controls">
      <h3>Filters</h3>
      <div className="filter-options">
        <div className="filter-option">
          <input
            type="checkbox"
            id="sepia-filter"
            checked={photo.filters.includes(PhotoFilter.SEPIA)}
            onChange={() => handleFilterChange(PhotoFilter.SEPIA)}
          />
          <label htmlFor="sepia-filter">Sepia</label>
        </div>
        <div className="filter-option">
          <input
            type="checkbox"
            id="bw-filter"
            checked={photo.filters.includes(PhotoFilter.BLACK_AND_WHITE)}
            onChange={() => handleFilterChange(PhotoFilter.BLACK_AND_WHITE)}
          />
          <label htmlFor="bw-filter">Black & White</label>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
