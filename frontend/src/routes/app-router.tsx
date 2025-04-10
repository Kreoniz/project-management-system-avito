import { BrowserRouter, Routes, Route } from 'react-router';
import App from '@/App.tsx';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}
