import { TaskType } from '../enum';
import { IdParamsDto } from './take-id-task.dto';

export class UpdateTaskDto {
  // id: IdParamsDto;
  title?: string;
  type?: TaskType;
}
