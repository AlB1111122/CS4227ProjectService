import { useState } from "react";

const useNewEventProcessFormData = (initialState: any) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return { formData, handleChange };
};

export default useNewEventProcessFormData;
