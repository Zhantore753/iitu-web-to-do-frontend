export type TaskStatus = "planned" | "progress" | "finished";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  userId: number;
  deadline: Date | null;
}
