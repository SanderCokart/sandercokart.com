import {ThemeProvider} from "./theme-provider";
import {ReactNode} from "react";

export function GlobalProviders({
  children,
                                }:{
  children: ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
    {children}
  </ThemeProvider>
  );
}