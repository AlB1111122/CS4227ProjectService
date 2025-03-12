import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
export const useEventUpdate = (eventId: number) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const currentServer = useSelector((state: RootState) => state.server);

  const updateEvent = async (updatedFields: object) => {
    setLoading(true);
    try {
      const response = await fetch(`${currentServer}event/${eventId}/`, {
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
