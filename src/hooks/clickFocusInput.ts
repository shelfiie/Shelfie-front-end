import { RefObject, useEffect } from 'react';

export const useClickFocus = <T extends HTMLElement>(ref: RefObject<T>, callback: () => void) => {
  useEffect(() => {
    const handleMouseUp = () => {
      callback();
    };

    if (ref.current) {
      ref.current.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('mouseup', handleMouseUp);
      }
    };
  }, [ref, callback]);
};