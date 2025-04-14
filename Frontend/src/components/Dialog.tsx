import { useTheme } from '@styles/Theme';
import React, { useEffect } from 'react';

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
      className="absolute inset-0 z-100 flex items-center justify-center bg-black/50"
      onClick={onClose}
     
    >
        
      <div
        className=""
        onClick={(e) => e.stopPropagation()}
        
      >
        <div className='flex flex-row justify-between'>
          <div>
            <p >
            {title}
            </p>
          </div>
        {/* Close Button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-xl font-bold"
            >
            &times;
          </button>
        </div>
              </div>

        {/* Dialog Content */}
        <div className="mt-2 w-max h-max">{children}</div>
      </div>
    </div>
  );
};

export default Dialog;
