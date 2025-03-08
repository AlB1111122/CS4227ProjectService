import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Typography,
  SelectChangeEvent,
} from "@mui/material";
import { API_SERVER } from "../../consts";

const UserRoleForm = ({ projectId }: { projectId: number | undefined }) => {
  const [formData, setFormData] = useState({
    user_id: "",
    role: "",
    project_id: projectId,
  });

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name as string]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(API_SERVER + "project_member/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        margin: "auto",
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "white",
        width: "100%",
        marginTop: 0,
      }}
    >
      <Typography variant="h5" textAlign="center">
        New user
      </Typography>

      <TextField
        label="User ID"
        name="user_id"
        value={formData.user_id}
        onChange={handleChange}
        fullWidth
        required
      />

      <FormControl fullWidth required>
        <InputLabel>Role</InputLabel>
        <Select name="role" value={formData.role} onChange={handleChange}>
          <MenuItem value="OWNER">OWNER</MenuItem>
          <MenuItem value="EDITOR">EDITOR</MenuItem>
          <MenuItem value="VIEWER">VIEWER</MenuItem>
        </Select>
      </FormControl>

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default UserRoleForm;
