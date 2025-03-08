import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { API_SERVER } from "../../consts";
import { Delete } from "@mui/icons-material";

const EditProjectForm = ({ projectId }: { projectId: number | undefined }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name as string]: value }));
  };

  const onDelete = async () => {
    try {
      const response = await fetch(`${API_SERVER}project/${projectId}/`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(API_SERVER + `project/${projectId}/`, {
        method: "PATCH",
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
      }}
    >
      <Typography variant="h5" textAlign="center">
        Edit project
      </Typography>

      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
      />

      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        required
      />

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
      <Button
        fullWidth
        variant="outlined"
        color="error"
        startIcon={<Delete />}
        onClick={onDelete}
      >
        Delete Event
      </Button>
    </Box>
  );
};

export default EditProjectForm;
