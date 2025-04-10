import { IAssignee } from './users';

export interface ITask {
  id: number;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Backlog' | 'InProgress' | 'Done';
  assignee: IAssignee;
  boardId: number;
  boardName: string;
}
