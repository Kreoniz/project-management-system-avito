import { NavLink } from 'react-router';
import { SquareArrowOutUpRight } from 'lucide-react';
import { useTaskModalStore } from '@/stores';
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
import { useEffect } from 'react';
import { createTask, updateTask, getUsers, getBoards } from '@/api';

const defaultValues = {
  title: '',
  description: '',
  priority: '',
  status: '',
  assignee: { fullName: '' },
  boardId: -1,
  boardName: '',
};

export function TaskModal() {
  const { modalMode, isOpen, closeModal, currentTask } = useTaskModalStore();

  const form = useForm({
    defaultValues,
  });

  useEffect(() => {
    if (currentTask) {
      form.reset({
        title: currentTask.title || '',
        description: currentTask.description || '',
        priority: currentTask.priority || '',
        status: currentTask.status || '',
        assignee: currentTask.assignee || { fullName: '' },
        boardId: currentTask.boardId || -1,
        boardName: currentTask.boardName || '',
      });
    } else {
      form.reset(defaultValues);
    }
  }, [currentTask, form]);

  const onSubmit = (values: any) => {
    console.log('Form submitted:', values);
    if (currentTask) {
      updateTask(values);
    } else {
      createTask(values);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-sm:p-2">
        <DialogHeader>
          <DialogTitle>{currentTask ? 'Редактирование тикета' : 'Создание тикета'}</DialogTitle>
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
              name="boardName"
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
                        <SelectItem value={field.value || ' '}>{field.value}</SelectItem>
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
                    <Select onValueChange={field.onChange} value={field.value}>
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
              name="assignee"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-muted-foreground">Исполнитель</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value?.fullName}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Выбрать исполнителя" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel className="text-muted-foreground">Исполнитель</SelectLabel>
                        <SelectItem value="assigneeValue">{field.value?.fullName}</SelectItem>
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
              <Button type="button" className="flex-1" onClick={() => form.reset(defaultValues)}>
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
