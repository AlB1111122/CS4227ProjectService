import React from "react";
import { Box, Typography } from "@mui/material";

const Header = ({
  main,
  sub,
}: {
  main: string | undefined;
  sub: string | undefined;
}) => {
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
        {main}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ minHeight: "1.2rem" }}
      >
        {sub}
      </Typography>
    </Box>
  );
};

export default Header;
