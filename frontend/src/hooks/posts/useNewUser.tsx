import { useState } from "react";
import { API_SERVER } from "../../consts";
import { SelectChangeEvent } from "@mui/material";

const useUserRoleForm = (initialData: {
  user_id: string;
  role: string;
  project_id: number | undefined;
}) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(API_SERVER + "project_member/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
        window.location.reload();
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
  };
};

export default useUserRoleForm;
