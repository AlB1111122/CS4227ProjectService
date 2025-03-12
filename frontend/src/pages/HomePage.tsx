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

  const currentServer = useSelector((state: RootState) => state.server);

  const [server, setServerSelection] = useState<"prd" | "local">("prd");
  const [serverMsg, setServerMsg] = useState("");

  useEffect(() => {
    dispatch(
      setHeader({
        title: "Home",
        description:
          "Standin for login page for prototype. This header uses redux to change its text.",
      })
    );

    if (currentServer === "http://0.0.0.0:8002/") {
      setServerSelection("local");
      setServerMsg(
        "To use this setting launch the backend on your local machine with the docker compose (port 8002)"
      );
    } else {
      setServerSelection("prd");
      setServerMsg(
        "To use this setting send an email to 21338787@studentmail.ul.ie asking me to turn the remote sever on"
      );
    }
  }, [dispatch, currentServer]);

  const handleServerChange = (
    _event: React.MouseEvent<HTMLElement>,
    newServer: "prd" | "local"
  ) => {
    setServerSelection(newServer);
    dispatch(setServer(newServer));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        padding: 3,
        paddingTop: 25,
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
      <Typography
        variant="h6"
        sx={{
          color: "#666",
          textAlign: "center",
          marginBottom: 3,
        }}
      >
        {serverMsg}
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
