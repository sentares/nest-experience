import { TaskType } from "../enum"

export class CreateTaskDto {
	title: string
	type?: TaskType
}

