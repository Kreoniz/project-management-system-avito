import { NavLink } from 'react-router';
import { SquareArrowOutUpRight } from 'lucide-react';
import { useTaskModalStore, useAppStore } from '@/stores';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Status } from './status';
import { Priority } from './priority';
import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { createTask, updateTask } from '@/api';

type FormValues = {
  title: string;
  description: string;
  priority: string;
  status: string;
  assigneeId: string;
  boardId: string;
};

const defaultValues: FormValues = {
  title: '',
  description: '',
  priority: 'Low',
  status: 'Backlog',
  assigneeId: '-1',
  boardId: '-1',
};

export function TaskModal() {
  const { modalMode, isOpen, closeModal, currentTask } = useTaskModalStore();
  const { boards, fetchBoards, users, fetchUsers, addTask, editTask } = useAppStore();

  const form = useForm<FormValues>({
    defaultValues,
  });

  const isEditing = !!currentTask?.id;
  const storageKey = isEditing ? `task-form-edit-${currentTask.id}` : 'task-form-create';
  const previousStorageKeyRef = useRef<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      await fetchBoards(controller);
      await fetchUsers(controller);
    }

    load();

    return () => {
      controller.abort();
    };
  }, [fetchBoards, fetchUsers]);

  useEffect(() => {
    if (!isOpen) {
      setIsInitialized(false);
      return;
    }

    if (previousStorageKeyRef.current && previousStorageKeyRef.current !== storageKey) {
      localStorage.removeItem(previousStorageKeyRef.current);
    }
    previousStorageKeyRef.current = storageKey;

    const savedForm = localStorage.getItem(storageKey);
    const parsed = savedForm ? JSON.parse(savedForm) : null;

    const values =
      parsed ||
      (currentTask
        ? {
            title: currentTask.title || '',
            description: currentTask.description || '',
            priority: currentTask.priority || 'Low',
            status: currentTask.status || 'Backlog',
            assigneeId: currentTask.assignee?.id ? String(currentTask.assignee.id) : '-1',
            boardId: currentTask.boardId ? String(currentTask.boardId) : '-1',
          }
        : defaultValues);

    form.reset(values);
    setIsInitialized(true);
  }, [isOpen, currentTask, form, storageKey]);

  useEffect(() => {
    if (!isInitialized) return;

    const subscription = form.watch((values) => {
      localStorage.setItem(storageKey, JSON.stringify(values));
    });

    return () => subscription.unsubscribe();
  }, [form, storageKey, isInitialized]);

  function handleReset() {
    const values = currentTask
      ? {
          title: currentTask.title || '',
          description: currentTask.description || '',
          priority: currentTask.priority || 'Low',
          status: currentTask.status || 'Backlog',
          assigneeId: currentTask.assignee?.id ? String(currentTask.assignee.id) : '-1',
          boardId: currentTask.boardId ? String(currentTask.boardId) : '-1',
        }
      : defaultValues;

    form.reset(values);
    localStorage.removeItem(storageKey);
  }

  function onSubmit(values: FormValues) {
    const controller = new AbortController();
    const payload = {
      ...values,
      boardId: values.boardId !== '-1' ? Number(values.boardId) : null,
      assigneeId: values.assigneeId !== '-1' ? Number(values.assigneeId) : null,
    };

    const cleanup = () => {
      localStorage.removeItem(storageKey);
      closeModal();
    };

    if (modalMode === 'default') {
      createTask(payload, controller).then((res) => {
        addTask(res.id, payload.boardId, controller);
        cleanup();
      });
    } else if (currentTask?.id) {
      updateTask(payload, currentTask?.id, controller).then(() => {
        if (currentTask.id) {
          editTask(currentTask.id, payload.boardId, controller);
          cleanup();
        }
      });
    }
  }
  if (!isInitialized && isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-sm:p-2">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {currentTask ? 'Редактирование тикета' : 'Создание тикета'}
            {localStorage.getItem(storageKey) && (
              <span className="rounded-md border border-yellow-500 px-2 py-0.5 text-xs text-yellow-600">
                Черновик
              </span>
            )}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground" htmlFor="taskName">
                    Название тикета
                  </FormLabel>
                  <FormControl>
                    <Input id="taskName" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground" htmlFor="taskDescription">
                    Описание
                  </FormLabel>
                  <FormControl>
                    <Textarea className="h-36 resize-none" id="taskDescription" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="boardId"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-muted-foreground">Проект</FormLabel>
                  <Select
                    disabled={modalMode === 'board'}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Привязать проект" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel className="text-muted-foreground">Проект</SelectLabel>
                        {boards.map((board) => (
                          <SelectItem key={board.id} value={String(board.id)}>
                            {board.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2 max-sm:flex-wrap">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-muted-foreground">Приоритет</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Выбрать приоритет" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel className="text-muted-foreground">Приоритет</SelectLabel>
                          <SelectItem value="Low">
                            <Priority priority="Low" />
                          </SelectItem>
                          <SelectItem value="Medium">
                            <Priority priority="Medium" />
                          </SelectItem>
                          <SelectItem value="High">
                            <Priority priority="High" />
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-muted-foreground">Статус</FormLabel>
                    <Select
                      disabled={modalMode === 'default'}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Выбрать статус" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel className="text-muted-foreground">Статус</SelectLabel>
                          <SelectItem value="Backlog">
                            <Status status="Backlog" />
                          </SelectItem>
                          <SelectItem value="InProgress">
                            <Status status="InProgress" />
                          </SelectItem>
                          <SelectItem value="Done">
                            <Status status="Done" />
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="assigneeId"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-muted-foreground">Исполнитель</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Выбрать исполнителя" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel className="text-muted-foreground">Исполнитель</SelectLabel>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={String(user.id)}>
                            {user.fullName}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {modalMode === 'all' && (
              <NavLink
                onClick={closeModal}
                to={`/board/${currentTask?.boardId}`}
                state={{ name: currentTask?.boardName }}
                className="text-muted-foreground hover:bg-foreground/15 flex max-w-full items-center gap-1 rounded-md border px-2 py-2 text-sm font-medium transition"
              >
                <span className="truncate">{currentTask?.boardName}</span>
                <SquareArrowOutUpRight className="text-muted-foreground h-4 w-4" />
              </NavLink>
            )}

            <div className="flex gap-2">
              <Button type="button" className="flex-1" onClick={handleReset}>
                Сбросить
              </Button>

              <Button type="submit" className="flex-1" variant="outline">
                {currentTask ? 'Изменить' : 'Создать'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
