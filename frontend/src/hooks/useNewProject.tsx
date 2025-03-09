import { useState } from "react";
import { API_SERVER } from "../consts";

const useNewProjectForm = (user?: string) => {
  const [newProjectName, setNewProjectName] = useState<string>("");
  const [newProjectDescription, setNewProjectDescription] =
    useState<string>("");
  const [newProjectStartDate, setNewProjectStartDate] = useState<string>("");
  const [newProjectEndDate, setNewProjectEndDate] = useState<string>("");

  const handleAddProject = async () => {
    let newProject = null;

    if (newProjectStartDate === "") {
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

  return {
    newProjectName,
    setNewProjectName,
    newProjectDescription,
    setNewProjectDescription,
    newProjectStartDate,
    setNewProjectStartDate,
    newProjectEndDate,
    setNewProjectEndDate,
    handleAddProject,
  };
};

export default useNewProjectForm;
