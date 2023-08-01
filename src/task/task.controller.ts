import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAll() {
    return await this.taskService.getAll();
  }

  @Get('/:id')
  async getOne(@Param('id') id) {
    return await this.taskService.getOne(id);
  }

  @Post()
  async postOne(@Body() data) {
    return await this.taskService.postOne(data);
  }

  @Put('/:id')
  async complete(@Param('id') id) {
    return await this.taskService.complete(id);
  }

  @Put('update/:id')
  async update(@Param('id') id, @Body('title') data) {
    return await this.taskService.update(id, data);
  }

  // @Delete('/:id')
  // async deleteOne(@Param('id') id: string) {
  //   return await this.taskService.deleteOne(id);
  // }
}
