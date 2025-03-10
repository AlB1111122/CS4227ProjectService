import { useState } from "react";
import { API_SERVER } from "../../consts";

export const useEventUpdate = (eventId: number) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateEvent = async (updatedFields: object) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_SERVER}event/${eventId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify(updatedFields),
      });

      if (!response.ok) {
        throw new Error("Failed to update event");
      }
      window.location.reload();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { updateEvent, loading, error };
};
