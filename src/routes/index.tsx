import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import useAuth from "../hooks/useAuth";
import { Task, TaskStatus } from "../types/Task";
import TaskItem from "../components/TaskItem";
import Button from "../components/Button";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { token, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const { data: tasks, isLoading } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3001/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      return response.json();
    },
    retry: false,
    enabled: !!token,
  });

  const updateTaskStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: TaskStatus }) => {
      const response = await fetch(`http://localhost:3001/tasks/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        throw new Error("Failed to update task status");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const taskId = parseInt(result.draggableId);
      const newStatus = destination.droppableId as TaskStatus;
      updateTaskStatusMutation.mutate({ id: taskId, status: newStatus });
    }
  };

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  const getTasksByStatus = (status: TaskStatus) =>
    tasks?.filter((task) => task.status === status) || [];

  return (
    <main className="px-4">
      <div className="container md:mx-auto py-4">
        {isAuthenticated ? (
          <>
            <Link to="/task/create" className="font-medium">
              <Button className="bg-tertiary">Create new task</Button>
            </Link>

            <h3 className="mt-4">Welcome Home! Your tasks:</h3>
            <DragDropContext onDragEnd={handleDragEnd}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                {["planned", "progress", "finished"].map((status) => (
                  <Droppable droppableId={status} key={status}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="border p-4 rounded-lg shadow-md bg-black mt-2"
                      >
                        <h4 className="font-bold capitalize text-white mb-2">
                          {status}
                        </h4>
                        <ul className="flex flex-col gap-2">
                          {getTasksByStatus(status as TaskStatus).map(
                            (task, index) => (
                              <Draggable
                                key={task.id}
                                draggableId={task.id.toString()}
                                index={index}
                              >
                                {(provided) => (
                                  <li
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <TaskItem task={task} />
                                  </li>
                                )}
                              </Draggable>
                            )
                          )}
                          {provided.placeholder}
                        </ul>
                      </div>
                    )}
                  </Droppable>
                ))}
              </div>
            </DragDropContext>
          </>
        ) : (
          <h3>Please login to see your tasks</h3>
        )}
      </div>
    </main>
  );
}
