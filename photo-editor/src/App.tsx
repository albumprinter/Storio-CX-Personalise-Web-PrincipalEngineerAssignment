import React from 'react';
import './App.css';
import PhotoUploader from './components/PhotoUploader';
import PhotoControls from './components/PhotoControls';
import ImageRenderer from './components/ImageRenderer';

function App() {
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
