import { ITask } from './task.interface';

export interface ITaskService {
  getAll(): Promise<ITask[]>;
  getOne(id): Promise<ITask | any>;
  postOne(data): Promise<ITask>;
  complete(id): Promise<ITask>;
  update(id, data): Promise<ITask>;
  deleteOne(id): Promise<ITask[] | string>;
}
