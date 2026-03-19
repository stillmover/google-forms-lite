import { Link, Route, Routes } from 'react-router-dom'
import { decrement, increment } from './store/counterSlice'
import { useAppDispatch, useAppSelector } from './store/hooks'

function App() {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <div className="mx-auto min-h-screen max-w-4xl px-4 py-10">
      <header className="mb-10 flex items-center justify-between border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900">Google Forms Lite</h1>
        <nav className="flex gap-4 text-sm text-slate-700">
          <Link className="hover:text-slate-900" to="/">
            Home
          </Link>
          <Link className="hover:text-slate-900" to="/about">
            About
          </Link>
        </nav>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">
                RTK Counter
              </h2>
              <p className="mb-6 text-slate-600">
                Tailwind, React Router and Redux Toolkit are configured.
              </p>
              <div className="flex items-center gap-3">
                <button
                  className="rounded-md bg-slate-100 px-3 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200"
                  onClick={() => dispatch(decrement())}
                >
                  -1
                </button>
                <span className="min-w-10 text-center text-lg font-semibold text-slate-900">
                  {count}
                </span>
                <button
                  className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700"
                  onClick={() => dispatch(increment())}
                >
                  +1
                </button>
              </div>
            </section>
          }
        />
        <Route
          path="/about"
          element={
            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-3 text-lg font-semibold text-slate-900">About</h2>
              <p className="text-slate-600">
                Starter setup for forms UI with routing and global state.
              </p>
            </section>
          }
        />
      </Routes>
    </div>
  )
}

export default App
