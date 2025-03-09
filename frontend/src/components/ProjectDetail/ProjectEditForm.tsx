import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import useEditProjectForm from "../../hooks/useEditProject";

const EditProjectForm = ({ projectId }: { projectId: number }) => {
  const { formData, handleChange, handleSubmit, onDelete } =
    useEditProjectForm(projectId);

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
        Delete Project
      </Button>
    </Box>
  );
};

export default EditProjectForm;
