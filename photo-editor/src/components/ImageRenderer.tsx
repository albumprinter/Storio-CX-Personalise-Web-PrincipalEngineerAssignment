import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import './ImageRenderer.css';

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
