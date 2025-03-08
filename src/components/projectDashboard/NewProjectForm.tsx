import React, { useState } from "react";
import { Button, Card, TextField } from "@mui/material";
import { API_SERVER } from "../../consts";

interface NewProjectFormProps {
  user?: string; // user can be a string or undefined
}
const NewProjectForm: React.FC<NewProjectFormProps> = ({ user }) => {
  const [newProjectName, setNewProjectName] = useState<string>("");
  const [newProjectDescription, setNewProjectDescription] =
    useState<string>("");
  const [newProjectStartDate, setNewProjectStartDate] = useState<string>("");
  const [newProjectEndDate, setNewProjectEndDate] = useState<string>("");

  const handleAddProject = async () => {
    var newProject = null;
    if (newProjectStartDate == "") {
      newProject = {
        name: newProjectName,
        description: newProjectDescription,
        timeline: null,
      };
    } else {
      newProject = {
        name: newProjectName,
        description: newProjectDescription,
        timeline: null,
        timeline_start: newProjectStartDate,
        timeline_end: newProjectEndDate,
      };
    }

    try {
      const response = await fetch(API_SERVER + "project/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      });

      if (!response.ok) {
        console.error("Error adding project");
      } else {
        const body = await response.json();
        const newMember = {
          user_id: user,
          role: "OWNER",
          project_id: body.id,
        };
        // @ts-ignore
        const memberResponse = await fetch(API_SERVER + "project_member/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMember),
        });
      }
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  return (
    <div>
      <Card
        sx={{
          maxWidth: "50%", // Set a fixed or responsive width
          width: "50%",
          mx: "auto", // Center the box
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
            shrink: true, // Make sure the label is shrunk when the user selects a date
          }}
        />
        <TextField
          label="Project End"
          variant="outlined"
          type="date"
          value={newProjectEndDate}
          onChange={(e) => setNewProjectEndDate(e.target.value)}
          InputLabelProps={{
            shrink: true, // Make sure the label is shrunk when the user selects a date
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
