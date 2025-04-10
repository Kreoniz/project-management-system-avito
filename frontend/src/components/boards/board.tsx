import { IBoard } from '@/types';
import { NavLink } from 'react-router';

export function Board({ id, name, description, taskCount }: IBoard) {
  return (
    <NavLink
      className="flex w-full items-end justify-between rounded-sm border-2 border-gray-300/50 p-3 transition hover:bg-gray-300/50"
      to={`/board/${String(id)}`}
    >
      <div>
        <p className="text-xl font-bold">{name}</p>
        <p>{description}</p>
      </div>
      <p>
        Кол-во тикетов: <span className="font-bold">{taskCount}</span>
      </p>
    </NavLink>
  );
}
