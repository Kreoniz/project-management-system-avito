import { ITask } from '@/types';
import { Priority } from './priority';
import { Status } from './status';
import { NavLink } from 'react-router';
import { SquareArrowOutUpRight } from 'lucide-react';

interface ITaskProps extends ITask {
  variant?: 'default' | 'compact';
}

export function Task({
  title,
  description,
  priority,
  status,
  assignee,
  boardId,
  boardName,
  variant = 'default',
}: ITaskProps) {
  return (
    <div
      className={`hover:bg-foreground/10 flex w-full flex-col rounded-md border-2 shadow-sm transition sm:items-start sm:justify-between ${variant === 'compact' ? 'gap-3 p-3 text-sm' : 'gap-6 p-4 sm:flex-row'}`}
    >
      <div className="flex flex-1 flex-col gap-2">
        <p className="text-base font-semibold sm:text-lg">{title}</p>

        <p className="text-muted-foreground line-clamp-3 text-sm sm:max-w-3/4">{description}</p>

        <div className="flex flex-wrap gap-2">
          <Priority priority={priority} />
          <Status status={status} />
        </div>
      </div>

      <div className="flex w-full flex-wrap items-center justify-between gap-3 sm:w-auto sm:flex-col sm:items-end sm:justify-between sm:text-right">
        {boardName && (
          <NavLink
            to={`/board/${boardId}`}
            state={{ name: boardName }}
            className="text-muted-foreground hover:bg-foreground/15 border-muted-foreground flex max-w-full items-center gap-1 rounded-md border px-2 py-1 text-sm font-medium transition"
          >
            <span className="truncate">{boardName}</span>
            <SquareArrowOutUpRight className="text-muted-foreground h-4 w-4" />
          </NavLink>
        )}

        <div
          className={`flex max-w-full items-center gap-2 ${variant === 'compact' ? '' : 'sm:flex-row-reverse'}`}
        >
          <img
            src={assignee.avatarUrl}
            alt={assignee.fullName}
            className="h-8 w-8 rounded-full object-cover"
          />
          <div className="text-muted-foreground truncate text-sm">{assignee.fullName}</div>
        </div>
      </div>
    </div>
  );
}
