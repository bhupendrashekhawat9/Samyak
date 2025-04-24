import { useTheme } from '@styles/Theme';
import React, { useEffect } from 'react';
import Overlay from './Overlay';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?:string
}

const Dialog: React.FC<DialogProps> = ({ open, onClose, children,title }) => {
  // Close on Escape key press
  let {theme} = useTheme()
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-100 bg-black/20 flex justify-center items-center "
      onClick={onClose}
    >
        <Overlay onClick={onClose} />
        <div onClick={(e)=>e.stopPropagation()} className="mt-2 w-max h-max bg-black/50 min-w-1/2 rounded-lg z-102" >{children}</div>
      </div>
  );
};

export default Dialog;
