import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModel, TaskSchema } from './model/task.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TaskModel.name, schema: TaskSchema }]),
  ],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
