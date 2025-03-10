import { useState, useEffect } from "react";
import { ProjectMember } from "../../types";
import { API_SERVER } from "../../consts";

const useProjectMember = (projectMemberId: string) => {
  const [projectMember, setProjectMember] = useState<ProjectMember | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectMemberId) return;

    const fetchProjectMember = async () => {
      try {
        const response = await fetch(
          `${API_SERVER}project_member/${projectMemberId}/`
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
