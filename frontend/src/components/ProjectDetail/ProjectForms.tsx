import React from "react";
import { Stack } from "@mui/material";
import NewEventForm from "./timeline/NewEventForm";
import NewUserForm from "./NewUserForm";
import EditProjectForm from "./ProjectEditForm";
interface ProjectFormsProps {
  role: string;
  id: number;
}
const ProjectForms: React.FC<ProjectFormsProps> = ({ role, id }) => {
  return (
    <Stack direction={"row"} width={"100%"} maxWidth={"100%"} paddingTop={1}>
      {role == "OWNER" || role == "EDITOR" ? (
        <NewEventForm timelineId={id} />
      ) : null}
      {role == "OWNER" ? (
        <Stack
          direction={"column"}
          width={"100%"}
          maxWidth={"100%"}
          maxHeight={"100%"}
        >
          <NewUserForm projectId={id} />
          <EditProjectForm projectId={id} />
        </Stack>
      ) : null}
    </Stack>
  );
};

export default ProjectForms;
