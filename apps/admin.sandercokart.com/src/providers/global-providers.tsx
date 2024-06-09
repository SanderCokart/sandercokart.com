import {ReactNode} from "react";
import {ThemeProvider} from "@repo/ui/theme-provider";

export function GlobalProviders(
  {children}:{children: ReactNode}
) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}