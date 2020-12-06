import {MilestoneModel} from './milestone.model';

export interface ProjectDetailsModel {
  projectId: number,
  name: string,
  startDate: string,
  endDate: string,
  milestones: MilestoneModel[],
  roadmapGenerated: boolean,
  employeeAssigned: boolean
}
