import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const useSubmitEvent = (formData: any) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const currentServer = useSelector((state: RootState) => state.server);

  const submitEvent = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const dataToSend = {
      ...formData,
      financial_impact: formData.financial_impact,
    };

    try {
      const response = await fetch(currentServer + "event/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
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
