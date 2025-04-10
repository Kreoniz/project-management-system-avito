import { Link, NavLink } from 'react-router';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b px-4 py-3 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="" className="text-2xl font-bold hover:underline">
          Э!-Тикет
        </Link>

        <nav className="hidden text-lg font-semibold md:flex md:gap-6">
          <NavLink
            to="/issues"
            className={({ isActive }) =>
              `hover:text-primary transition-colors hover:underline ${isActive ? 'text-primary' : 'text-muted-foreground'}`
            }
          >
            Все тикеты
          </NavLink>

          <NavLink
            to="/boards"
            className={() =>
              `hover:text-primary transition-colors hover:underline ${
                location.pathname.startsWith('/boards') ? 'text-primary' : 'text-muted-foreground'
              }`
            }
          >
            Проекты
          </NavLink>
        </nav>

        <div className="hidden items-center md:flex">
          <Button asChild>
            <Link to="/issues/create">Создать тикет</Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 max-w-full p-4">
              <SheetTitle>Меню</SheetTitle>

              <div className="mt-2 flex flex-col text-lg font-semibold">
                <NavLink
                  to="/issues"
                  className={({ isActive }) =>
                    `hover:text-primary my-2 transition-colors hover:underline ${isActive ? 'text-primary' : 'text-muted-foreground'}`
                  }
                >
                  Все тикеты
                </NavLink>
                <NavLink
                  to="/boards"
                  className={() =>
                    `hover:text-primary transition-colors hover:underline ${
                      location.pathname.startsWith('/boards')
                        ? 'text-primary'
                        : 'text-muted-foreground'
                    }`
                  }
                >
                  Проекты
                </NavLink>
                <Button asChild className="text-md mt-4 w-full p-4">
                  <Link to="/issues/create">Создать тикет</Link>
                </Button>
              </div>
            </SheetContent>

            <SheetDescription className="sr-only">Меню для мобильных устройств</SheetDescription>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
