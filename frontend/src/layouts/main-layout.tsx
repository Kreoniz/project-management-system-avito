import Header from '@/components/layout/header';
import { Outlet } from 'react-router';

export function MainLayout() {
  return (
    <>
      <Header />
      <main className="mx-2 my-4 sm:mx-4">
        <div className="mx-auto max-w-7xl">
          <Outlet />
        </div>
      </main>
    </>
  );
}
