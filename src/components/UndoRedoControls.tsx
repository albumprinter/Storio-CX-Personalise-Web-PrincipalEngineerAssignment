import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { undo, redo } from '../store/history/actions';
import { selectCanUndo, selectCanRedo, selectPast, selectFuture } from '../store/history/selectors';
import './UndoRedoControls.css';

interface UndoRedoControlsProps {
  appTitle?: string;
  appVersion?: string;
  isDebugMode?: boolean;
}

const UndoRedoControls: React.FC<UndoRedoControlsProps> = (props) => {
  const dispatch = useDispatch();
  const canUndo = useSelector(selectCanUndo);
  const canRedo = useSelector(selectCanRedo);
  const past = useSelector(selectPast);
  const future = useSelector(selectFuture);

  const handleUndo = () => {
    dispatch(undo());
  };

  const handleRedo = () => {
    dispatch(redo());
  };

  return (
    <div className="undo-redo-controls">
      <button 
        className="undo-button"
        onClick={handleUndo}
        disabled={!canUndo}
        title={`Undo (${past.length} ${past.length === 1 ? 'step' : 'steps'} available)`}
      >
        ↩ Undo {canUndo ? `(${past.length})` : ''}
      </button>
      <button 
        className="redo-button"
        onClick={handleRedo}
        disabled={!canRedo}
        title={`Redo (${future.length} ${future.length === 1 ? 'step' : 'steps'} available)`}
      >
        Redo {canRedo ? `(${future.length})` : ''} ↪
      </button>
    </div>
  );
};

export default UndoRedoControls;
