import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { ProjectWRolePMId } from "../types";
import ProjectCard from "../components/projectDashboard/ProjectCard";
import { API_SERVER } from "../consts";
import NewProjectForm from "../components/projectDashboard/NewProjectForm";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<ProjectWRolePMId[]>([]);
  const { userId } = useParams();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          API_SERVER + "/project_member/" + userId + "/projects_roles/"
        );
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <Header main="Projects" sub="" />
      <NewProjectForm user={userId} />
      <Box sx={{ width: "100%", mx: "auto" }}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </Box>
    </div>
  );
};

export default ProjectsPage;
