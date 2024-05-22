import { Box } from "@mui/material";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { themeSettings } from "./theme";
import Navbar from "@/pages/navbar";
import Dashboard from "@/pages/dashboard";
import Predictions from "@/pages/predictions";
import Home from "@/components/Home";

import Profile from "@/pages/profile";
import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';


function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);

  return (
      <div className="app">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
              <Navbar/>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/predictions" element={<Predictions />} />
              </Routes>
            </Box>
          </ThemeProvider>
        </BrowserRouter>
      </div>
  );
}

export default App;
