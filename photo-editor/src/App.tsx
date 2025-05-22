import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import PhotoUploader from './components/PhotoUploader';
import PhotoControls from './components/PhotoControls';
import ImageRenderer from './components/ImageRenderer';
import { loadSavedPhoto } from './store/photo/actions';
import { AppDispatch } from './store';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // When the app loads, try to load any saved photo state
    dispatch(loadSavedPhoto());
  }, [dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Photo Editor</h1>
        <p>Upload a photo to get started</p>
        <PhotoUploader />
        <ImageRenderer />
        <PhotoControls />
      </header>
    </div>
  );
}

export default App;
