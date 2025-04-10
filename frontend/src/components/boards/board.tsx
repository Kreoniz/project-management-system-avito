import { IBoard } from '@/types';
import { NavLink } from 'react-router';

export function Board({ id, name, description, taskCount }: IBoard) {
  return (
    <NavLink
      className="flex w-full justify-between gap-1 rounded-sm border-2 border-gray-300/50 p-3 transition hover:bg-gray-300/50 max-sm:flex-col sm:items-end"
      to={`/board/${String(id)}`}
    >
      <div>
        <p className="text-base font-bold sm:text-lg">{name}</p>
        <p className="line-clamp-3 text-sm text-gray-600">{description}</p>
      </div>

      <p className="text-xs text-gray-600">
        Кол-во тикетов: <span className="font-bold">{taskCount}</span>
      </p>
    </NavLink>
  );
}
