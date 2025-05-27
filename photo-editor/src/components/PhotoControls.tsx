import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetRotation, rotatePhoto, panZoomPhoto } from '../store/photo/actions';
import { selectPhoto } from '../store/photo/selectors';
import { AppDispatch } from '../store';
import FilterControls from './FilterControls';
import './PhotoControls.css';

const PhotoControls: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const photo = useSelector(selectPhoto);

  const isDisabled = !photo;

  const handleResetRotation = () => {
    dispatch(resetRotation());
  };

  const handleRotateRight = () => {
    if (photo) {
      const newRotation = photo.rotation + Math.PI / 12;
      dispatch(rotatePhoto(newRotation));
    }
  };

  const handleRotateLeft = () => {
    if (photo) {
      const newRotation = photo.rotation - Math.PI / 12;
      dispatch(rotatePhoto(newRotation));
    }
  };

  const handleZoomIn = () => {
    if (photo) {
      const newWidth = photo.dimensions.width * 1.1;
      const newHeight = photo.dimensions.height * 1.1;
      dispatch(panZoomPhoto(newWidth, newHeight));
    }
  };

  const handleZoomOut = () => {
    if (photo) {
      const newWidth = photo.dimensions.width * 0.9;
      const newHeight = photo.dimensions.height * 0.9;
      dispatch(panZoomPhoto(newWidth, newHeight));
    }
  };

  return (
    <div className="photo-controls">
      <h3 className="controls-header">Photo Controls</h3>
      <div className="control-section">
        <h4 className="section-title">Rotation</h4>
        <div className="control-buttons">
          <button 
            onClick={handleRotateLeft} 
            disabled={isDisabled}
            title="Rotate Left"
          >
            ↶ Rotate Left
          </button>
          <button 
            onClick={handleResetRotation} 
            disabled={isDisabled}
            title="Reset Rotation"
          >
            ⟳ Reset
          </button>
          <button 
            onClick={handleRotateRight} 
            disabled={isDisabled}
            title="Rotate Right"
          >
            ↷ Rotate Right
          </button>
        </div>
      </div>
      
      <div className="control-section">
        <h4 className="section-title">Size</h4>
        <div className="control-buttons">
          <button 
            onClick={handleZoomIn} 
            disabled={isDisabled}
            title="Zoom In"
          >
            🔍+ Zoom In
          </button>
          <button 
            onClick={handleZoomOut} 
            disabled={isDisabled}
            title="Zoom Out"
          >
            🔍- Zoom Out
          </button>
        </div>
      </div>
      
      <div className="control-section">
        <h4 className="section-title">Effects</h4>
        <FilterControls />
      </div>
      
      {photo && (
        <div className="photo-info">
          <p>Current Rotation: {(photo.rotation * 180 / Math.PI).toFixed(2)}°</p>
          <p>Dimensions: {Math.round(photo.dimensions.width)} x {Math.round(photo.dimensions.height)}</p>
        </div>
      )}
    </div>
  );
};

export default PhotoControls;
