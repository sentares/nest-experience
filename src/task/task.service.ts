import { Get, Injectable } from '@nestjs/common';
import { ITask } from './model';

@Injectable()
export class TaskService {
  #TASKS: ITask[];
  constructor() {
    this.#TASKS = [
      {
        id: 1,
        title: 'Купить молоко',
        completed: false,
      },
      {
        id: 2,
        title: 'Убраться дома',
        completed: true,
      },
      {
        id: 3,
        title: 'Сделать домашку',
        completed: false,
      },
    ];
  }

  async getAll() {
    return this.#TASKS;
  }

  async getOne(id: string) {
    const specialTask = this.#TASKS.find((task) => task.id === parseInt(id));
    return specialTask || 'not find';
  }

  async postOne(data) {
    const newTask = {
      id: this.#TASKS.length + 1,
      ...data,
      completed: false,
    };

    this.#TASKS.push(newTask);

    return this.#TASKS;
  }

  async deleteOne(id: string) {
    const specialTask = this.#TASKS.find((task) => task.id === parseInt(id));
    if (specialTask) {
      return (this.#TASKS = this.#TASKS.filter(
        (task) => task.id !== parseInt(id, 10),
      ));
    }
    return 'task not found';
  }
}
