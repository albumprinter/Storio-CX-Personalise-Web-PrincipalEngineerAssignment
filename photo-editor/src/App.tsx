import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import PhotoUploader from './components/PhotoUploader';
import PhotoControls from './components/PhotoControls';
import ImageRenderer from './components/ImageRenderer';
import UndoRedoControls from './components/UndoRedoControls';
import { loadSavedPhoto } from './store/photo/actions';
import { AppDispatch } from './store';
import { useUndoRedoKeyboardShortcuts } from './hooks/useUndoRedoKeyboardShortcuts';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useUndoRedoKeyboardShortcuts();

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
        <UndoRedoControls />
        <ImageRenderer />
        <PhotoControls />
      </header>
    </div>
  );
}

export default App;
