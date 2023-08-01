import { CreateTaskDto } from '../dto';
import { ITask } from './task.interface';

export interface ITaskService {
  getAll(): Promise<ITask[]>;
  getOne(id): Promise<ITask | string>;
  postOne(data): Promise<ITask>;
  complete(id): Promise<ITask>;
  update(id, data): Promise<ITask>;
  deleteOne(id): Promise<ITask[] | string>;
}
