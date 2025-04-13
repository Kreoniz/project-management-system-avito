import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Kanban, Ticket, Users } from 'lucide-react';

export function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="mb-4 text-2xl font-bold tracking-tight sm:text-4xl">
          Добро пожаловать в Э!-Тикет
        </h1>
        <p className="text-muted-foreground text-md mx-auto max-w-2xl sm:text-xl">
          Простое и удобное управление проектами
        </p>
        <div className="mt-8 flex justify-center gap-4 max-sm:flex-col">
          <Button asChild>
            <Link to="/issues">Перейти к тикетам</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/boards">Перейти к проектам</Link>
          </Button>
        </div>
      </section>

      <section className="mb-12 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <Kanban className="mb-2 h-8 w-8" />
            <CardTitle>Канбан-доски</CardTitle>
            <CardDescription>Визуализируйте workflow вашего проекта</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <Ticket className="mb-2 h-8 w-8" />
            <CardTitle>Тикеты</CardTitle>
            <CardDescription>Легко создавайте и распределяйте задачи</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <Users className="mb-2 h-8 w-8" />
            <CardTitle>Командная работа</CardTitle>
            <CardDescription>Следите за прогрессом всей команды</CardDescription>
          </CardHeader>
        </Card>
      </section>
    </div>
  );
}
