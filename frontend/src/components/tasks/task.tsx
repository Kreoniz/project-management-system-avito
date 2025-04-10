import { ITask } from '@/types';
import { Priority } from './priority';

export function Task({
  id,
  title,
  description,
  priority,
  status,
  assignee,
  boardId,
  boardName,
}: ITask) {
  return (
    <div className="flex w-full items-start justify-between rounded-sm border-2 border-gray-300/50 p-3 transition hover:bg-gray-300/50">
      <div>
        <p className="mb-2 text-xl font-bold">{title}</p>
        <p className="mb-2">{description.slice(0, 30)}...</p>
        <div>
          <Priority priority={priority} />
        </div>
      </div>
      <p>
        <span className="font-bold">{boardName}</span>
      </p>
    </div>
  );
}
