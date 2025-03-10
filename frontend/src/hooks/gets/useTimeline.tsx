import { useState, useEffect } from "react";
import { Timeline_t } from "../../types";
import { API_SERVER } from "../../consts";

const useTimeline = (timelineId: number | undefined | null) => {
  const [timeline, setTimeline] = useState<Timeline_t>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!timelineId) return;

    const fetchTimeline = async () => {
      try {
        const response = await fetch(`${API_SERVER}timeline/${timelineId}/`, {
          method: "get",
          headers: new Headers({
            "ngrok-skip-browser-warning": "69420",
          }),
        });
        if (!response.ok) throw new Error("Failed to fetch timeline");
        const data = await response.json();
        setTimeline(data);
      } catch (err) {
        console.log(err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeline();
  }, [timelineId]);

  return { timeline, loading, error };
};

export default useTimeline;
