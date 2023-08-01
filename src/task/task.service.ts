import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto';
import { TaskType } from './enum';
import { ITaskService } from './interface';
import { TaskModel } from './model';

@Injectable()
export class TaskService implements ITaskService {
  constructor(
    @InjectModel(TaskModel.name) private readonly taskModel: Model<TaskModel>,
  ) {}

  async getAll() {
    const tasks =  await this.taskModel.find();
    if(!tasks) {
      throw new NotFoundException('Tasks are not exist')
    }
    return tasks
  }

 async getOne(id: string) {
    try {
      const task = await this.taskModel.findById(id);
      return task;
    } catch (err) {
      Logger.error(err, 'TaskService getOne 26');
      throw new NotFoundException('Task is not defined');
    }
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

  async complete(id) {
    const task = await this.taskModel.findOne({
      _id: id,
    });

    const changeTask = (task) => {
      task.completed = !task.completed;
      return task;
    };

    return changeTask(task).save();
  }

  async update(id, data) {
    const task = await this.taskModel.findOne({
      _id: id,
    });

    const updateTask = (task) => {
      task.title = data;
      return task;
    };

    return updateTask(task).save();
  }

  async deleteOne(id) {
    return 'task not found';
  }
}
