import { BrowserRouter, Routes, Route } from 'react-router';
import { MainLayout } from '@/layouts/main-layout';
import { HomePage, TaskPage, BoardPage } from '@/pages';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="issues" element={<TaskPage />} />
          <Route path="boards" element={<BoardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
