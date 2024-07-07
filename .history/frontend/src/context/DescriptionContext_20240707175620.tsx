"use client";

import { createContext } from "vm";

export const DescriptionContext = createContext<{ description: boolean }>({
  description: undefined,
});
