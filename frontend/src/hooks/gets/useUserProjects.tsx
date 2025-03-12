import { useEffect, useState } from "react";
import { ProjectWRolePMId } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const useUserProjects = (userId: string) => {
  const [projects, setProjects] = useState<ProjectWRolePMId[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const currentServer = useSelector((state: RootState) => state.server);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `${currentServer}project_member/${userId}/projects_roles/`,
          {
            method: "get",
            headers: new Headers({
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "69420",
            }),
          }
        );

        if (!response.ok) throw new Error("Failed to fetch projects");
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        console.log(err);
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
