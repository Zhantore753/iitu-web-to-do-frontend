import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import Input from "../components/Input";
import Button from "../components/Button";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Login />;
}

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation<
    void,
    Error,
    { username: string; password: string }
  >({
    mutationFn: async ({ username, password }) => {
      await login(username, password);
    },
    onSuccess: () => {
      navigate({ to: "/" });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({ username, password });
  };

  return (
    <div className="container md:mx-auto py-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div>
          <label>
            Username:
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Logging in..." : "Login"}
        </Button>
        {mutation.isError && <p className="text-red-500">Error logging in</p>}
      </form>
    </div>
  );
};

export default Login;
