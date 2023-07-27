import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAll() {
    return await this.taskService.getAll();
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return await this.taskService.getOne(id);
  }

  @Post()
  async postOne(@Body() data) {
    return await this.taskService.postOne(data);
  }
}
