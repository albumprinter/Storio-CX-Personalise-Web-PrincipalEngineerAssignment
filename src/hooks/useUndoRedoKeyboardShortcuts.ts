import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { undo, redo } from '../store/history/actions';
import { selectCanUndo, selectCanRedo } from '../store/history/selectors';

export const useUndoRedoKeyboardShortcuts = () => {
  const dispatch = useDispatch();
  const canUndo = useSelector(selectCanUndo);
  const canRedo = useSelector(selectCanRedo);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Detect Ctrl+Z or Cmd+Z (for Mac) for Undo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey && canUndo) {
        e.preventDefault();
        dispatch(undo());
      }
      
      // Detect Ctrl+Shift+Z or Cmd+Shift+Z (for Mac) for Redo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey && canRedo) {
        e.preventDefault();
        dispatch(redo());
      }
      
      // Alternative Redo shortcut: Ctrl+Y or Cmd+Y
      if ((e.ctrlKey || e.metaKey) && e.key === 'y' && canRedo) {
        e.preventDefault();
        dispatch(redo());
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch, canUndo, canRedo]);
};
