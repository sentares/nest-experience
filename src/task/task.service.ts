import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITaskService } from './interface';
import { TaskModel } from './model/task.model';

@Injectable()
export class TaskService implements ITaskService {
  constructor(
    @InjectModel(TaskModel.name) private readonly taskModel: Model<TaskModel>,
  ) {}

  async getAll() {
    return await this.taskModel.find();
  }

  async getOne(id) {
    return await this.taskModel.findOne({
      _id: id,
    });
  }

  async postOne(data) {
    const newTask = new this.taskModel(data);
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
