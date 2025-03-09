import React from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import useUserRoleForm from "../../hooks/posts/useNewUser";

const UserRoleForm = ({ projectId }: { projectId: number | undefined }) => {
  const { formData, handleChange, handleSubmit } = useUserRoleForm({
    user_id: "",
    role: "",
    project_id: projectId,
  });

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
