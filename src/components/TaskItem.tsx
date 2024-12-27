import { FC } from "react";
import { Task } from "../types/Task";
import { Link } from "@tanstack/react-router";
import { FiSettings } from "react-icons/fi";

const TaskItem: FC<{ task: Task }> = ({ task }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white relative">
      <Link to={`/task/${task.id}`} className="absolute top-2 right-2">
        <FiSettings className="text-gray-500 hover:text-gray-700" />
      </Link>
      <h4 className="font-bold">{task.title}</h4>
      <p>{task.description}</p>
      {task.deadline && (
        <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
      )}
    </div>
  );
};

export default TaskItem;
