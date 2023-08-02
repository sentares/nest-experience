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
import { ITaskService } from './interface';
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

  async getOne(id: IdParamsDto) {
    const task = await this.taskModel.find({ _id: id });
    if (!task?.length) {
      return new NotFoundException('Task not found');
    }
    return task;
  }

  async postOne(data: CreateTaskDto) {
    const { title } = data;
    const exist = await this.taskModel.findOne({ title });
    if (exist) {
      throw new ConflictException('Such task already exists');
    }

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

  async update(id, data: UpdateTaskDto) {
    const task = await this.taskModel.findById(id);

    if (task && data) {
      const updateTask = (task) => {
        if (data.title && data.title !== task.title) {
          task.title = data.title;
        }
        if (data.type && data.type !== task.type) {
          task.type = data.type;
        }
        return task;
      };
      Logger.log('Task updated', TaskService.name);
      return updateTask(task).save();
    } else {
      throw new NotFoundException('Task is not defined');
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
