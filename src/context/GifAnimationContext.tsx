import React, {createContext, useCallback, useContext, useEffect, useRef, useState} from 'react';

type GifAnimationContextType = {
  restartGif: () => void;
  gifPlaying: boolean;
};

const GifAnimationContext = createContext<GifAnimationContextType | undefined>(
  undefined,
);

export const GifAnimationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [gifPlaying, setGifPlaying] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const restartGif = useCallback(() => {
  // Start the GIF only if it is currently stopped.
  // If it is already playing, DON'T remount it.
  setGifPlaying(true);

  // Reset the inactivity timer
  if (timerRef.current) {
    clearTimeout(timerRef.current);
  }

  timerRef.current = setTimeout(() => {
    setGifPlaying(false);
  }, 5000);
}, []);

  useEffect(() => {
    // First 10 seconds after app/navigation opens
    timerRef.current = setTimeout(() => {
      setGifPlaying(false);
    }, 5000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <GifAnimationContext.Provider
      value={{
        restartGif,
        gifPlaying,
      }}>
      {children}
    </GifAnimationContext.Provider>
  );
};

export const useGifAnimation = () => {
  const context = useContext(GifAnimationContext);

  if (!context) {
    throw new Error(
      'useGifAnimation must be used inside GifAnimationProvider',
    );
  }

  return context;
};