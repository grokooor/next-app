"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";
type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;
//https://github.com/shadcn-ui/ui/issues/5706

import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export const NextAuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};
