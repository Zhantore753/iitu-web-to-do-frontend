import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { TaskStatus } from "../../types/Task";

export const Route = createFileRoute("/task/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CreateTask />;
}

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("planned");
  const [deadline, setDeadline] = useState<Date | null>(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation<
    void,
    Error,
    {
      title: string;
      description: string;
      status: TaskStatus;
      deadline: Date | null;
    }
  >({
    mutationFn: async ({ title, description, status, deadline }) => {
      const response = await fetch("http://localhost:3001/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, status, deadline }),
      });
      if (!response.ok) {
        throw new Error("Failed to create task");
      }
    },
    onSuccess: () => {
      navigate({ to: "/" });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({ title, description, status, deadline });
  };

  return (
    <div className="container md:mx-auto py-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div>
          <label>
            Title:
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea
              className="border p-2 block rounded-lg border-black bg-secondary shadow focus:shadow-md focus:outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Status:
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
              className="border p-2 block rounded-lg border-black bg-secondary shadow focus:shadow-md focus:outline-none"
            >
              <option value="planned">Planned</option>
              <option value="progress">In Progress</option>
              <option value="finished">Finished</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Deadline:
            <Input
              type="date"
              value={deadline ? deadline.toISOString().split("T")[0] : ""}
              onChange={(e) =>
                setDeadline(e.target.value ? new Date(e.target.value) : null)
              }
            />
          </label>
        </div>
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Creating..." : "Create Task"}
        </Button>
        {mutation.isError && (
          <p className="text-red-500">Error creating task</p>
        )}
      </form>
    </div>
  );
};

export default CreateTask;
