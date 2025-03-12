import { useState, useEffect } from "react";
import { ProjectMember } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const useProjectMember = (projectMemberId: string) => {
  const [projectMember, setProjectMember] = useState<ProjectMember | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const currentServer = useSelector((state: RootState) => state.server);

  useEffect(() => {
    if (!projectMemberId) return;

    const fetchProjectMember = async () => {
      try {
        const response = await fetch(
          `${currentServer}project_member/${projectMemberId}/`,
          {
            method: "get",
            headers: new Headers({
              "ngrok-skip-browser-warning": "69420",
            }),
          }
        );
        if (!response.ok) throw new Error("Failed to fetch project member");
        const data = await response.json();
        setProjectMember(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectMember();
  }, [projectMemberId]);

  return { projectMember, loading, error };
};

export default useProjectMember;
