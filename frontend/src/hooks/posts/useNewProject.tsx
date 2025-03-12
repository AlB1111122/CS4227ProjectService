import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const useNewProjectForm = (user?: string) => {
  const [newProjectName, setNewProjectName] = useState<string>("");
  const [newProjectDescription, setNewProjectDescription] =
    useState<string>("");
  const [newProjectStartDate, setNewProjectStartDate] = useState<string>("");
  const [newProjectEndDate, setNewProjectEndDate] = useState<string>("");
  const currentServer = useSelector((state: RootState) => state.server);

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
      const response = await fetch(currentServer + "project/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
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
        const memberResponse = await fetch(currentServer + "project_member/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
          body: JSON.stringify(newMember),
        });
      }
      window.location.reload();
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
