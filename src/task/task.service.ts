import { Get, Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  #TASKS;
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
    const specialTask = this.#TASKS.find((task) => task.id == id);
    return specialTask || 'not find';
  }

  async postOne(data) {
    this.#TASKS.push(data);
    return this.#TASKS;
  }
}
