import { useState, useEffect } from "react";
import { Event } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const useTimelineEvents = (timelineId: number | undefined | null) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const currentServer = useSelector((state: RootState) => state.server);

  useEffect(() => {
    if (!timelineId) return;

    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `${currentServer}event/by_project/?timeline_id=${timelineId}`,
          {
            method: "get",
            headers: new Headers({
              "ngrok-skip-browser-warning": "69420",
            }),
          }
        );
        if (!response.ok) throw new Error("Failed to fetch events");
        const data: Event[] = await response.json();

        data.sort(
          (a, b) =>
            new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
        );
        setEvents(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [timelineId]);

  return { events, loading, error };
};

export default useTimelineEvents;
