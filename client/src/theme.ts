export const tokens = {
  grey: {
    100: "#f0f0f3",
    200: "#e1e2e7",
    300: "#d1d3da",
    400: "#c2c5ce",
    500: "#b3b6c2",
    600: "#8f929b",
    700: "#6b6d74",
    800: "#48494e",
    900: "#242427",
  },
  primary: {
    100: "#d0e8ff",
    200: "#a1d4ff",
    300: "#71c0ff",
    400: "#42acff",
    500: "#128bff",
    600: "#0f6dd6",
    700: "#0c4fa0",
    800: "#093370",
    900: "#061f40",
  },
  secondary: {
    100: "#ffd0d0",
    200: "#ffaaaa",
    300: "#ff8585",
    400: "#ff6060",
    500: "#ff3b3b",
    600: "#d62929",
    700: "#a31e1e",
    800: "#701414",
    900: "#400a0a",

  },
  tertiary: {
    100: "#fffbd0",
    200: "#fff79a",
    300: "#fff364",
    400: "#fff02e",
    500: "#ffeb00",
    600: "#d4bf00",
    700: "#a18f00",
    800: "#6d5f00",
    900: "#3a2f00",
  },
  background: {
    light: "#f5f5dc",
    main: "#1f2026",
  },
};
export const themeSettings = {
  palette: {
    primary: {
      ...tokens.primary,
      main: tokens.primary[500],
      light: tokens.primary[400],
    },
    secondary: {
      ...tokens.secondary,
      main: tokens.secondary[500],
    },
    tertiary: {
      ...tokens.tertiary,
    },
    grey: {
      ...tokens.grey,
      main: tokens.grey[500],
    },
    background: {
      default: tokens.background.main,
      light: tokens.background.light,
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    fontSize: 12,
    h1: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 32,
    },
    h2: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 24,
    },
    h3: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 20,
      fontWeight: 800,
      color: tokens.grey[700],
    },
    h4: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 14,
      fontWeight: 600,
      color: tokens.grey[700],
    },
    h5: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      fontWeight: 400,
      color: tokens.grey[500],
    },
    h6: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 10,
      color: tokens.grey[700],
    },
  },
};
