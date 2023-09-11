import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TaskType } from '../enum';
import { ITask } from '../interface';

@Schema()
export class TaskModel implements ITask {
  @Prop()
  id: string;

  @Prop()
  title: string;

  @Prop({ default: false })
  completed: boolean;

  @Prop()
  type: TaskType;
}

export const TaskSchema = SchemaFactory.createForClass(TaskModel);
