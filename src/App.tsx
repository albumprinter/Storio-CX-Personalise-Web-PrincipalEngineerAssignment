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
  
  const appTitle = "Photo Editor";
  const appSubtitle = "Upload a photo to get started";
  const isDebugMode = false;
  const version = "1.0.0";
  const lastUpdated = new Date().toISOString();
  
  useEffect(() => {
    // When the app loads, try to load any saved photo state
    dispatch(loadSavedPhoto());
  }, [dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{appTitle}</h1>
        <p>{appSubtitle}</p>
        <PhotoUploader 
          appTitle={appTitle} 
          appVersion={version} 
          lastUpdated={lastUpdated} 
          isDebugMode={isDebugMode} 
        />
        <UndoRedoControls 
          appTitle={appTitle} 
          appVersion={version} 
          isDebugMode={isDebugMode}
        />
        <ImageRenderer 
          appTitle={appTitle} 
          appVersion={version} 
          isDebugMode={isDebugMode}
        />
        <PhotoControls 
          appTitle={appTitle}
          appVersion={version}
          isDebugMode={isDebugMode}
        />
      </header>
    </div>
  );
}

export default App;
