import { useState } from "react";
import { API_SERVER } from "../../consts";

const useSubmitEvent = (formData: any) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const submitEvent = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const dataToSend = {
      ...formData,
      financial_impact: formData.financial_impact,
    };

    try {
      const response = await fetch(API_SERVER + "event/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess(true);
        console.log("Success:", result);
      } else {
        setError(response.statusText);
        console.error("Error:", response.statusText);
      }
      window.location.reload();
    } catch (error) {
      setError("Error submitting event");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    submitEvent,
    loading,
    error,
    success,
  };
};

export default useSubmitEvent;
