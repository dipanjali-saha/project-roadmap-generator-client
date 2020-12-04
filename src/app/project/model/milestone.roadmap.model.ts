import {TaskRoadmapModel} from './task.roadmap.model';

export interface MilestoneRoadmapModel {
  ID: string,
  SlNo: number,
  Name: string,
  StartDate: string
  EndDate: string
  AssignedTo: string,
  tasks: TaskRoadmapModel[]
}
