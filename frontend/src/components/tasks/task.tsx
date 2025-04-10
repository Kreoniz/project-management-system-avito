import { ITask } from '@/types';
import { Priority } from './priority';
import { Status } from './status';
import { NavLink } from 'react-router';
import { SquareArrowOutUpRight } from 'lucide-react';

export function Task({
  title,
  description,
  priority,
  status,
  assignee,
  boardId,
  boardName,
}: ITask) {
  return (
    <div className="flex w-full flex-col gap-6 rounded-md border border-gray-300 bg-white p-4 shadow-sm transition hover:bg-gray-100 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex flex-1 flex-col gap-2">
        <p className="text-base font-semibold sm:text-lg">{title}</p>

        <p className="line-clamp-3 text-sm text-gray-600 sm:max-w-3/4">{description}</p>

        <div className="flex flex-wrap gap-2">
          <Priority priority={priority} />
          <Status status={status} />
        </div>
      </div>

      <div className="flex w-full flex-wrap items-center justify-between gap-3 sm:w-auto sm:flex-col sm:items-end sm:justify-between sm:text-right">
        <NavLink
          to={`/board/${boardId}`}
          className="flex max-w-full items-center gap-1 rounded-md border border-gray-300 px-2 py-1 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
        >
          <span className="truncate">{boardName}</span>
          <SquareArrowOutUpRight className="h-4 w-4 text-gray-600" />
        </NavLink>

        <div className="flex max-w-full items-center gap-2 sm:flex-row-reverse">
          <img
            src={assignee.avatarUrl}
            alt={assignee.fullName}
            className="h-8 w-8 rounded-full object-cover"
          />
          <div className="truncate text-sm text-gray-600">{assignee.fullName}</div>
        </div>
      </div>
    </div>
  );
}
