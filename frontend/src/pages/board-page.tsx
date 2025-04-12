import { useState, useEffect } from 'react';
import { getBoardTasks } from '@/api';
import { ITask } from '@/types';
import { Task } from '@/components/tasks';
import { useLocation, useParams } from 'react-router';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useAppStore } from '@/stores';

export function BoardPage() {
  const { boardTasks, fetchBoardTasks } = useAppStore();
  const { id } = useParams<{ id: string }>();
  const state = useLocation().state;

  useEffect(() => {
    fetchBoardTasks(Number(id));
  }, [fetchBoardTasks]);

  const columns = {
    Backlog: boardTasks.filter((task) => task.status === 'Backlog'),
    InProgress: boardTasks.filter((task) => task.status === 'InProgress'),
    Done: boardTasks.filter((task) => task.status === 'Done'),
  };

  const columnLabels = {
    Backlog: 'To do',
    InProgress: 'В процессе',
    Done: 'Сделано',
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="text-lg font-bold hover:underline" href="/boards">
              Проекты
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-lg font-bold">{state?.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="rounded-lg outline max-lg:overflow-x-scroll">
        <div className="flex gap-4 lg:grid lg:grid-cols-3">
          {Object.entries(columns).map(([status, tasks]) => (
            <div key={status} className="bg-background min-w-xs rounded-lg border p-4 shadow-sm">
              <h3 className="text-muted-foreground mb-3 text-lg font-semibold">
                {columnLabels[status as keyof typeof columnLabels]}
              </h3>
              <div className="flex flex-col gap-3">
                {tasks.length > 0 ? (
                  tasks.map((task) => <Task key={task.id} {...task} variant="compact" />)
                ) : (
                  <p className="text-sm text-gray-500 italic">Нет задач</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
