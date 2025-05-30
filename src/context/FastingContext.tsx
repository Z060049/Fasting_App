import React, { createContext, useState, useContext } from 'react';

type FastingContextType = {
  completedFasts: boolean[];
  setCompletedFasts: React.Dispatch<React.SetStateAction<boolean[]>>;
};

const FastingContext = createContext<FastingContextType | undefined>(undefined);

export const FastingProvider = ({ children }: { children: React.ReactNode }) => {
  const [completedFasts, setCompletedFasts] = useState<boolean[]>(Array(31).fill(false));
  return (
    <FastingContext.Provider value={{ completedFasts, setCompletedFasts }}>
      {children}
    </FastingContext.Provider>
  );
};

export const useFastingContext = () => {
  const context = useContext(FastingContext);
  if (!context) throw new Error('useFastingContext must be used within a FastingProvider');
  return context;
};