import Header from '@/components/layout/header';
import { Outlet } from 'react-router';

export function Layout() {
  return (
    <>
      <Header />
      <main className="m-4">
        <div className="mx-auto max-w-7xl">
          <Outlet />
        </div>
      </main>
    </>
  );
}
