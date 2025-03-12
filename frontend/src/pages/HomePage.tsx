import {
  Box,
  Button,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { USER_SIGNED_IN } from "../consts";
import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHeader, setServer } from "../redux/store";
import { RootState } from "../redux/store";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get the current server state
  const currentServer = useSelector((state: RootState) => state.server);

  const [server, setServerSelection] = useState<"prd" | "local">("prd");

  useEffect(() => {
    dispatch(
      setHeader({
        title: "Home",
        description:
          "Standin for login page for prototype. This header uses redux to have its text.",
      })
    );

    // Initialize the server selection to the current state when the component mounts
    if (currentServer === "http://0.0.0.0:8002/") {
      setServerSelection("local");
    } else {
      setServerSelection("prd");
    }
  }, [dispatch, currentServer]);

  const handleServerChange = (
    _event: React.MouseEvent<HTMLElement>,
    newServer: "prd" | "local"
  ) => {
    setServerSelection(newServer);
    dispatch(setServer(newServer)); // Dispatch action to switch server
  };

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
        Get started by "logging in" navigating to your projects.
      </Typography>

      {/* Server Switch Toggle */}
      <ToggleButtonGroup
        value={server}
        exclusive
        onChange={handleServerChange}
        sx={{ marginBottom: 3 }}
      >
        <ToggleButton value="prd" sx={{ marginRight: 2 }}>
          Production Server
        </ToggleButton>
        <ToggleButton value="local">Local Server</ToggleButton>
      </ToggleButtonGroup>

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
        Login
      </Button>
    </Box>
  );
};

export default HomePage;
