import React from "react";
import { Button, Card, TextField } from "@mui/material";
import useNewProjectForm from "../../hooks/posts/useNewProject"; // Import the custom hook

interface NewProjectFormProps {
  user?: string;
}

const NewProjectForm: React.FC<NewProjectFormProps> = ({ user }) => {
  const {
    newProjectName,
    setNewProjectName,
    newProjectDescription,
    setNewProjectDescription,
    newProjectStartDate,
    setNewProjectStartDate,
    newProjectEndDate,
    setNewProjectEndDate,
    handleAddProject,
  } = useNewProjectForm(user);

  return (
    <div>
      <Card
        sx={{
          maxWidth: "50%",
          width: "50%",
          mx: "auto",
          mt: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          paddingY: 2,
        }}
      >
        <TextField
          label="Project Name"
          variant="outlined"
          fullWidth
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          required
        />
        <TextField
          label="Project Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={newProjectDescription}
          onChange={(e) => setNewProjectDescription(e.target.value)}
        />
        <TextField
          label="Project Start"
          variant="outlined"
          type="date"
          value={newProjectStartDate}
          onChange={(e) => setNewProjectStartDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Project End"
          variant="outlined"
          type="date"
          value={newProjectEndDate}
          onChange={(e) => setNewProjectEndDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button variant="contained" color="primary" onClick={handleAddProject}>
          Add New Project
        </Button>
      </Card>
    </div>
  );
};

export default NewProjectForm;
