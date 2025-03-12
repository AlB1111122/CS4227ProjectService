import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router";

const useEditProjectForm = (projectId: number) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const currentServer = useSelector((state: RootState) => state.server);

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name as string]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`${currentServer}project/${projectId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
      } else {
        console.error("Error:", response.statusText);
      }
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onDelete = async () => {
    try {
      const response = await fetch(`${currentServer}project/${projectId}/`, {
        method: "DELETE",
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }
      console.log("Project deleted successfully");
      navigate(`/user/${projectId}/projects`);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    onDelete,
  };
};

export default useEditProjectForm;
