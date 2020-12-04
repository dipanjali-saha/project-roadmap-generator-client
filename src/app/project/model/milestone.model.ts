import {TaskModel} from './task.model';

export interface MilestoneModel {
  milestoneId: number,
  name: string,
  priority: number,
  startDate: string,
  endDate: string,
  tasks: TaskModel[]
}
