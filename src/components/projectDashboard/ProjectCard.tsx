import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { ProjectWRolePMId } from "../../types";
import { useNavigate } from "react-router";

const ProjectCard = ({ project }: { project: ProjectWRolePMId }) => {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/project/${project.project_member_id}`)}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ textAlign: "left" }}>
          {project.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "left", marginTop: 1 }}
        >
          {project.description}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "left", marginTop: 1 }}
        >
          {project.role}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "left", marginTop: 2 }}
        >
          Created at: {new Date(project.created_at).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
