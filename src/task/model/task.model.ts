import { Prop, Schema } from '@nestjs/mongoose';
import { ITask } from './task.inteface';

@Schema()
export class TaskModel {
  @Prop()
  _id: string;

  @Prop()
  title: string;

  @Prop({ default: false })
  completed: boolean;
}
