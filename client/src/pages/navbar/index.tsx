import { useState } from "react";
import { Link } from "react-router-dom";
import image from "./image.png";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";

type Props = {};

const Navbar = (props: Props) => {
  const { palette } = useTheme();
  const [selected, setSelected] = useState("profile");

  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>

      <FlexBetween gap="0.75rem">
        <img src={image} alt="logo" width="40px" />
        <Typography variant="h4" fontSize="16px">
          Web Project - Dhiya Eddine Oueslati
        </Typography>
      </FlexBetween>


      <FlexBetween gap="2rem">
          <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
              <Link
                  to="/profile"
                  onClick={() => setSelected("profile")}
                  style={{
                      color: selected === "profile" ? "inherit" : palette.grey[700],
                      textDecoration: "inherit",
                  }}
              >
                  Profile
              </Link>
          </Box>
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/dashboard"
            onClick={() => setSelected("dashboard")}
            style={{
              color: selected === "dashboard" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            Dashboard
          </Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/predictions"
            onClick={() => setSelected("predictions")}
            style={{
              color: selected === "predictions" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
              Predictions
          </Link>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
