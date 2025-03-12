import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export const useEventDelete = (eventId: number) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const currentServer = useSelector((state: RootState) => state.server);

  const deleteEvent = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${currentServer}event/${eventId}/`, {
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
