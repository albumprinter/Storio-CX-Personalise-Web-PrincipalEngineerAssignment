import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import './PhotoUploader.css';
import { setPhoto } from '../store/photo/actions';
import { Photo } from '../store/photo/types';
import { AppDispatch } from '../store';

const PhotoUploader: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('File selected:', file.name);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target?.result as string;
        
        const img = new Image();
        img.onload = () => {
          const photo: Photo = {
            dimensions: {
              width: img.width,
              height: img.height
            },
            source: base64String,
            rotation: 0,
            filters: []
          };
          
          dispatch(setPhoto(photo));
        };
        img.src = base64String;
      };
      
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="photo-uploader">
      <button 
        className="upload-button" 
        onClick={handleButtonClick}
      >
        Upload Photo
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default PhotoUploader;
