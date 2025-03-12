import React from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Header = () => {
  const { title, description } = useSelector(
    (state: RootState) => state.header
  );

  return (
    <Box
      sx={{
        maxWidth: "100%",
        px: 4,
        py: 1,
        marginBottom: 0.5,
        blockSize: "border",
        boxShadow: "1px 2px 9px grey",
      }}
    >
      <Typography variant="h3" component="div" sx={{ textAlign: "left" }}>
        {title}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ minHeight: "1.2rem" }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default Header;
