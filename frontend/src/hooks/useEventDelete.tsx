import { useState } from "react";
import { API_SERVER } from "../consts";
import { useNavigate } from "react-router";

export const useEventDelete = (eventId: number) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const deleteEvent = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_SERVER}event/${eventId}/`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }
      window.location.reload();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { deleteEvent, loading, error };
};
