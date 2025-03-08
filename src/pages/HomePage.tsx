import { Box, Button, Typography } from "@mui/material";
import { USER_SIGNED_IN } from "../consts";
import { useNavigate } from "react-router";
import React from "react";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        boxSizing: "border-box",
        padding: 3,
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#333",
          textAlign: "center",
        }}
      >
        Project management microservice prototype
      </Typography>

      <Typography
        variant="h6"
        sx={{
          color: "#666",
          textAlign: "center",
          marginBottom: 3,
        }}
      >
        Get started by navigating to your projects.
      </Typography>

      <Button
        onClick={() => navigate(`/user/${USER_SIGNED_IN}/projects`)}
        variant="contained"
        color="primary"
        sx={{
          padding: "12px 24px",
          fontSize: "16px",
          boxShadow: 3,
          "&:hover": {
            boxShadow: 6,
          },
        }}
      >
        Start
      </Button>
    </Box>
  );
};

export default HomePage;
