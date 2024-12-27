import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";

export const Route = createFileRoute("/statistic")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Statistics />;
}

const Statistics = () => {
  const { token } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["completedTasks"],
    queryFn: async () => {
      const response = await fetch(
        "http://localhost:3001/statistics/completed",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch statistics");
      }
      return response.json();
    },
    enabled: !!token,
  });

  if (isLoading) {
    return <div>Loading statistics...</div>;
  }

  if (isError) {
    return <div>Error loading statistics</div>;
  }

  return (
    <div className="container md:mx-auto py-4">
      <h3>Statistics</h3>
      <p>Completed Tasks: {data.completedTasks}</p>
      <p>Completed Percentage: {data.completedPercentage}%</p>
    </div>
  );
};
