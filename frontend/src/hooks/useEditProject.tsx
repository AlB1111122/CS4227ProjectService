import { useState } from "react";
import { API_SERVER } from "../consts";

const useEditProjectForm = (projectId: number) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name as string]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_SERVER}project/${projectId}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onDelete = async () => {
    try {
      const response = await fetch(`${API_SERVER}project/${projectId}/`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }
      console.log("Project deleted successfully");
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
