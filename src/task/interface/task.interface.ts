import { TaskType } from "../enum";

export interface ITask {
  id: string;
  title: string;
  completed: boolean;
  type: TaskType;

}
