"use client";

import { createContext, ReactNode, useContext, useState } from "react";

// Définition du type pour le contexte de description
interface DescriptionContextType {
  description: string | undefined;
  setDescription: (desc: string | undefined) => void;
}

// Création du contexte
export const DescriptionContext = createContext<DescriptionContextType>({
  description: undefined,
  setDescription: () => {},
});

// Fournisseur de contexte
export const DescriptionContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [description, setDescription] = useState<string | undefined>(undefined);

  return (
    <DescriptionContext.Provider value={{ description, setDescription }}>
      {children}
    </DescriptionContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte de description
export const useDescriptionContext = () => {
  return useContext(DescriptionContext);
};
