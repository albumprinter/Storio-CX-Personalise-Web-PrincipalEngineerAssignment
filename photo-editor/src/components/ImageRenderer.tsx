import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { PhotoFilter } from '../store/photo/types';
import './ImageRenderer.css';

const applyFilter = (imageData: ImageData, filter: PhotoFilter): void => {
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    switch (filter) {
      case PhotoFilter.SEPIA:
        data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
        data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
        data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
        break;
      case PhotoFilter.BLACK_AND_WHITE:
        const avg = (r + g + b) / 3;
        data[i] = avg;
        data[i + 1] = avg;
        data[i + 2] = avg;
        break;
    }
  }
};

const ImageRenderer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const photo = useSelector((state: RootState) => state.photo.photo);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !photo) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = photo.source;
    
    img.onload = () => {
      canvas.width = 500;
      canvas.height = 500;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(photo.rotation);
      
      const aspectRatio = img.width / img.height;
      let scale;
      
      if (aspectRatio > 1) {
        scale = (canvas.width * 0.8) / img.width;
      } else {
        scale = (canvas.height * 0.8) / img.height;
      }
      
      ctx.scale(scale, scale);
      const scaleX = photo.dimensions.width / img.width;
      const scaleY = photo.dimensions.height / img.height;
      ctx.scale(scaleX, scaleY);
      ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);
      
      // Apply filters if present
      if (photo.filters && photo.filters.length > 0) {
        const imageData = ctx.getImageData(
          -img.width / 2, 
          -img.height / 2, 
          img.width, 
          img.height
        );
        
        photo.filters.forEach(filter => {
          applyFilter(imageData, filter);
        });
        
        ctx.putImageData(imageData, -img.width / 2, -img.height / 2);
      }
      
      ctx.restore();
    };
  }, [photo]);

  return (
    <div className="image-renderer">
      {!photo && <div className="no-image">No image uploaded yet</div>}
      <canvas 
        ref={canvasRef} 
        className="image-canvas"
        width="500"
        height="500"
        style={{ display: photo ? 'block' : 'none' }}
      />
    </div>
  );
};

export default ImageRenderer;
