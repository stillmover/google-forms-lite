import { Link, Route, Routes } from 'react-router-dom';
import { CreateFormPage } from './pages/CreateFormPage';
import { FormFillPage } from './pages/FormFillPage';
import { FormResponsesPage } from './pages/FormResponsesPage';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <div className="mx-auto min-h-screen max-w-4xl px-4 py-10">
      <header className="mb-10 flex items-center justify-between border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900">Google Forms Lite</h1>
        <nav className="flex gap-4 text-sm text-slate-700 items-center">
          <Link className="hover:text-slate-900" to="/">
            Home
          </Link>
          <Link
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
            to="/forms/new"
          >
            Create New Form
          </Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/forms/new" element={<CreateFormPage />} />
        <Route path="/forms/:id/fill" element={<FormFillPage />} />
        <Route path="/forms/:id/responses" element={<FormResponsesPage />} />
      </Routes>
    </div>
  );
}

export default App;
