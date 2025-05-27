import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { PhotoFilter } from '../store/photo/types';
import { addFilter, removeFilter } from '../store/photo/actions';
import { AppDispatch } from '../store';
import './FilterControls.css';

const FilterControls: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const photo = useSelector((state: RootState) => state.photo.photo);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
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
  
  const getActiveFilterText = () => {
    if (photo.filters.length === 0) return 'No filters';
    if (photo.filters.length === 1) {
      if (photo.filters.includes(PhotoFilter.SEPIA)) return 'Sepia';
      if (photo.filters.includes(PhotoFilter.BLACK_AND_WHITE)) return 'Black & White';
    }
    if (photo.filters.length === 2) return 'All filters';
    
    return 'Select filters';
  };
  
  return (
    <div className="filter-controls">
      <div className="filter-dropdown" ref={dropdownRef}>
        <button 
          className="filter-button" 
          onClick={() => setShowDropdown(!showDropdown)}
          aria-haspopup="true"
          aria-expanded={showDropdown}
        >
          🎨 {getActiveFilterText()}
        </button>
        {showDropdown && (
          <div className="dropdown-content">
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
        )}
      </div>
    </div>
  );
};

export default FilterControls;
