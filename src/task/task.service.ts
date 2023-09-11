import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto, IdParamsDto, UpdateTaskDto } from './dto';
import { TaskType } from './enum';
import { ITask, ITaskService } from './interface';
import { TaskModel } from './model';

@Injectable()
export class TaskService implements ITaskService {
  constructor(
    @InjectModel(TaskModel.name) private readonly taskModel: Model<TaskModel>,
  ) {}

  async getAll() {
    const tasks = await this.taskModel.find();
    if (!tasks) {
      throw new NotFoundException('Tasks are not exist');
    }
    return tasks;
  }

  async getOne(id: string) {
    const task = await this.taskModel.findById(id);
    if (!task) {
      throw new NotFoundException('Task is not defined');
    }
    return task;
  }

  async postOne(data: CreateTaskDto) {
    const { title } = data;
    await this.checkUnique(title);

    const newTask = new this.taskModel(data);
    !newTask.type ? (newTask.type = TaskType.IMPORTANT_AND_URGENT) : null;

    Logger.log('New task was created', TaskService.name);
    return newTask.save();
  }

  async complete(id: IdParamsDto) {
    const task = await this.taskModel.findOne({
      _id: id,
    });

    if (task) {
      const changeTask = (task) => {
        task.completed = !task.completed;
        return task;
      };
      Logger.log('Task updated', TaskService.name);
      return changeTask(task).save();
    } else {
      throw new NotFoundException('Task is not defined');
    }
  }

  async update(id: string, data: UpdateTaskDto): Promise<ITask> {
    const { title, type } = data;
    const task = await this.getOne(id);

    // !title:
    await this.checkUnique(title);

    Object.assign(task, data);
    return task.save();
  }

  async checkUnique(title: string): Promise<void> {
    const exist = await this.taskModel.findOne({ title });
    if (exist) {
      throw new ConflictException('Such task already exists');
    }
  }

  async deleteOne(id: IdParamsDto) {
    const task = await this.taskModel.findOneAndDelete({ _id: id });
    if (task) {
      Logger.log('Task deleted', TaskService.name);
      return 'Task deleted successfully';
    } else {
      throw new NotFoundException('Task not found');
    }
  }
}
