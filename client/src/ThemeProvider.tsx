import { createTheme, MantineProvider } from "@mantine/core";
import { useAppSelector } from "./redux/store";
import { useEffect } from "react";

const theme = createTheme({
  primaryColor: "green",
});

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { colorSchema } = useAppSelector((state) => state.colorSchema);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-mantine-color-scheme",
      colorSchema
    );
    document.body.setAttribute("data-bs-theme", colorSchema);
  }, [colorSchema]);

  return (
    <MantineProvider defaultColorScheme={colorSchema} theme={theme}>
      {children}
    </MantineProvider>
  );
}

export default ThemeProvider;
