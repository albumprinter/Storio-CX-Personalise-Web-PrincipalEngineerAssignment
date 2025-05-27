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
  
  const [localFilters, setLocalFilters] = useState<PhotoFilter[]>([]);
  
  useEffect(() => {
    if (photo && photo.filters) {
      if (photo.source) {
        setLocalFilters([...photo.filters]);
      }
    }
  }, [photo]);
  
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
    
    const isFilterApplied = localFilters.includes(filter);
    
    if (isFilterApplied) {
      setLocalFilters(localFilters.filter(f => f !== filter));
      dispatch(removeFilter(filter));
    } else {
      setLocalFilters([...localFilters, filter]);
      dispatch(addFilter(filter));
    }
  };
  
  if (!photo) {
    return null;
  }
  
  const getActiveFilterText = () => {
    return localFilters.length === 0 
      ? 'No filters' 
      : localFilters.length === 1 
        ? localFilters.includes(PhotoFilter.SEPIA) 
          ? 'Sepia' 
          : localFilters.includes(PhotoFilter.BLACK_AND_WHITE) 
            ? 'Black & White' 
            : 'Unknown filter'
        : localFilters.length === 2 
          ? 'All filters' 
          : localFilters.length > 2 
            ? `${localFilters.length} filters` 
            : 'Select filters';
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
                checked={localFilters.includes(PhotoFilter.SEPIA)}
                onChange={() => handleFilterChange(PhotoFilter.SEPIA)}
              />
              <label htmlFor="sepia-filter">Sepia</label>
            </div>
            <div className="filter-option">
              <input
                type="checkbox"
                id="bw-filter"
                checked={localFilters.includes(PhotoFilter.BLACK_AND_WHITE)}
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
