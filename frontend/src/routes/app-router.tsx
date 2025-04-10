import { BrowserRouter, Routes, Route } from 'react-router';
import { Layout } from '@/layouts/layout';
import { HomePage, TaskPage, ProjectPage } from '@/pages';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="issues" element={<TaskPage />} />
          <Route path="boards" element={<ProjectPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
