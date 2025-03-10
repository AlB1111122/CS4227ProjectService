import { useEffect, useState } from "react";
import { ProjectWRolePMId } from "../../types";
import { API_SERVER } from "../../consts";

const useUserProjects = (userId: string) => {
  const [projects, setProjects] = useState<ProjectWRolePMId[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `${API_SERVER}/project_member/${userId}/projects_roles/`
        );
        if (!response.ok) throw new Error("Failed to fetch projects");
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [userId]);

  return { projects, loading, error };
};

export default useUserProjects;
