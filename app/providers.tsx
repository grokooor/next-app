"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";
type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;
//https://github.com/shadcn-ui/ui/issues/5706

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}> {children} </NextThemesProvider>;
}
