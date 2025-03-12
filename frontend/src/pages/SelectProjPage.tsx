import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import ProjectCard from "../components/projectDashboard/ProjectCard";
import NewProjectForm from "../components/projectDashboard/NewProjectForm";
import useUserProjects from "../hooks/gets/useUserProjects";
import { useDispatch } from "react-redux";
import { setHeader } from "../redux/store";

const ProjectsPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setHeader({
        title: "Projects",
        description: "",
      })
    );
  }, [dispatch]);

  const { userId } = useParams();

  if (userId == undefined) {
    return <p>Error: malformed URL, no user found</p>;
  }

  const { projects, loading, error } = useUserProjects(userId);

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
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
